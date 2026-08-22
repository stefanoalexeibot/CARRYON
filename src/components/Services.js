import styles from './Services.module.css';

const services = [
  {
    emoji: '🏗️',
    title: 'Montacargas Eléctrico',
    desc: 'Mantenimiento, reparación y capacitación de operadores para montacargas eléctrico industrial.',
  },
  {
    emoji: '⛽',
    title: 'Montacargas a Combustión',
    desc: 'Servicio completo para equipos a gas LP, gasolina y diesel con refacciones originales.',
  },
  {
    emoji: '🔌',
    title: 'Gennie Eléctrico',
    desc: 'Instalación, servicio y capacitación para plataformas elevadoras tipo Gennie (tijera y articulada).',
  },
  {
    emoji: '🔧',
    title: 'Soldadura Inoxidable',
    desc: 'Soldadura especializada en acero inoxidable para plantas de alimentos y laboratorios farmacéuticos.',
  },
  {
    emoji: '🚪',
    title: 'Puertas Industriales',
    desc: 'Puertas rápidas, de enrollar, corredizas y seccionales. Instalación, mantenimiento y reparación.',
  },
  {
    emoji: '🛡️',
    title: 'OCC y Seguridad',
    desc: 'Gestión de operaciones de control de calidad y sistemas de seguridad perimetral industrial.',
  },
  {
    emoji: '❄️',
    title: 'Aire Acondicionado',
    desc: 'Instalación y mantenimiento de sistemas de climatización industrial: mini-split, cassette y ductos.',
  },
  {
    emoji: '⚡',
    title: 'Electricidad y Motores',
    desc: 'Instalaciones eléctricas industriales y control de motores trifásicos, variadores y PLC.',
  },
];

export default function Services() {
  return (
    <section className={styles.section} id="servicios">
      {/* Dark background */}
      <div className="container">
        <div className="section-header">
          <span className="section-header badge white">Servicios</span>
          <h2 className="section-title light">Servicios Industriales Especializados</h2>
          <p className="section-desc light">
            Soluciones técnicas profesionales para el sector industrial. Cotiza directamente desde nuestra plataforma.
          </p>
        </div>

        <div className={styles.grid}>
          {services.map((service, i) => (
            <div key={i} className={styles.card}>
              <span className={styles.emoji}>{service.emoji}</span>
              <h3 className={styles.title}>{service.title}</h3>
              <p className={styles.desc}>{service.desc}</p>
              <a href="#contacto" className={styles.link}>
                Solicitar cotización
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
