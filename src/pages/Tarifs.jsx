import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import '../styles/tarifs.css'

export default function Tarifs() {

  const { hash } = useLocation()
  useEffect(() => {
    if (!hash) return
    const el = document.querySelector(hash)
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }, [hash])

  return (
    <>
      <header>
        <Navbar />
      </header>

      <main>
        <section className="tarifs-section">
          <div className="tarifs-header">
            <h2>Nos Tarifs</h2>
            <p>
              Que vous soyez un particulier, une entreprise ou une collectivité,
              nous proposons des solutions adaptées à vos besoins et à votre
              budget. Découvrez nos offres détaillées.
            </p>
          </div>

          <div className="tarif-block" id="particuliers">
            <h2>Particuliers</h2>
            <ul>
              <li>Entretien de jardin : à partir de 30€/intervention</li>
              <li>Création de massifs ou potager : devis sur mesure</li>
              <li>Élagage/abattage d'arbre : dès 80€/arbre</li>
              <li>Pack saison : à partir de 150€/saison</li>
            </ul>
            <p className="tarif-note">
              💬 Pour les demandes régulières, des formules d'abonnement sont disponibles.
            </p>
          </div>

          <div className="tarif-block" id="professionnels">
            <h2>Professionnels</h2>
            <ul>
              <li>Entretien de site pro : dès 100€/mois</li>
              <li>Création d'espaces verts pour façade : devis personnalisé</li>
              <li>Zones de détente / toiture végétalisée : sur étude</li>
              <li>Interventions discrètes : majoration 10%</li>
            </ul>
            <p className="tarif-note">
              📋 Contrats annuels ou ponctuels selon vos besoins.
            </p>
          </div>

          <div className="tarif-block" id="collectivites">
            <h2>Collectivités</h2>
            <ul>
              <li>Aménagement de parc/jardin public : à partir de 500€</li>
              <li>Gestion écologique : devis selon surface</li>
              <li>Entretien régulier : à définir selon fréquence</li>
              <li>Mobiliers verts / composteurs : sur mesure</li>
            </ul>
            <p className="tarif-note">
              📞 Accompagnement technique & planification annuelle.
            </p>
          </div>

          <div className="btn-container">
            <Link to="/contact" className="btn-tarifs">Prenez rendez-vous</Link>
          </div>
        </section>
      </main>
    </>
  )
}
