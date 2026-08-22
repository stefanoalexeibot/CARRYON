import styles from './Footer.module.css';

const links = {
  Sistema: ['Módulo Capacitación', 'Generador DC3', 'Panel CMS', 'Servicios Industriales'],
  Empresa: ['Quiénes somos', 'Northpeak Digital', 'Casos de éxito', 'Blog'],
  Soporte: ['Documentación', 'FAQ', 'Contacto', 'Demo gratuita'],
};

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          {/* Brand */}
          <div className={styles.brand}>
            <div className={styles.logo}>
              <span className={styles.logoIcon}>C</span>
              <span className={styles.logoText}>Carry<strong>On</strong></span>
            </div>
            <p className={styles.tagline}>
              Plataforma digital especializada en capacitación industrial y servicios. Desarrollada por Northpeak Digital.
            </p>
            <div className={styles.social}>
              <a href="#" aria-label="LinkedIn" className={styles.socialLink}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
              <a href="#" aria-label="WhatsApp" className={styles.socialLink}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.118 1.528 5.848L0 24l6.335-1.502A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.847 0-3.574-.5-5.07-1.375L2 22l1.386-4.875A9.956 9.956 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section} className={styles.linkGroup}>
              <h4 className={styles.linkGroupTitle}>{section}</h4>
              <ul className={styles.linkList}>
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" className={styles.link}>{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={styles.bottom}>
          <p>© {new Date().getFullYear()} CarryOn · Desarrollado por <a href="https://northpeakdigital.com.mx" target="_blank" rel="noopener noreferrer">Northpeak Digital</a></p>
          <div className={styles.bottomLinks}>
            <a href="#">Privacidad</a>
            <a href="#">Términos</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
