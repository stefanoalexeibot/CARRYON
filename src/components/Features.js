import styles from './Features.module.css';

const modules = [
  {
    icon: '🎓',
    number: '01',
    title: 'Capacitación Presencial y Virtual',
    desc: 'Catálogo de cursos con módulos, lecciones y reproductor de video. Control de progreso por trabajador y registro de evidencias por evento.',
    items: ['Catálogo de cursos presenciales', 'Plataforma de cursos virtuales', 'Videos con acceso controlado', 'Registro de evidencias y listas de asistencia'],
  },
  {
    icon: '📄',
    number: '02',
    title: 'Generador DC3 Oficial STPS',
    desc: 'Formulario inteligente que llena automáticamente el formato oficial DC3 con datos del curso, fechas y duración. Exportación PDF lista para firmar.',
    items: ['Formulario de captura CURP/RFC', 'Llenado automático del formato STPS', 'Exportación PDF oficial', 'Archivo histórico de constancias'],
  },
  {
    icon: '🏭',
    number: '03',
    title: 'Servicios Industriales',
    desc: 'Catálogo profesional de 8 servicios especializados con fichas detalladas. Formulario de cotización sin exponer proveedores externos.',
    items: ['8 servicios especializados', 'Fichas técnicas por categoría', 'Formulario de cotización directo', 'Gestión de solicitudes en panel'],
  },
  {
    icon: '⚙️',
    number: '04',
    title: 'Panel CMS Autónomo',
    desc: '100% sin agencia. Gestiona cursos, videos, usuarios, empresas y servicios industriales desde tu propio tablero de control visual.',
    items: ['Control total de cursos y contenido', 'Gestión de usuarios y empresas', 'Administración de servicios', 'Preparado para pagos con Stripe'],
  },
];

export default function Features() {
  return (
    <section className={styles.section} id="sistema">
      <div className="container">
        <div className="section-header">
          <span className="section-header badge">El Sistema</span>
          <h2 className="section-title">4 Módulos Integrados</h2>
          <p className="section-desc">
            Una plataforma donde CarryOn opera de forma completamente autónoma — sin depender de ninguna agencia.
          </p>
        </div>

        <div className={styles.grid}>
          {modules.map((mod, i) => (
            <div key={mod.number} className={styles.card} style={{ animationDelay: `${i * 0.1}s` }}>
              <div className={styles.cardHeader}>
                <span className={styles.number}>{mod.number}</span>
                <span className={styles.icon}>{mod.icon}</span>
              </div>
              <h3 className={styles.cardTitle}>{mod.title}</h3>
              <p className={styles.cardDesc}>{mod.desc}</p>
              <ul className={styles.list}>
                {mod.items.map((item) => (
                  <li key={item} className={styles.listItem}>
                    <svg className={styles.check} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom banner */}
        <div className={styles.banner}>
          <div className={styles.bannerContent}>
            <span className={styles.bannerIcon}>🚀</span>
            <div>
              <strong>Arquitectura lista para pagos en línea</strong>
              <p>Preparada técnicamente para activar cobros con Stripe cuando CarryOn lo decida — sin costo adicional.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
