import { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import "../styles/contact.css";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState({});

  async function onSubmit(e) {
    e.preventDefault();
    setStatus("");
    setErrors({});

    const form = e.currentTarget;
    const fd = new FormData(form);

    const nom = fd.get("nom")?.trim();
    const email = fd.get("email")?.trim();
    const phone = fd.get("phone")?.trim();
    const text = fd.get("text")?.trim();

    const nextErrors = {};
    if (!nom) nextErrors.nom = "Le nom est requis.";
    if (!email) nextErrors.email = "L’email est requis.";
    else if (!/^\S+@\S+\.\S+$/.test(email))
      nextErrors.email = "Email invalide.";
    if (phone && !/^[0-9+().\s-]{6,}$/.test(phone))
      nextErrors.phone = "Téléphone invalide.";
    if (!text) nextErrors.text = "Veuillez écrire un message.";

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    try {
      setLoading(true);
      setStatus("Envoi en cours…");

      const USE_JSON = true;

      let res, data;
      if (USE_JSON) {
        res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nom, email, phone, text }),
        });
        data = await res.json().catch(() => ({}));
      } else {
        const fd2 = new FormData();
        fd2.set("nom", nom);
        fd2.set("email", email);
        fd2.set("phone", phone || "");
        fd2.set("text", text);
        res = await fetch("/api/message", { method: "POST", body: fd2 });
        data = await res.json().catch(() => ({}));
      }

      if (!res.ok || data?.ok === false) {
        throw new Error(data?.error || `Erreur serveur (${res.status})`);
      }

      setStatus(`✅ Message envoyé ! ID: ${data?.id ?? "OK"}`);
      form.reset();
    } catch (err) {
      setStatus(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <header>
        <Navbar />
      </header>

      <main className="main-container contact-layout page-with-fixed-nav">
        <div className="main-title">
          <h2 className="contact-title">
            Contactez-nous pour un devis, une intervention ou un renseignement
          </h2>
          <div className="container-contact">
            <p>Vous avez un arbre à élaguer ? Un jardin à transformer ?</p>
            <p>Envoyez-nous un message, et nous vous répondrons sous 24h.</p>
            <p>
              Appelez-nous pour prendre un rdv au <span>06.99.99.99.99</span>
            </p>
            <p className="findme">
              Où nous trouver : 12 rue des Lilas, 69000 Lyon, France
            </p>
          </div>
        </div>

        <section className="form-section">
          <div className="form-container">
            <form
              id="contact-form"
              className="contact-form"
              onSubmit={onSubmit}
              noValidate
            >
              <h3 className="form-title">Nous contacter</h3>

              <label htmlFor="name">Nom</label>
              <input
                type="text"
                id="name"
                name="nom"
                required
                aria-invalid={!!errors.nom}
              />
              <p className="error-message" id="name-error">
                {errors.nom || ""}
              </p>

              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                aria-invalid={!!errors.email}
              />
              <p className="error-message" id="email-error">
                {errors.email || ""}
              </p>

              <label htmlFor="phone">Numéro de téléphone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                aria-invalid={!!errors.phone}
              />
              <p className="error-message" id="phone-error">
                {errors.phone || ""}
              </p>

              <label htmlFor="message">Votre message</label>
              <textarea
                id="message"
                name="text"
                rows="5"
                required
                aria-invalid={!!errors.text}
              />
              <p className="error-message" id="message-error">
                {errors.text || ""}
              </p>

              <button type="submit" className="form-btn" disabled={loading}>
                {loading ? "Envoi…" : "Envoyer"}
              </button>
              <p id="form-status" aria-live="polite" style={{ marginTop: 12 }}>
                {status}
              </p>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
