import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/AboutUs.css";
import bob from "../assets/img/bob.jpg";
import tom from "../assets/img/Tom.jpeg";

export default function AboutUs() {
  return (
    <>
      <header>
        <Navbar />
      </header>

      <main className="about-main">
        <div className="title-container">
          <h2 className="main-title">
            Quand les arbres rencontrent les Humains
          </h2>
          <p>Une amitié qui dure de plus de 20 ans.</p>
          <p>
            Ensemble ils ont fondé Canopées pour mettre leur énergie au service
            du vivant.
          </p>
          <p className="valeur">Nos valeurs :</p>
          <ul>
            <li>🪴 Respect de la biodiversité</li>
            <li>🤝 Relation de confiance avec nos clients</li>
            <li>🛠️ Savoir-faire artisanal et technique</li>
            <li>♻️ Economie circulaire & Gestion des déchets verts</li>
          </ul>
        </div>

        <section className="team-section">
          <div className="bob-container">
            <div className="bob-text">
              <h3 className="section-title">Bob, le Maître des Hauteurs</h3>
              <p>
                Bob, c'est l'âme tranquille de Canopées. Depuis plus de 20 ans,
                il grimpe aux arbres avec une aisance qui force le respect.
                Équipé de sa corde, de son harnais et d'un calme à toute
                épreuve, il taille, élagage et sculpte les arbres comme un
                artisan du vivant. Ancien passionné d'escalade, il a
                naturellement mis ses talents au service de la nature. Il
                connaît chaque essence d'arbre, comprend leur structure, et sait
                comment les soigner pour qu'ils restent en bonne santé. Pour les
                clients, Bob incarne la sécurité, la rigueur et la maîtrise
                technique. Pour l'équipe, c'est un pilier, un grand frère qu'on
                écoute et qu'on suit les yeux fermés.
              </p>
            </div>
            <img src={bob} alt="Bob" className="bob-img" />
          </div>

          <div className="tom-container">
            <div className="tom-text">
              <h3 className="section-title">Tom, le Jardinier Visionnaire</h3>
              <p>
                Là où Bob grimpe, Tom dessine. Tom a une imagination débordante
                et un vrai sens de l'esthétique. Créatif et observateur, il
                visualise chaque espace vert comme une toile à transformer. Avec
                lui, un simple jardin devient un havre de paix ou une œuvre
                vivante. Passionné par les plantes, les cycles naturels et les
                ambiances paysagères, Tom aime concevoir des jardins durables et
                harmonieux, en respectant le rythme des saisons et les envies
                des clients. Il apporte à Canopées une touche poétique et
                moderne, toujours à la recherche du petit détail qui fera la
                différence. Ses créations mêlent fonctionnalité, écologie et
                beauté naturelle, pour des extérieurs qui respirent la vie.
              </p>
            </div>
            <img src={tom} alt="Tom" className="tom-img" />
          </div>
        </section>

        <div className="return-container">
            <Link to="/" className='return-btn'>Retour à la page d'Accueil</Link>
        </div>
      </main>
    </>
  );
}
