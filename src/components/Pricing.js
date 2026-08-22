import styles from './Pricing.module.css';

const plans = [
  {
    name: 'Paquete Esencial',
    price: '$32,900',
    savings: '$5,600 de ahorro',
    desc: 'Todo lo necesario para digitalizar la capacitación.',
    modules: [
      'Diseño y Arquitectura Digital',
      'Módulo Capacitación (Presencial + Virtual)',
      'Autenticación y Roles',
      'Infraestructura y Despliegue',
    ],
    cta: 'Solicitar Esencial',
    featured: false,
  },
  {
    name: 'Paquete Profesional',
    price: '$46,900',
    savings: '$9,600 de ahorro',
    desc: 'Con generador DC3 oficial STPS y panel autónomo.',
    modules: [
      'Todo del Paquete Esencial',
      'Generador DC3 Oficial STPS',
      'Panel CMS Autónomo',
    ],
    cta: 'Solicitar Profesional',
    featured: false,
  },
  {
    name: 'Paquete Completo',
    price: '$51,900',
    savings: '$14,600 de ahorro',
    badge: '⭐ Recomendado',
    desc: 'La plataforma completa. Todos los módulos integrados.',
    modules: [
      'Todo del Paquete Profesional',
      'Módulo Servicios Industriales',
      '2 meses mantenimiento GRATIS',
      'Capacitación del equipo GRATIS',
      'Arquitectura Stripe activable',
      'Garantía de ajuste 30 días',
    ],
    cta: 'Solicitar Completo',
    featured: true,
  },
];

const addons = [
  { label: 'Mantenimiento mensual', value: 'desde $2,500 MXN/mes' },
  { label: 'Capacitación adicional', value: '$1,500 MXN/sesión' },
  { label: 'Módulos extra a la carta', value: 'Consultar precio' },
];

export default function Pricing() {
  return (
    <section className={styles.section} id="planes">
      <div className="container">
        <div className="section-header">
          <span className="section-header badge">Inversión</span>
          <h2 className="section-title">Planes de Inversión</h2>
          <p className="section-desc">
            Elige el paquete que se adapta a tus objetivos. Todos incluyen entrega en 8 semanas hábiles.
          </p>
        </div>

        <div className={styles.grid}>
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`${styles.card} ${plan.featured ? styles.featured : ''}`}
            >
              {plan.badge && (
                <div className={styles.badge}>{plan.badge}</div>
              )}
              <div className={styles.cardHeader}>
                <h3 className={styles.planName}>{plan.name}</h3>
                <div className={styles.priceRow}>
                  <span className={styles.price}>{plan.price}</span>
                  <span className={styles.currency}>MXN</span>
                </div>
                <span className={styles.savings}>{plan.savings}</span>
                <p className={styles.desc}>{plan.desc}</p>
              </div>

              <ul className={styles.modules}>
                {plan.modules.map((mod) => (
                  <li key={mod} className={styles.moduleItem}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    {mod}
                  </li>
                ))}
              </ul>

              <a href="#contacto" className={`btn ${plan.featured ? 'btn-primary' : 'btn-outline'} ${styles.planCta}`}>
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        {/* ROI box */}
        <div className={styles.roi}>
          <div className={styles.roiIcon}>📈</div>
          <div>
            <strong>¿Cuándo se recupera la inversión?</strong>
            <p>Un solo curso grupal para empresa con 20 trabajadores cuesta entre $15,000 y $40,000 MXN. Con solo 2 a 4 eventos de capacitación adicionales la inversión completa se recupera.</p>
          </div>
        </div>

        {/* Addons */}
        <div className={styles.addons}>
          <h3 className={styles.addonsTitle}>Servicios Adicionales</h3>
          <div className={styles.addonGrid}>
            {addons.map((addon) => (
              <div key={addon.label} className={styles.addon}>
                <span>{addon.label}</span>
                <strong>{addon.value}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
