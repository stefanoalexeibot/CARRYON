import styles from './Hero.module.css';

const stats = [
  { value: '8+', label: 'Servicios industriales especializados' },
  { value: 'DC3', label: 'Generación oficial STPS automática' },
  { value: '100%', label: 'Autónomo, sin depender de agencia' },
  { value: '8 sem', label: 'Entrega en 8 semanas hábiles' },
];

export default function Hero() {
  return (
    <section className={styles.hero} id="inicio">
      {/* Background mesh */}
      <div className={styles.mesh} aria-hidden="true">
        <div className={styles.meshOrb1} />
        <div className={styles.meshOrb2} />
        <div className={styles.meshOrb3} />
        <div className={styles.grid} />
      </div>

      <div className={`container ${styles.content}`}>
        {/* Badge */}
        <div className={`animate-fade-up ${styles.badge}`}>
          <span className={styles.badgeDot} />
          Plataforma Digital Especializada
        </div>

        {/* Heading */}
        <h1 className={`animate-fade-up animate-delay-1 ${styles.heading}`}>
          Capacitación Industrial
          <br />
          <span className={styles.headingAccent}>Profesionalizada</span>
        </h1>

        {/* Subheading */}
        <p className={`animate-fade-up animate-delay-2 ${styles.sub}`}>
          De la operación manual a un sistema digital autónomo. Gestiona cursos presenciales y virtuales, genera el DC3 oficial STPS y ofrece servicios industriales — todo desde tu propio panel.
        </p>

        {/* CTA Buttons */}
        <div className={`animate-fade-up animate-delay-3 ${styles.actions}`}>
          <a href="#contacto" className="btn btn-primary btn-lg">
            Solicitar Demo Gratuita
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
          <a href="#sistema" className="btn btn-secondary btn-lg">
            Ver el Sistema
          </a>
        </div>

        {/* Stats */}
        <div className={`animate-fade-up animate-delay-4 ${styles.stats}`}>
          {stats.map((stat) => (
            <div key={stat.value} className={styles.statItem}>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={styles.scroll} aria-hidden="true">
        <div className={styles.scrollLine} />
      </div>
    </section>
  );
}
