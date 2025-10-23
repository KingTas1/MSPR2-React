import { useEffect } from 'react'

export default function Modal({ isOpen, onClose, title, images = [] }) {
  useEffect(() => {
    function onEsc(e) { if (e.key === 'Escape') onClose() }
    if (isOpen) window.addEventListener('keydown', onEsc)
    return () => window.removeEventListener('keydown', onEsc)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="modal" onClick={(e)=>{ if (e.target.classList.contains('modal')) onClose() }}>
      <div className="modal-content">
        <span className="close-btn" onClick={onClose}>&times;</span>
        <h3>{title}</h3>
        {images.map((src, i) => (
          <img key={i} src={src} className="modal-img" alt={`${title} ${i+1}`} />
        ))}
      </div>
    </div>
  )
}
