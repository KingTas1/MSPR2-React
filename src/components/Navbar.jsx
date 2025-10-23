import { NavLink, Link } from 'react-router-dom'
import { useState } from 'react'
import logo from '../assets/img/logo-canopees-removebg-preview.png'
import hamburger from '../assets/logos/hamburger.svg'
import closeIcon from '../assets/logos/close.svg'

export default function Navbar() {
    const [open, setOpen] = useState(false)

    const toggle = () => setOpen(o => !o)
    const close = () => setOpen(false)

    return (
            <nav className={`header-nav ${open ? 'header-nav--active' : ''}`}>
                <div className='nav__container'>
                    <div className='nav__logo'>
                        <Link to="/">
                            <button className='nav__button-logo' aria-label="Accueil">
                                <img 
                                    src={logo} 
                                    alt="logo entreprise Canopées" 
                                    width="140"
                                    height="30"
                                 />
                            </button>
                        </Link>
                    </div>

                    <button className='nav__toggle-button' onClick={toggle} aria-label="Menu">
                        <img 
                            src={open ? closeIcon : hamburger}
                            alt={open ? 'Fermer le menu' : 'Ouvrir le menu'}
                            className='nav__toggle-button' 
                            width="30" 
                            height="30" 
                        />
                    </button>

                    <ul className={`nav__list ${open ? 'is-open' : ''}`}>
                        <li><NavLink to="/" className="nav__link" onClick={close}>Accueil</NavLink></li>
                        <li><NavLink to="/AboutUs" className="nav__link" onClick={close}>Qui sommes-nous ?</NavLink></li>
                        <li><NavLink to="/Prestation" className="nav__link" onClick={close}>Nos Prestations</NavLink></li>
                        <li><NavLink to="/tarifs" className="nav__link" onClick={close}>Nos tarifs</NavLink></li>
                        <li><NavLink to="/contact" className="nav__link" onClick={close}>Contactez-nous</NavLink></li>
                        <li><NavLink to="/rdv" className="nav__link" onClick={close}>Prendre rendez-vous</NavLink></li>
                    </ul>
                </div>
            </nav>
    )
}