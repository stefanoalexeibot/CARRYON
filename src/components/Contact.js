'use client';

import { useState } from 'react';
import styles from './Contact.module.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    nombre: '',
    empresa: '',
    email: '',
    telefono: '',
    interes: '',
    mensaje: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Solicitud CarryOn — ${formData.nombre} (${formData.empresa})`);
    const body = encodeURIComponent(
      `Nombre: ${formData.nombre}\nEmpresa: ${formData.empresa}\nEmail: ${formData.email}\nTeléfono: ${formData.telefono}\nInterés: ${formData.interes}\n\nMensaje:\n${formData.mensaje}`
    );
    window.location.href = `mailto:contacto@carryon.mx?subject=${subject}&body=${body}`;
  };

  return (
    <section className={styles.section} id="contacto">
      <div className="container">
        <div className={styles.layout}>
          {/* Left info */}
          <div className={styles.info}>
            <span className="section-header badge white">Contacto</span>
            <h2 className={styles.title}>Hablemos de tu Proyecto</h2>
            <p className={styles.desc}>
              Agenda una demo gratuita y te mostramos en vivo cómo funciona la plataforma CarryOn. Sin compromisos.
            </p>

            <div className={styles.details}>
              <div className={styles.detailItem}>
                <span className={styles.detailIcon}>📞</span>
                <div>
                  <strong>Teléfono</strong>
                  <p>+52 (81) 1234-5678</p>
                </div>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailIcon}>✉️</span>
                <div>
                  <strong>Email</strong>
                  <p>contacto@carryon.mx</p>
                </div>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailIcon}>🌐</span>
                <div>
                  <strong>Web</strong>
                  <p>www.northpeakdigital.com.mx</p>
                </div>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailIcon}>⏱️</span>
                <div>
                  <strong>Respuesta</strong>
                  <p>En menos de 24 horas hábiles</p>
                </div>
              </div>
            </div>

            <div className={styles.trust}>
              <div className={styles.trustItem}>
                <span>🏭</span>
                <span>Sector Industrial</span>
              </div>
              <div className={styles.trustItem}>
                <span>🇲🇽</span>
                <span>México</span>
              </div>
              <div className={styles.trustItem}>
                <span>🔒</span>
                <span>100% Confiable</span>
              </div>
            </div>
          </div>

          {/* Right form */}
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.row}>
              <div className={styles.field}>
                <label htmlFor="nombre">Nombre completo *</label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  required
                  placeholder="Tu nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="empresa">Empresa *</label>
                <input
                  id="empresa"
                  name="empresa"
                  type="text"
                  required
                  placeholder="Nombre de tu empresa"
                  value={formData.empresa}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.field}>
                <label htmlFor="email">Email *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="tu@empresa.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="telefono">Teléfono</label>
                <input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  placeholder="+52 81 1234 5678"
                  value={formData.telefono}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="interes">¿Qué te interesa?</label>
              <select
                id="interes"
                name="interes"
                value={formData.interes}
                onChange={handleChange}
              >
                <option value="">Selecciona una opción</option>
                <option value="Demo de la plataforma">Demo de la plataforma completa</option>
                <option value="Paquete Completo">Paquete Completo ($51,900 MXN)</option>
                <option value="Paquete Profesional">Paquete Profesional ($46,900 MXN)</option>
                <option value="Paquete Esencial">Paquete Esencial ($32,900 MXN)</option>
                <option value="Módulos individuales">Módulos individuales</option>
                <option value="Servicios industriales">Servicios industriales</option>
                <option value="Otro">Otro</option>
              </select>
            </div>

            <div className={styles.field}>
              <label htmlFor="mensaje">Mensaje</label>
              <textarea
                id="mensaje"
                name="mensaje"
                rows={4}
                placeholder="Cuéntanos sobre tu empresa y lo que necesitas..."
                value={formData.mensaje}
                onChange={handleChange}
              />
            </div>

            <button type="submit" id="submit-contact" className={`btn btn-primary btn-lg ${styles.submit}`}>
              Enviar Solicitud
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 2L11 13M22 2L15 22 11 13 2 9l20-7z"/>
              </svg>
            </button>

            <p className={styles.note}>
              Al enviar confirmas que aceptas ser contactado por el equipo de CarryOn / Northpeak Digital.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
