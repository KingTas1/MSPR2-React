import { useEffect, useMemo, useRef, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import frLocale from '@fullcalendar/core/locales/fr'
import Navbar from '../components/Navbar.jsx'
import '../styles/calendar.css'

const pad = n => String(n).padStart(2, '0')
const toLocalISOWithTZ = (date) => {
  const d = new Date(date)
  const tzMin = -d.getTimezoneOffset()
  const sign = tzMin >= 0 ? '+' : '-'
  const hh = pad(Math.trunc(Math.abs(tzMin) / 60))
  const mm = pad(Math.abs(tzMin) % 60)
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}${sign}${hh}:${mm}`
}
const fmtDateTimeFR = (iso) =>
  new Date(iso).toLocaleString('fr-FR', { weekday:'long', day:'2-digit', month:'long', hour:'2-digit', minute:'2-digit' })

export default function CalendarPage() {
  const calRef = useRef(null)
  const [busyRanges, setBusyRanges] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [toast, setToast] = useState('')
  const [loading, setLoading] = useState(false)

  const [slot, setSlot] = useState({ start:'', end:'' })

  const [form, setForm] = useState({ name:'', email:'', phone:'', address:'', notes:'' })

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(()=> setToast(''), 2200)
  }

  const fetchEvents = async () => {
    const res = await fetch('/api/events', { headers: { Accept: 'application/ld+json' } })
    if (!res.ok) throw new Error('API events indisponible')
    const data = await res.json()
    const items = data['hydra:member'] || []
    setBusyRanges(items.map(e => ({ start:e.start, end:e.end })))

    return items.map(e => ({
      start: e.start,
      end: e.end,
      display: 'background',
      classNames: ['busy'],
    }))
  }

  const calendarOptions = useMemo(()=>({
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    locale: frLocale,
    initialView: 'dayGridMonth',
    headerToolbar: { left:'prev,next today', center:'title', right:'dayGridMonth,timeGridWeek,timeGridDay' },
    firstDay: 1,
    height: 'auto',
    selectable: true,
    selectMirror: true,
    nowIndicator: true,
    slotDuration: '00:30',
    slotMinTime: '08:00:00',
    slotMaxTime: '18:00:00',
    eventOverlap: false,
    selectOverlap: false,
    validRange: { start: new Date().toISOString().slice(0,10) },
    selectLongPressDelay: 0,
    selectMinDistance: 0,

    selectAllow: (info) => !info.allDay && info.view.type !== 'dayGridMonth',

    events: async (info, successCallback, failureCallback) => {
      try {
        const mapped = await fetchEvents()
        successCallback(mapped)
      } catch (e) {
        failureCallback(e)
      }
    },

    dateClick: (arg) => {
      const calendarApi = calRef.current?.getApi()
      if (calendarApi?.view.type === 'dayGridMonth') {
        calendarApi.changeView('timeGridDay', arg.dateStr)
        return
      }
      if (!arg.allDay && (calendarApi?.view.type === 'timeGridDay' || calendarApi?.view.type === 'timeGridWeek')) {
        const startISO = arg.dateStr 
        const d = new Date(arg.date)
        d.setMinutes(d.getMinutes() + 30)
        const endISO = toLocalISOWithTZ(d)
        setSlot({ start:startISO, end:endISO })
        setModalOpen(true)
      }
    },

    select: (sel) => {
      const overlaps = busyRanges.some(r =>
        !(new Date(sel.end) <= new Date(r.start) || new Date(sel.start) >= new Date(r.end))
      )
      if (overlaps) {
        showToast('Créneau déjà occupé')
        return
      }
      setSlot({ start: sel.startStr, end: sel.endStr })
      setModalOpen(true)
    },
  }), [busyRanges])

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim()) {
      showToast('Nom et email requis')
      return
    }

    let end = slot.end
    if (!end || slot.start === end) {
      const d = new Date(slot.start); d.setMinutes(d.getMinutes()+30)
      end = d.toISOString()
    }
    const payload = {
      title: `RDV - ${form.name.trim()}`,
      start: slot.start,
      end,
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim() || null,
      address: form.address.trim() || null,
      status: 'pending',
      notes: form.notes.trim() || null,
    }

    setLoading(true)
    setModalOpen(false)

    const calendarApi = calRef.current?.getApi()
    const optimistic = calendarApi?.addEvent({
      start: payload.start, end: payload.end, display:'background', classNames:['busy']
    })

    try {
      const controller = new AbortController()
      const timer = setTimeout(()=>controller.abort(), 15000)
      const res = await fetch('/api/events', {
        method:'POST',
        headers:{ 'Content-Type':'application/json', 'Accept':'application/ld+json' },
        body: JSON.stringify(payload),
        signal: controller.signal
      }).catch((err)=>{ throw new Error('Impossible de joindre le serveur (CORS/timeout ?)') })
      clearTimeout(timer)

      if (!res.ok) {
        const txt = await res.text()
        try {
          const j = JSON.parse(txt)
          throw new Error(j['hydra:description'] || j.detail || 'Erreur serveur')
        } catch {
          throw new Error(txt.slice(0,500) || 'Erreur serveur')
        }
      }
      await calendarApi?.refetchEvents()
      showToast('RDV enregistré ✅')
      setForm({ name:'', email:'', phone:'', address:'', notes:'' })
    } catch (err) {
      if (optimistic) optimistic.remove()
      showToast('Échec: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <header id="site-nav">
        <Navbar />
      </header>

      <main className="form-page">
        <h2>Nos disponibilités</h2>
        <p className="text-h2">Un expert se déplacera directement chez vous pour vous faire un devis directement sur place.</p>
        <p className="text-h2">(Choisissez une date, une heure puis entrez vos coordonnées)</p>

        <div id="calendar">
          <FullCalendar ref={calRef} {...calendarOptions} />
        </div>

        {modalOpen && (
          <div className="modal-backdrop active" aria-hidden={false} onClick={(e)=>{ if (e.target.classList.contains('modal-backdrop')) setModalOpen(false) }}>
            <div className="modal" role="dialog" aria-modal="true" aria-labelledby="rdv-title">
              <h3 id="rdv-title">Prendre rendez-vous</h3>
              <p className="sub">{fmtDateTimeFR(slot.start)} → {fmtDateTimeFR(slot.end || slot.start)}</p>

              <form id="rdv-form" onSubmit={onSubmit}>
                <div className="grid">
                  <div>
                    <label htmlFor="name">Nom / Entreprise *</label>
                    <input id="name" name="name" required placeholder="Ex: Alice & Co."
                           value={form.name} onChange={e=>setForm(f=>({...f, name:e.target.value}))}/>
                  </div>
                  <div>
                    <label htmlFor="email">Email *</label>
                    <input id="email" name="email" type="email" required placeholder="client@mail.com"
                           value={form.email} onChange={e=>setForm(f=>({...f, email:e.target.value}))}/>
                  </div>
                  <div>
                    <label htmlFor="phone">Téléphone</label>
                    <input id="phone" name="phone" placeholder="06 12 34 56 78"
                           value={form.phone} onChange={e=>setForm(f=>({...f, phone:e.target.value}))}/>
                  </div>
                  <div>
                    <label htmlFor="address">Adresse</label>
                    <input id="address" name="address" placeholder="12 rue des jardins, Paris"
                           value={form.address} onChange={e=>setForm(f=>({...f, address:e.target.value}))}/>
                  </div>
                  <div className="full">
                    <label htmlFor="notes">Notes</label>
                    <textarea id="notes" name="notes" placeholder="Informations supplémentaires..."
                              value={form.notes} onChange={e=>setForm(f=>({...f, notes:e.target.value}))}/>
                  </div>
                </div>

                <div className="actions">
                  <button type="button" className="btn cancel" onClick={()=>setModalOpen(false)}>Annuler</button>
                  <button type="submit" className="btn primary" disabled={loading}>
                    {loading ? 'Envoi…' : 'Confirmer le RDV'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className={`toast ${toast ? 'show' : ''}`} id="toast">{toast}</div>
      </main>
    </>
  )
}
