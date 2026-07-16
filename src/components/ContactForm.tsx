"use client";

import { useState } from "react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="contact-success" role="status">
        <div className="success-icon" />
        <h3>Message envoyé.</h3>
        <p>Merci ! On revient vers vous très vite.</p>
      </div>
    );
  }

  return (
    <form
      className="contact-form"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <div className="form-row">
        <div className="form-field">
          <label htmlFor="name">Nom</label>
          <input id="name" name="name" type="text" placeholder="Votre nom" autoComplete="name" required />
        </div>
        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" placeholder="vous@email.com" autoComplete="email" required />
        </div>
      </div>
      <div className="form-field">
        <label htmlFor="project">Type de projet</label>
        <select id="project" name="project" defaultValue="site">
          <option value="site">Site web premium</option>
          <option value="seo">Référencement</option>
          <option value="ia">Intelligence Artificielle</option>
          <option value="auto">Automatisation / SaaS</option>
          <option value="autre">Autre</option>
        </select>
      </div>
      <div className="form-field">
        <label htmlFor="message">Votre message</label>
        <textarea
          id="message"
          name="message"
          placeholder="Décrivez votre projet en quelques lignes..."
          rows={5}
          required
        />
      </div>
      <button className="primary-button form-submit" type="submit">Envoyer le message</button>
    </form>
  );
}
