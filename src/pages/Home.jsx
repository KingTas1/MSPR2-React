import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import Slider from '../components/Slider.jsx'

import jardin from '../assets/img/jardin sombre.avif'
import locationIcon from '../assets/logos/location.svg'
import clockIcon from '../assets/logos/clock.svg'
import bobtom from '../assets/img/Bob & Tom.jpg'
import shadow from '../assets/img/shadow.png'

export default function Home() {
  return (
    <>
      <header className="home-header">
        <Navbar />

        <div className="header-faded"></div>
        <img src={jardin} alt="jardin" className="header-jardin" />
        <div className="header-container">
          <p className="header-surtitle">Découvrez l'art de</p>
          <h1 className="header-title">SUBLIMER LA NATURE</h1>
          <p className="header-subtitle">
            Nous entretenons vos espaces pour qu'ils restent des lieux de calme,
            de beauté et d'équilibre.
          </p>
          <Link to="/tarifs" className="header-button"><span>NOS TARIFS</span></Link>

          <div className="header-info">
            <p className="header-info-p">
              <img src={locationIcon} className="header-info-icon" width="24" height="24" />
              <span className="header-info-text">12 rue des Lilas, 69000 Lyon, France</span>
            </p>
            <p className="header-info-p">
              <img src={clockIcon} className="header-info-icon" width="24" height="24" />
              <span className="header-info-text">Horaires d'ouvertures: Lundi-Samedi: 8h - 18h</span>
            </p>
          </div>
        </div>
      </header>

      <main>
        <div className="main-container">
          <h2 className="main-title">Canopées - Créateur d'espaces verts durables</h2>
          <p className="main-p">
            Depuis 2020, Canopées cultive bien plus que des jardins : nous
            façonnons des lieux de respiration, d'harmonie et de renouveau. Notre
            passion pour le vivant guide chacun de nos gestes, qu'il s'agisse de
            faire naître un paysage, de redonner vie à un arbre ou de simplement
            écouter ce que la nature nous murmure. <br /><br />
            Particuliers en quête de sérénité, entreprises soucieuses de leur
            environnement, ou communes désireuses d'embellir leur cadre de vie : <br />
            Nous vous aidons à réenchanter votre quotidien par la puissance
            végétale. <br /><br />
            Chez Canopées, nous croyons que la beauté naturelle est une œuvre
            d'équilibre, et que cet équilibre se cultive avec patience, respect et
            cœur.
          </p>
        </div>

        <Slider />

        <div className="main-about-us">
          <h2 className="main-title-about-us">Bob & Tom, une équipe soudée par la nature</h2>
          <p className="main-text-about-us">
            Complices depuis plus de 20 ans, Bob et Tom ont toujours partagé une
            passion commune pour les grands espaces, les arbres majestueux et le
            travail de la terre. En 2020, ils fondent Canopées avec un objectif
            clair : proposer des services paysagers durables, accessibles et
            humains. Leur amitié et leur complémentarité donnent à l'entreprise
            une âme que l'on retrouve dans chaque projet réalisé, du petit jardin
            intime au parc arboré.
          </p>
          <div className="img-wrapper">
            <img src={bobtom} alt="Bob & Tom" className="img-bobtom" />
          </div>
          <div className="btn-wrapper">
            <Link to="/qui-sommes-nous" className="btn-about-us">Découvrir leur histoire</Link>
          </div>
        </div>

        <section>
          <div className="main-presta">
            <h2 className="presta-title">Nos prestations</h2>
            <p className="presta-text">Des services adaptés à chaque besoin vert</p>
            <p className="presta-p">
              Canopées propose une gamme complète de services pour embellir,
              entretenir et valoriser vos espaces extérieurs, quels que soient
              leur taille ou leur usage. Que vous soyez un particulier souhaitant
              profiter d'un jardin harmonieux, une entreprise désireuse d'offrir
              un cadre verdoyant à ses collaborateurs, ou une collectivité
              attentive au bien-être de ses citoyens, notre équipe vous accompagne
              avec passion et professionnalisme. De la conception à la
              réalisation, de l'entretien régulier à des interventions ponctuelles
              comme la taille de haies, l'élagage ou le compostage, nous mettons
              tout en œuvre pour créer des espaces verts durables, esthétiques et
              respectueux de l'environnement.
            </p>
            <div className="presta-btn-wrapper">
              <Link to="/prestations" className="presta-btn">Voir plus</Link>
            </div>
          </div>
        </section>

        <section className="pricing" id="tarifs">
          <div className="pricing-text">
            <p className="pricing-surtitle">Des offres adaptées à chaque besoin</p>
            <h2 className="pricing-title">Tarifs particuliers, professionnels et collectivités</h2>
            <p className="pricing-subtitle">
              Que vous soyez un particulier à la recherche d'un jardin soigné, une entreprise souhaitant valoriser ses extérieurs,
              ou une collectivité avec des besoins spécifiques, nous avons une solution claire, transparente et compétitive. Explorez nos offres.
            </p>
          </div>

          <div className="pricing-card-container">
            <div className="pricing-card c1">
              <h3><span className="plan-name">Particuliers</span></h3>
              <p className="card-subtitle">Offrir un jardin agréable, esthétique et fonctionnel pour la vie quotidienne.</p>
              <ul className="card-list">
                <li>• Entretien de jardin à l'année : tonte, taille, désherbage, arrosage.</li>
                <li>• Création d'espaces verts : pelouses, massifs, potagers familiaux.</li>
                <li>• Élagage & abattage d'arbres : sécurité, lumière, esthétique.</li>
                <li>• Conseils paysagers personnalisés : choix de plantes, aménagement durable.</li>
                <li>• Services saisonniers : nettoyage d'automne, remise en état printemps.</li>
              </ul>
              <Link to="/tarifs#particuliers" className="pricing-button">Voir nos offres</Link>
            </div>

            <div className="pricing-card c2">
              <h3><span className="plan-name">Professionnels</span></h3>
              <p className="card-subtitle">Valoriser l'image de marque de l'entreprise grâce à un cadre extérieur soigné.</p>
              <ul className="card-list">
                <li>• Aménagement d'entrées et façades végétalisées.</li>
                <li>• Entretien régulier de sites professionnels : bureaux, zones industrielles.</li>
                <li>• Création de coins détente pour collaborateurs.</li>
                <li>• Végétalisation de parkings ou toitures.</li>
                <li>• Interventions discrètes et efficaces (hors horaires d'ouverture, par ex.)</li>
              </ul>
              <Link to="/tarifs#professionnels" className="pricing-button">Voir nos offres</Link>
            </div>

            <div className="pricing-card c3">
              <h3><span className="plan-name">Collectivités</span></h3>
              <p className="card-subtitle">Entretenir des espaces publics accueillants, durables et respectueux de l'environnement.</p>
              <ul className="card-list">
                <li>• Aménagement de parcs, jardins municipaux, cours d'école.</li>
                <li>• Gestion écologique des espaces verts.</li>
                <li>• Plantation d'arbres et entretien de zones boisées.</li>
                <li>• Installation de mobiliers verts (bancs, clôtures naturelles, compost).</li>
                <li>• Interventions sur demande ou contrat annuel.</li>
              </ul>
              <Link to="/tarifs#collectivites" className="pricing-button">Voir nos offres</Link>
            </div>
          </div>

          <img src={shadow} alt="shadow" className="card-shadow" />
        </section>

        <section className="contact-section">
          <div className="contact-container">
            <h2 className="contact-title">Besoin d'un renseignement ?</h2>
            <p className="contact-text">
              Faites germer vos projets avec nous — un simple message peut être le début d'un bel espace vert.
            </p>
            <Link to="/contact" className="contact-btn">Contactez-nous</Link>
          </div>
        </section>
      </main>
    </>
  )
}
