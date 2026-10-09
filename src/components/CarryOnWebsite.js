'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ArrowRight, Menu, X, MoveUpRight, MapPin, Phone, MessageCircle, Check, Plus, GraduationCap, Wrench, MonitorPlay } from 'lucide-react';
import { contact } from '@/data/contact';

const links = [['Nosotros', '#nosotros'], ['Capacitación', '#capacitacion'], ['Servicios', '#servicios'], ['Pólizas', '#polizas'], ['En acción', '#galeria']];
const galleryGroup = (start, end, details) => Array.from({ length: end - start + 1 }, (_, offset) => ({
  src: `gallery/carryon-${String(start + offset).padStart(2, '0')}`,
  ...details,
}));

const photos = [
  ...galleryGroup(1, 12, {
    title: 'Montacargas en operación',
    label: 'EQUIPOS INDUSTRIALES',
    alt: 'Montacargas en operación dentro de instalaciones industriales',
    category: 'Operación',
  }),
  {
    src: 'gallery/carryon-13',
    title: 'Conocimiento que se comparte',
    label: 'FORMACIÓN EN AULA',
    alt: 'Instructor de CarryOn impartiendo una sesión de capacitación',
    category: 'Capacitación',
  },
  ...galleryGroup(14, 16, {
    title: 'Equipos preparados para la operación',
    label: 'MANEJO DE MATERIALES',
    alt: 'Equipos de manejo de materiales en instalaciones industriales',
    category: 'Operación',
  }),
  {
    src: 'gallery/carryon-17',
    title: 'Un equipo que avanza unido',
    label: 'EQUIPO CARRYON',
    alt: 'Equipo CarryOn reunido en una sesión de trabajo',
    category: 'Equipo',
  },
  ...galleryGroup(18, 21, {
    title: 'Práctica en el entorno real',
    label: 'OPERACIÓN SEGURA',
    alt: 'Equipo industrial utilizado en la operación diaria',
    category: 'Operación',
  }),
  {
    src: 'gallery/carryon-22',
    title: 'Aprender para hacerlo mejor',
    label: 'CAPACITACIÓN',
    alt: 'Participantes de CarryOn durante una capacitación en aula',
    category: 'Capacitación',
  },
  {
    src: 'gallery/carryon-23',
    title: 'La práctica lleva al dominio',
    label: 'OPERACIÓN DE EQUIPOS',
    alt: 'Montacargas durante una práctica dentro de una planta industrial',
    category: 'Capacitación',
  },
  {
    src: 'gallery/carryon-24',
    title: 'Servicio técnico en acción',
    label: 'SERVICIOS INDUSTRIALES',
    alt: 'Personal realizando trabajo técnico en una instalación industrial',
    category: 'Servicios',
  },
  ...galleryGroup(25, 27, {
    title: 'La seguridad se lleva a la práctica',
    label: 'CAPACITACIÓN EN CAMPO',
    alt: 'Práctica de capacitación industrial de CarryOn',
    category: 'Capacitación',
  }),
  ...galleryGroup(28, 29, {
    title: 'El valor está en el equipo',
    label: 'CARRYON EN ACCIÓN',
    alt: 'Equipo de CarryOn durante una sesión de trabajo',
    category: 'Equipo',
  }),
];
const courseGroups = [
  {
    title: 'Operación de equipos',
    courses: ['Montacargas vertical y horizontal', 'Montacargas trilateral y clamp', 'Patín eléctrico e hidráulico', 'Grúas viajeras'],
  },
  {
    title: 'Seguridad industrial',
    courses: ['Bloqueo y etiquetado de energías (LOTO)', 'Espacios confinados', 'Recipientes sujetos a presión', 'Prevención y combate a incendios', 'Comisiones de seguridad'],
  },
  {
    title: 'Riesgos y protección',
    courses: ['Manejo de sustancias químicas y peligrosas', 'Uso y manejo de extintores', 'Trabajo en alturas', 'Manejo seguro de la electricidad', 'Selección y uso de EPP'],
  },
  {
    title: 'Formación técnica',
    courses: ['Soldadura', 'SolidWorks', 'Manejo seguro de herramientas', 'Seguridad industrial'],
  },
];
const services = [
  ['Montacargas y plataformas', 'Soporte para equipos de manejo de materiales y plataformas elevadoras. Cuéntanos qué equipo utilizas y qué atención necesitas.'],
  ['Soldadura en acero inoxidable', 'Soluciones de soldadura para los requerimientos de tus instalaciones y proyectos industriales.'],
  ['Puertas industriales', 'Instalación, mantenimiento y reparación de puertas para espacios de operación industrial.'],
  ['Aire acondicionado', 'Instalación y mantenimiento de equipos de climatización para tus espacios de trabajo.'],
  ['Electricidad y control de motores', 'Atención a instalaciones eléctricas y sistemas de control de motores para la operación industrial.'],
];

function WhatsAppLink({ children, className = '', message = 'Hola, me gustaría recibir información sobre los servicios de CarryOn.' }) {
  return <a className={className} href={`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`} target="_blank" rel="noopener noreferrer">{children}</a>;
}

export default function CarryOnWebsite() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activePhoto, setActivePhoto] = useState(0);
  const dialog = useRef(null);
  const [requestReady, setRequestReady] = useState(false);

  useEffect(() => {
    const items = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible');
      });
    }, { threshold: 0.12 });
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  function sendRequest(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const message = `Hola CarryOn, me gustaría solicitar información.\n\nNombre: ${data.get('nombre').trim()}\nEmpresa: ${data.get('empresa').trim() || 'No indicada'}\nMe interesa: ${data.get('interes')}\n\n${data.get('mensaje').trim()}`;
    window.open(`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    setRequestReady(true);
  }

  function openPhoto(index) {
    setActivePhoto(index);
    dialog.current.showModal();
  }

  return <>
    <a className="skip-link" href="#contenido">Ir al contenido</a>
    <header className="site-header">
      <div className="shell nav-wrap">
        <a href="#inicio" className="brand" aria-label="CarryOn, inicio"><img src="/images/carryon-logo.png" alt="CarryOn" width="2055" height="765" /></a>
        <nav className="desktop-nav" aria-label="Navegación principal">{links.map(([label, href]) => <a href={href} key={href}>{label}</a>)}</nav>
        <a className="button nav-cta" href="#contacto">Hablemos <ArrowUpRight size={17} /></a>
        <button className="menu-toggle" aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuOpen} aria-controls="mobile-nav" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      </div>
      {menuOpen && <nav id="mobile-nav" className="mobile-nav" aria-label="Navegación móvil" onKeyDown={e => { if (e.key === 'Escape') setMenuOpen(false); }}>{[...links, ['Contacto', '#contacto']].map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}<ArrowUpRight size={18} /></a>)}</nav>}
    </header>

    <main id="contenido">
      <section className="hero" id="inicio" aria-labelledby="hero-title">
        <img className="hero-photo" src="/images/operacion-montacargas.jpg" alt="Capacitación práctica con montacargas en un almacén industrial" fetchPriority="high" width="1280" height="960" />
        <div className="hero-shade" />
        <div className="shell hero-content hero-enter">
          <p className="eyebrow light"><span className="status-dot" /> CAPACITACIÓN + SERVICIOS INDUSTRIALES</p>
          <h1 id="hero-title">Personas preparadas.<br />Operaciones<br /><span>que avanzan.</span></h1>
          <p className="hero-description">Impulsa a tu equipo con capacitación práctica y soluciones industriales para el día a día de tu empresa.</p>
          <div className="hero-actions"><a href="#contacto" className="button button-blue">Cotiza con nosotros <ArrowUpRight size={19} /></a><a href="#capacitacion" className="text-link">Conoce lo que hacemos <ArrowRight size={18} /></a></div>
        </div>
        <div className="shell hero-bottom hero-enter-delay"><span><MapPin size={15} /> {contact.location}</span><span>CONOCIMIENTO QUE SE LLEVA A LA PRÁCTICA <span className="small-cross">+</span></span></div>
        <div className="hero-side" aria-hidden="true">CARRYON / EN MOVIMIENTO</div>
      </section>

      <div className="expertise-strip"><div className="shell"><span>EL SIGUIENTE PASO DE TU OPERACIÓN</span><a href="#capacitacion"><GraduationCap /> Capacitación industrial <ArrowUpRight size={17} /></a><a href="#servicios"><Wrench /> Servicios especializados <ArrowUpRight size={17} /></a></div></div>

      <section className="section shell intro" id="nosotros" data-reveal>
        <div><p className="eyebrow">01 / SOMOS CARRYON</p><h2>Tu equipo.<br />Tu operación.<br /><span className="muted">Nuestro enfoque.</span></h2></div>
        <div className="intro-copy"><p className="large-copy">Detrás de cada operación hay personas que hacen que todo funcione.</p><p>En CarryOn conectamos la capacitación con la realidad del trabajo industrial. Acompañamos a empresas que buscan preparar a su personal y atender las necesidades técnicas de su operación.</p><p>Desde Monterrey, Nuevo León, ponemos el conocimiento y la práctica al servicio de tu equipo.</p><a className="underlined-link" href="#contacto">Conversemos sobre tu empresa <ArrowUpRight size={18} /></a></div>
      </section>

      <section className="training section" id="capacitacion" data-reveal>
        <div className="shell">
          <div className="section-heading"><div><p className="eyebrow">02 / CAPACITACIÓN INDUSTRIAL</p><h2>Aprender para<br /><span className="muted">hacerlo mejor.</span></h2></div><p>Formación que conecta el aula con la operación.<br />Consulta los temas y opciones para tu equipo.</p></div>
          <div className="training-grid">
            <div className="training-feature"><img src="/images/capacitacion-instructor.jpg" alt="Instructor explicando la operación de montacargas durante una capacitación" width="1600" height="900" loading="lazy" /><div className="photo-tag"><span className="status-dot" /> CONOCIMIENTO EN ACCIÓN</div><div className="training-caption"><span>De la teoría<br />a tu lugar de trabajo.</span><ArrowUpRight size={35} strokeWidth={1} /></div></div>
            <div className="course-catalogue"><div className="catalogue-intro"><span className="catalogue-mark"><Check size={18} /></span><div><h3>Catálogo de capacitación</h3><p>Todos nuestros cursos incluyen emisión de DC3.</p></div></div>{courseGroups.map((group) => <div className="course-group" key={group.title}><h3>{group.title}</h3><ul>{group.courses.map((course) => <li key={course}><a href="#contacto">{course}<ArrowUpRight size={15} /></a></li>)}</ul></div>)}<a className="catalogue-cta" href="#contacto">Solicitar información de un curso <ArrowUpRight size={18} /></a></div>
          </div>
        </div>
      </section>

      <section className="services section" id="servicios" data-reveal>
        <div className="shell services-layout"><div className="services-intro"><p className="eyebrow light">03 / SERVICIOS INDUSTRIALES</p><h2>Soluciones para<br />seguir <span>adelante.</span></h2><p>Tu operación tiene necesidades específicas. Hablemos de tus equipos, instalaciones y del trabajo que necesitas realizar.</p><a href="#contacto" className="button button-white">Consultar un servicio <ArrowUpRight size={18} /></a><div className="service-photo"><img src="/images/montacargas-almacen.jpg" width="1200" height="1600" alt="Equipo de montacargas en instalaciones industriales" loading="lazy" /><span>ATENCIÓN A TU OPERACIÓN</span></div></div>
          <div className="service-list">{services.map(([title, description], index) => <details key={title} open={index === 0 ? true : undefined}><summary><span className="service-number">0{index + 1}</span><h3>{title}</h3><Plus size={22} /></summary><div className="service-detail"><p>{description}</p><a href="#contacto">Solicitar información <ArrowUpRight size={16} /></a></div></details>)}<p className="service-footnote">Cada proyecto comienza con una conversación.<br />Consulta el alcance y la disponibilidad de nuestros servicios.</p></div>
        </div>
      </section>

      <section className="maintenance section" id="polizas" data-reveal><div className="shell maintenance-layout"><div className="maintenance-image"><img src="/images/gallery/carryon-24.jpg" alt="Trabajo técnico de mantenimiento industrial" width="1600" height="1200" loading="lazy" /><span>ATENCIÓN PARA TU OPERACIÓN</span></div><div className="maintenance-content"><p className="eyebrow">04 / MANTENIMIENTO Y PÓLIZAS</p><h2>Equipos atendidos.<br /><span className="muted">Operación en marcha.</span></h2><p>CarryOn ofrece servicios de mantenimiento y pólizas para acompañar las necesidades de tu operación industrial.</p><div className="maintenance-points"><div><span>01</span><h3>Mantenimiento</h3><p>Atención para equipos, instalaciones y requerimientos técnicos de tu empresa.</p></div><div><span>02</span><h3>Pólizas</h3><p>Alternativas de servicio pensadas para dar seguimiento a tu operación.</p></div><div><span>03</span><h3>Solicitud directa</h3><p>Cuéntanos qué equipo o instalación necesitas atender y te orientamos.</p></div></div><a href="#contacto" className="button button-blue">Solicitar información <ArrowUpRight size={19} /></a></div></div></section>

      <section className="section shell gallery" id="galeria" data-reveal><div className="section-heading"><div><p className="eyebrow">05 / CARRYON EN ACCIÓN</p><h2>El trabajo habla.</h2></div><p>Momentos reales de capacitación y práctica.<br />Así se vive CarryOn, dentro y fuera del aula.</p></div><div className="gallery-grid gallery-preview-grid">{photos.slice(0, 8).map((photo, index) => <button className="gallery-item" key={photo.src} onClick={() => openPhoto(index)} aria-label={`Ampliar foto: ${photo.title}`}><img src={`/images/${photo.src}.jpg`} alt={photo.alt} width="1600" height="1200" loading="lazy" /><span className="gallery-overlay"><span><small>{photo.label}</small><strong>{photo.title}</strong></span><span className="gallery-open"><MoveUpRight size={19} /></span></span></button>)}</div><div className="gallery-preview-action"><div><strong>Más de 20 momentos de CarryOn</strong><span>Capacitación, operación, servicios y equipo.</span></div><a className="button button-outline" href="/galeria">Ver galería completa <ArrowUpRight size={18} /></a></div></section>

      <section className="coming-section" data-reveal><div className="shell coming"><div className="coming-icon"><MonitorPlay size={35} strokeWidth={1.3} /></div><div className="coming-copy"><p className="eyebrow"><span className="coming-badge">PRÓXIMAMENTE</span> EL SIGUIENTE PASO</p><h2>CarryOn, también en línea.</h2><p>Estamos preparando un espacio digital para seguir aprendiendo: cursos en línea, seguimiento de tu capacitación y consulta de documentos en un solo lugar.</p><span className="coming-note">Estas funciones aún no están disponibles. Por ahora, te atendemos de forma directa.</span></div><WhatsAppLink className="underlined-link" message="Hola, me gustaría conocer más sobre la futura plataforma de capacitación de CarryOn.">Quiero saber más <ArrowUpRight size={19} /></WhatsAppLink></div></section>

      <section className="section shell contact" id="contacto" data-reveal><div className="contact-copy"><p className="eyebrow">06 / HABLEMOS</p><h2>¿Qué necesita<br /><span className="muted">tu operación?</span></h2><p>Cuéntanos qué tienes en mente. Juntos podemos encontrar el siguiente paso para tu equipo o tu empresa.</p><a className="contact-phone" href={`tel:${contact.phone}`}>{contact.phoneLabel}<ArrowUpRight size={25} /></a><span className="location"><MapPin size={17} />{contact.location}</span><WhatsAppLink className="underlined-link"><MessageCircle size={18} /> Prefiero escribir por WhatsApp <ArrowUpRight size={17} /></WhatsAppLink></div>
        <form className="contact-form" onSubmit={sendRequest}><h3>Comencemos una conversación.</h3><p>Prepara tu solicitud y compártela con nosotros por WhatsApp.</p><div className="form-row"><label>Tu nombre <span>*</span><input name="nombre" placeholder="Nombre y apellido" required maxLength={100} autoComplete="name" pattern=".*\S.*" /></label><label>Empresa<input name="empresa" placeholder="Nombre de tu empresa" maxLength={150} autoComplete="organization" /></label></div><label>¿En qué podemos ayudarte? <span>*</span><select name="interes" required defaultValue=""><option value="" disabled>Selecciona una opción</option><option>Capacitación industrial</option><option>Servicios industriales</option><option>Capacitación y servicios</option><option>Información general</option></select></label><label>Cuéntanos un poco más <span>*</span><textarea name="mensaje" placeholder="Equipo, tipo de servicio, número de participantes…" required maxLength={2000} rows={3} /></label><button className="button button-blue" type="submit">Continuar en WhatsApp <ArrowUpRight size={19} /></button><p className="form-note" role="status">{requestReady ? 'Tu solicitud está preparada. Revisa el mensaje en WhatsApp y pulsa enviar para hacérnoslo llegar.' : 'Se abrirá WhatsApp con tu mensaje. Tú lo revisas y decides cuándo enviarlo.'}</p></form>
      </section>
    </main>

    <footer className="footer"><div className="shell footer-top"><a href="#inicio" aria-label="CarryOn, volver al inicio"><img src="/images/carryon-logo-white.png" alt="CarryOn" width="2056" height="765" /></a><p>Personas preparadas.<br />Operaciones que avanzan.</p><a href="#inicio" className="back-top">Volver al inicio <ArrowUpRight size={20} /></a></div><div className="shell footer-bottom"><span>© {new Date().getFullYear()} CarryOn. Todos los derechos reservados.</span><span>CAPACITACIÓN + SERVICIOS INDUSTRIALES</span><span>MONTERREY, N.L.</span></div></footer>
    <WhatsAppLink className="whatsapp-float"><MessageCircle size={23} /><span>Hablemos</span></WhatsAppLink>

    <dialog ref={dialog} className="lightbox" aria-label={photos[activePhoto].title} onClick={e => { if (e.target === e.currentTarget) dialog.current.close(); }}><button className="lightbox-close" aria-label="Cerrar fotografía" onClick={() => dialog.current.close()}><X size={25} /></button><img src={`/images/${photos[activePhoto].src}.jpg`} alt={photos[activePhoto].alt} /><div className="lightbox-caption"><span>{photos[activePhoto].title}</span><span>{activePhoto + 1} / {photos.length}</span></div></dialog>
  </>;
}
