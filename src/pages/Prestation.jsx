import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import Modal from '../components/modale-presta.jsx'
import '../styles/prestation.css'

// Taille_de_haies
import th1 from '../assets/img/Taille_de_haies/buis-topiaire-5.jpg'
import th2 from '../assets/img/Taille_de_haies/Buis_personnage.jpg'
import th3 from '../assets/img/Taille_de_haies/comment-bien-tailler-ses-arbustes.jpg'
import th4 from '../assets/img/Taille_de_haies/shutterstock_1240331794.webp'
import th5 from '../assets/img/Taille_de_haies/taille-haies-arbustes-aidlib-entretien-jardin.jpg'

// Elagage_&_Abattage
import ea1 from '../assets/img/Elagage_&_Abattage/Abattage_dun_arbre_par_un_homme.jpg'
import ea2 from '../assets/img/Elagage_&_Abattage/elagage-arbre-2.jpg'
import ea3 from '../assets/img/Elagage_&_Abattage/elagage_1.jpg'
import ea4 from '../assets/img/Elagage_&_Abattage/jimmy-nilsson-masth-ka9CiTCVrD8-unsplash-600x1000.jpg'
import ea5 from '../assets/img/Elagage_&_Abattage/nicky-elagage-abattage-marseille.jpg'

// Conception_&_Aménagement
import ca1 from '../assets/img/Conception_&_Aménagement/plan1.jpg'
import ca2 from '../assets/img/Conception_&_Aménagement/maison1.webp'
import ca3 from '../assets/img/Conception_&_Aménagement/plan3.png'
import ca4 from '../assets/img/Conception_&_Aménagement/maison3.avif'
import ca5 from '../assets/img/Conception_&_Aménagement/plan-damenagement-paysager-4.jpg'
import ca6 from '../assets/img/Conception_&_Aménagement/maison4.jpg'

// Entretien_Régulier
import er1 from '../assets/img/Entretien_Régulier/entretien_jardin-scaled.jpeg'
import er2 from '../assets/img/Entretien_Régulier/Ootravaux-prix-entretien-jardin_1000x667.jpg'
import er3 from '../assets/img/Entretien_Régulier/jardin.jpeg'
import er4 from '../assets/img/Entretien_Régulier/taille-entretien-regulier.png'
import er5 from '../assets/img/Entretien_Régulier/images.jpg'

// Valorisation_déchets
import vd1 from '../assets/img/Valorisation_déchets/environnement2.jpg'
import vd2 from '../assets/img/Valorisation_déchets/785_view.jpg'
import vd3 from '../assets/img/Valorisation_déchets/Capture-decran-2024-04-30-a-16.22.22.png'
import vd4 from '../assets/img/Valorisation_déchets/dechets-admis-au-compost-pro-bio-terre.png'

export default function Prestation() {
  const [open, setOpen] = useState(null)

  const modals = useMemo(() => ({
    modal1: { title: 'Taille de haies', images: [th1, th2, th3, th4, th5] },
    modal2: { title: 'Élagage et abattage', images: [ea1, ea2, ea3, ea4, ea5] },
    modal3: { title: 'Conception et aménagement', images: [ca1, ca2, ca3, ca4, ca5, ca6] },
    modal4: { title: 'Entretien régulier', images: [er1, er2, er3, er4, er5] },
    modal5: { title: 'Valorisation des déchets', images: [vd1, vd2, vd3, vd4] },
  }), [])

  return (
    <>
      <header>
        <Navbar />
      </header>

      <main>
        <section className="services">
          <h2 className="services-title">Nos prestations sur mesure</h2>

          <div className="service">
            <h3>Taille de haies</h3>
            <p>Des haies bien taillées pour structurer votre jardin et préserver votre intimité.</p>
            <button className="open-modal" onClick={() => setOpen('modal1')}>Voir plus</button>
          </div>

          <div className="service">
            <h3>Élagage et abattage</h3>
            <p>Pour la sécurité, la lumière ou l'esthétique, nous intervenons avec maîtrise et prudence.</p>
            <button className="open-modal" onClick={() => setOpen('modal2')}>Voir plus</button>
          </div>

          <div className="service">
            <h3>Conception et aménagement</h3>
            <p>Nous créons des espaces verts sur mesure, pensés pour durer et vous ressembler.</p>
            <button className="open-modal" onClick={() => setOpen('modal3')}>Voir plus</button>
          </div>

          <div className="service">
            <h3>Entretien régulier</h3>
            <p>Un suivi saisonnier pour que vos extérieurs restent impeccables toute l'année.</p>
            <button className="open-modal" onClick={() => setOpen('modal4')}>Voir plus</button>
          </div>

          <div className="service">
            <h3>Valorisation des déchets</h3>
            <p>Nous recyclons les végétaux pour enrichir le sol et réduire votre empreinte écologique.</p>
            <button className="open-modal" onClick={() => setOpen('modal5')}>Voir plus</button>
          </div>
        </section>
      </main>

      {['modal1','modal2','modal3','modal4','modal5'].map(id => (
        <Modal
          key={id}
          isOpen={open === id}
          onClose={() => setOpen(null)}
          title={modals[id].title}
          images={modals[id].images}
        />
      ))}
    </>
  )
}
