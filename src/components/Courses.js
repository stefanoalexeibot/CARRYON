import styles from './Courses.module.css';

const courses = [
  {
    emoji: '🏗️',
    category: 'Seguridad Industrial',
    title: 'Operador de Montacargas Eléctrico',
    duration: '16 horas',
    modality: 'Presencial',
    badge: 'DC3 incluido',
  },
  {
    emoji: '⚙️',
    category: 'Seguridad Industrial',
    title: 'Operador de Montacargas a Combustión',
    duration: '16 horas',
    modality: 'Presencial',
    badge: 'DC3 incluido',
  },
  {
    emoji: '🔧',
    category: 'Equipos Especiales',
    title: 'Manejo de Gennie Eléctrico',
    duration: '8 horas',
    modality: 'Presencial / Virtual',
    badge: 'DC3 incluido',
  },
  {
    emoji: '🔥',
    category: 'Manufactura',
    title: 'Soldadura en Acero Inoxidable',
    duration: '24 horas',
    modality: 'Presencial',
    badge: 'DC3 incluido',
  },
  {
    emoji: '🛡️',
    category: 'Normatividad',
    title: 'OCC Seguridad y Puertas Industriales',
    duration: '12 horas',
    modality: 'Presencial / Virtual',
    badge: 'DC3 incluido',
  },
  {
    emoji: '❄️',
    category: 'Instalaciones',
    title: 'Aire Acondicionado Industrial',
    duration: '20 horas',
    modality: 'Presencial',
    badge: 'DC3 incluido',
  },
  {
    emoji: '⚡',
    category: 'Instalaciones',
    title: 'Electricidad y Control de Motores',
    duration: '32 horas',
    modality: 'Presencial / Virtual',
    badge: 'DC3 incluido',
  },
  {
    emoji: '📋',
    category: 'Gestión',
    title: 'Prevención de Riesgos Laborales',
    duration: '8 horas',
    modality: 'Virtual',
    badge: 'DC3 incluido',
  },
];

export default function Courses() {
  return (
    <section className={styles.section} id="cursos">
      <div className="container">
        <div className="section-header">
          <span className="section-header badge">Catálogo</span>
          <h2 className="section-title">Cursos de Capacitación</h2>
          <p className="section-desc">
            Cursos presenciales y virtuales para empresas industriales. Todos generan DC3 oficial STPS automáticamente.
          </p>
        </div>

        <div className={styles.grid}>
          {courses.map((course, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.cardTop}>
                <span className={styles.emoji}>{course.emoji}</span>
                <span className={styles.badge}>{course.badge}</span>
              </div>
              <span className={styles.category}>{course.category}</span>
              <h3 className={styles.title}>{course.title}</h3>
              <div className={styles.meta}>
                <span className={styles.metaItem}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                  {course.duration}
                </span>
                <span className={styles.metaItem}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                  {course.modality}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.cta}>
          <p>¿Necesitas un curso personalizado para tu empresa?</p>
          <a href="#contacto" className="btn btn-outline">
            Consultar Disponibilidad
          </a>
        </div>
      </div>
    </section>
  );
}
