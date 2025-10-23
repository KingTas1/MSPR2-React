import { useState } from 'react'
import img1 from '../assets/img/elagage arbre.png'
import img2 from '../assets/img/Bob grimpe elagage.jpg'
import img3 from '../assets/img/taillage de haies circulaire.jpg'
import img4 from '../assets/img/taillage de haies.jpg'
import leftArrow from '../assets/logos/left-arrow.svg'
import rightArrow from '../assets/logos/right-arrow.svg'

const slides = [
    { src: img1, alt: "elagage d'arbre" },
    { src: img2, alt: "Bob grimpe pour elagage" },
    { src: img3, alt: "taillage de haies circulaire" },
    { src: img4, alt: "taillage de haies" },
]

export default function Slider() {
    const [i, setI] = useState(1)

    const prev = () => setI ((i - 1 + slides.length) % slides.length)
    const next = () => setI ((i + 1) % slides.length)

    return (
        <div className='main-slider'>
            {slides.map((s, idx) => (
                <img 
                    key={idx}
                    src={s.src}
                    alt={s.alt}
                    className={`slide-img ${idx === i ? 'active' : ''}`}
                    width="600"
                    height="450"
                />
            ))}

            <button data-action="-1" className='control-btn previous-btn' onClick={prev} aria-label="Précédent">
                <img src={leftArrow} alt="left arrow" />
            </button>
            <button data-action="1" className='control-btn next-btn' onClick={next} aria-label="Suivant">
                <img src={rightArrow} alt="right arrow" />
            </button>
        </div>
    )
}