import styles from './DC3.module.css';

const steps = [
  { num: '1', icon: '📝', title: 'Captura de Datos', desc: 'Ingresa Nombre, CURP, RFC, Puesto, Empresa y representantes.' },
  { num: '2', icon: '⚡', title: 'Llenado Automático', desc: 'El sistema completa el formato oficial DC3 con datos del curso.' },
  { num: '3', icon: '📄', title: 'Exportación PDF', desc: 'Genera la constancia lista para firmar, con formato exacto STPS.' },
  { num: '4', icon: '🗄️', title: 'Archivo Histórico', desc: 'Todos los DC3 quedan almacenados y descargables en el panel.' },
];

export default function DC3() {
  return (
    <section className={styles.section} id="dc3">
      <div className="container">
        <div className={styles.layout}>
          {/* Left: info */}
          <div className={styles.info}>
            <span className="section-header badge accent">Exclusivo</span>
            <h2 className={styles.title}>
              Generador DC3{' '}
              <span className={styles.titleHighlight}>Oficial STPS</span>
            </h2>
            <p className={styles.desc}>
              Olvídate de llenar formatos a mano. CarryOn genera automáticamente la <strong>Constancia de Habilidades Laborales DC3</strong> con el formato oficial vigente de la Secretaría del Trabajo — lista para firmar y presentar ante cualquier autoridad.
            </p>

            <div className={styles.highlight}>
              <span className={styles.highlightIcon}>⚖️</span>
              <div>
                <strong>Obligatorio por la STPS</strong>
                <p>Toda empresa que imparte o recibe capacitación formal en México debe contar con este documento. Tu plataforma lo genera en segundos.</p>
              </div>
            </div>

            <a href="#contacto" className="btn btn-accent btn-lg">
              Ver Demo del Generador
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>

          {/* Right: steps */}
          <div className={styles.steps}>
            {steps.map((step, i) => (
              <div key={i} className={styles.step}>
                <div className={styles.stepNum}>
                  <span>{step.num}</span>
                </div>
                {i < steps.length - 1 && <div className={styles.stepLine} />}
                <div className={styles.stepContent}>
                  <span className={styles.stepIcon}>{step.icon}</span>
                  <div>
                    <strong>{step.title}</strong>
                    <p>{step.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
