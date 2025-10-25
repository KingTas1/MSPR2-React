import { useEffect } from 'react'
import { createPortal } from 'react-dom'

export default function Modal({ isOpen, onClose, title, images = [] }) {
  useEffect(() => {
    if (!isOpen) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onEsc = (e) => { if (e.key === 'Escape') onClose?.() }
    window.addEventListener('keydown', onEsc)
    return () => {
      window.removeEventListener('keydown', onEsc)
      document.body.style.overflow = prevOverflow
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const modal = (
    <div
      className="cps-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose?.()
      }}
    >
      <div className="cps-modal-content">
        <button className="cps-modal-close" onClick={onClose} aria-label="Fermer">×</button>
        <h3 className="cps-modal-title">{title}</h3>

        <div className="cps-modal-grid">
          {images.map((src, i) => (
            <img key={i} src={src} className="cps-modal-img" alt={`${title} ${i + 1}`} />
          ))}
        </div>
      </div>
    </div>
  )

  return createPortal(modal, document.body)
}
