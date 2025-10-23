import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <footer>
            <div className='footer-container'>
                <p className='footer-text'>Copyright © 2020 Canopées | Tous droits réservés</p>
                <ul className='footer-list'>
                    <Link to="/mentions">Mentions légales</Link>
                    <Link to="/mentions">CGV</Link>
                    <Link to="/mentions">CGU</Link>
                </ul>
            </div>
        </footer>
    )
}