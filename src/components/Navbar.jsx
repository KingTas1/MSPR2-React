import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/img/logo-canopees-removebg-preview.png'
import hamburger from '../assets/logos/hamburger.svg'
import close from '../assets/logos/close.svg'
import '../styles/index.css'
import '../styles/navbar.css'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => setMenuOpen(!menuOpen)

  useEffect(() => {
    const el = document.querySelector('.header-nav')
    const apply = () => {
      if (!el) return
      const h = Math.round(el.getBoundingClientRect().height)
      document.documentElement.classList.add('has-fixed-nav')
      document.documentElement.style.setProperty('--nav-h', h + 'px')
    }
    apply()
    const ro = new ResizeObserver(apply)
    if (el) ro.observe(el)
    window.addEventListener('resize', apply)
    return () => {
      window.removeEventListener('resize', apply)
      ro.disconnect()
    }
  }, [])

  return (
    <nav className={`header-nav ${menuOpen ? 'header-nav--active' : ''}`}>
      <div className="nav__container">
        <div className="nav__logo">
          <Link to="/">
            <button className="nav__button-logo">
              <img src={logo} alt="logo Canopées" width="140" height="30" />
            </button>
          </Link>
        </div>

        <button className="nav__toggle-button" onClick={toggleMenu}>
          <img
            src={menuOpen ? close : hamburger}
            alt="menu"
            width="30"
            height="30"
          />
        </button>

        <ul className={`nav__list ${menuOpen ? 'is-open' : ''}`}>
          <li><Link to="/" className="nav__link">Accueil</Link></li>
          <li><Link to="/AboutUs" className="nav__link">Qui sommes-nous ?</Link></li>
          <li><Link to="/Prestation" className="nav__link">Nos prestations</Link></li>
          <li><Link to="/Tarifs" className="nav__link">Nos tarifs</Link></li>
          <li><Link to="/Contact" className="nav__link">Contactez-nous</Link></li>
          <li><Link to="/Calendar" className="nav__link">Prendre Rendez-vous</Link></li>
        </ul>
      </div>
    </nav>
  )
}
