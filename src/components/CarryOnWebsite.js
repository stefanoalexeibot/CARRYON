'use client';

import { useRef, useState } from 'react';
import { ArrowUpRight, ArrowRight, Menu, X, MoveUpRight, MapPin, Phone, MessageCircle, Check, Plus, GraduationCap, Wrench, MonitorPlay } from 'lucide-react';
import { contact } from '@/data/contact';

const links = [['Nosotros', '#nosotros'], ['Capacitación', '#capacitacion'], ['Servicios', '#servicios'], ['En acción', '#galeria']];
const photos = [
  { src: 'operacion-montacargas', title: 'Aprender en la operación', label: 'PRÁCTICA EN CAMPO', alt: 'Operadores a bordo de un montacargas dentro de un almacén' },
  { src: 'capacitacion-instructor', title: 'Conocimiento que se comparte', label: 'FORMACIÓN EN AULA', alt: 'Instructor de CarryOn impartiendo una sesión de operación de montacargas' },
  { src: 'capacitacion-equipo', title: 'Equipos que se preparan', label: 'CAPACITACIÓN', alt: 'Participantes durante una sesión de capacitación en aula' },
  { src: 'trabajo-en-altura', title: 'La práctica hace la diferencia', label: 'OPERACIÓN DE EQUIPOS', alt: 'Montacargas en operación junto a estanterías de un almacén' },
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
        <div className="shell hero-content">
          <p className="eyebrow light"><span className="status-dot" /> CAPACITACIÓN + SERVICIOS INDUSTRIALES</p>
          <h1 id="hero-title">Personas preparadas.<br />Operaciones<br /><span>que avanzan.</span></h1>
          <p className="hero-description">Impulsa a tu equipo con capacitación práctica y soluciones industriales para el día a día de tu empresa.</p>
          <div className="hero-actions"><a href="#contacto" className="button button-blue">Cotiza con nosotros <ArrowUpRight size={19} /></a><a href="#capacitacion" className="text-link">Conoce lo que hacemos <ArrowRight size={18} /></a></div>
        </div>
        <div className="shell hero-bottom"><span><MapPin size={15} /> {contact.location}</span><span>CONOCIMIENTO QUE SE LLEVA A LA PRÁCTICA <span className="small-cross">+</span></span></div>
        <div className="hero-side" aria-hidden="true">CARRYON / EN MOVIMIENTO</div>
      </section>

      <div className="expertise-strip"><div className="shell"><span>EL SIGUIENTE PASO DE TU OPERACIÓN</span><a href="#capacitacion"><GraduationCap /> Capacitación industrial <ArrowUpRight size={17} /></a><a href="#servicios"><Wrench /> Servicios especializados <ArrowUpRight size={17} /></a></div></div>

      <section className="section shell intro" id="nosotros">
        <div><p className="eyebrow">01 / SOMOS CARRYON</p><h2>Tu equipo.<br />Tu operación.<br /><span className="muted">Nuestro enfoque.</span></h2></div>
        <div className="intro-copy"><p className="large-copy">Detrás de cada operación hay personas que hacen que todo funcione.</p><p>En CarryOn conectamos la capacitación con la realidad del trabajo industrial. Acompañamos a empresas que buscan preparar a su personal y atender las necesidades técnicas de su operación.</p><p>Desde Monterrey, Nuevo León, ponemos el conocimiento y la práctica al servicio de tu equipo.</p><a className="underlined-link" href="#contacto">Conversemos sobre tu empresa <ArrowUpRight size={18} /></a></div>
      </section>

      <section className="training section" id="capacitacion">
        <div className="shell">
          <div className="section-heading"><div><p className="eyebrow">02 / CAPACITACIÓN INDUSTRIAL</p><h2>Aprender para<br /><span className="muted">hacerlo mejor.</span></h2></div><p>Formación que conecta el aula con la operación.<br />Consulta los temas y opciones para tu equipo.</p></div>
          <div className="training-grid">
            <div className="training-feature"><img src="/images/capacitacion-instructor.jpg" alt="Instructor explicando la operación de montacargas durante una capacitación" width="1600" height="900" loading="lazy" /><div className="photo-tag"><span className="status-dot" /> CONOCIMIENTO EN ACCIÓN</div><div className="training-caption"><span>De la teoría<br />a tu lugar de trabajo.</span><ArrowUpRight size={35} strokeWidth={1} /></div></div>
            <div className="course-list">
              {[
                ['01', 'Operación de montacargas', 'Capacitación para operadores de montacargas eléctricos y de combustión.'],
                ['02', 'Plataformas elevadoras', 'Formación para el manejo de plataformas y equipos de elevación.'],
                ['03', 'Seguridad en la operación', 'Preparación del personal con enfoque en el entorno de trabajo industrial.'],
              ].map(([number, title, description]) => <a className="course" key={number} href="#contacto"><span className="course-number">{number}</span><div><h3>{title}</h3><p>{description}</p></div><ArrowUpRight size={21} /></a>)}
              <div className="course-note"><Check size={19} /><p>Platícanos qué necesita tu equipo. Te orientamos sobre contenidos, modalidad y disponibilidad.</p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="services section" id="servicios">
        <div className="shell services-layout"><div className="services-intro"><p className="eyebrow light">03 / SERVICIOS INDUSTRIALES</p><h2>Soluciones para<br />seguir <span>adelante.</span></h2><p>Tu operación tiene necesidades específicas. Hablemos de tus equipos, instalaciones y del trabajo que necesitas realizar.</p><a href="#contacto" className="button button-white">Consultar un servicio <ArrowUpRight size={18} /></a><div className="service-photo"><img src="/images/montacargas-almacen.jpg" width="1200" height="1600" alt="Equipo de montacargas en instalaciones industriales" loading="lazy" /><span>ATENCIÓN A TU OPERACIÓN</span></div></div>
          <div className="service-list">{services.map(([title, description], index) => <details key={title} open={index === 0 ? true : undefined}><summary><span className="service-number">0{index + 1}</span><h3>{title}</h3><Plus size={22} /></summary><div className="service-detail"><p>{description}</p><a href="#contacto">Solicitar información <ArrowUpRight size={16} /></a></div></details>)}<p className="service-footnote">Cada proyecto comienza con una conversación.<br />Consulta el alcance y la disponibilidad de nuestros servicios.</p></div>
        </div>
      </section>

      <section className="section shell gallery" id="galeria"><div className="section-heading"><div><p className="eyebrow">04 / CARRYON EN ACCIÓN</p><h2>El trabajo habla.</h2></div><p>Momentos reales de capacitación y práctica.<br />Así se vive CarryOn, dentro y fuera del aula.</p></div><div className="gallery-grid">{photos.map((photo, index) => <button className={`gallery-item gallery-item-${index}`} key={photo.src} onClick={() => openPhoto(index)} aria-label={`Ampliar foto: ${photo.title}`}><img src={`/images/${photo.src}.jpg`} alt={photo.alt} width={index === 3 ? 960 : 1600} height={index === 3 ? 1280 : 900} loading="lazy" /><span className="gallery-overlay"><span><small>{photo.label}</small><strong>{photo.title}</strong></span><span className="gallery-open"><MoveUpRight size={19} /></span></span></button>)}</div></section>

      <section className="coming-section"><div className="shell coming"><div className="coming-icon"><MonitorPlay size={35} strokeWidth={1.3} /></div><div className="coming-copy"><p className="eyebrow"><span className="coming-badge">PRÓXIMAMENTE</span> EL SIGUIENTE PASO</p><h2>CarryOn, también en línea.</h2><p>Estamos preparando un espacio digital para seguir aprendiendo: cursos en línea, seguimiento de tu capacitación y consulta de documentos en un solo lugar.</p><span className="coming-note">Estas funciones aún no están disponibles. Por ahora, te atendemos de forma directa.</span></div><WhatsAppLink className="underlined-link" message="Hola, me gustaría conocer más sobre la futura plataforma de capacitación de CarryOn.">Quiero saber más <ArrowUpRight size={19} /></WhatsAppLink></div></section>

      <section className="section shell contact" id="contacto"><div className="contact-copy"><p className="eyebrow">05 / HABLEMOS</p><h2>¿Qué necesita<br /><span className="muted">tu operación?</span></h2><p>Cuéntanos qué tienes en mente. Juntos podemos encontrar el siguiente paso para tu equipo o tu empresa.</p><a className="contact-phone" href={`tel:${contact.phone}`}>{contact.phoneLabel}<ArrowUpRight size={25} /></a><span className="location"><MapPin size={17} />{contact.location}</span><WhatsAppLink className="underlined-link"><MessageCircle size={18} /> Prefiero escribir por WhatsApp <ArrowUpRight size={17} /></WhatsAppLink></div>
        <form className="contact-form" onSubmit={sendRequest}><h3>Comencemos una conversación.</h3><p>Prepara tu solicitud y compártela con nosotros por WhatsApp.</p><div className="form-row"><label>Tu nombre <span>*</span><input name="nombre" placeholder="Nombre y apellido" required maxLength={100} autoComplete="name" pattern=".*\S.*" /></label><label>Empresa<input name="empresa" placeholder="Nombre de tu empresa" maxLength={150} autoComplete="organization" /></label></div><label>¿En qué podemos ayudarte? <span>*</span><select name="interes" required defaultValue=""><option value="" disabled>Selecciona una opción</option><option>Capacitación industrial</option><option>Servicios industriales</option><option>Capacitación y servicios</option><option>Información general</option></select></label><label>Cuéntanos un poco más <span>*</span><textarea name="mensaje" placeholder="Equipo, tipo de servicio, número de participantes…" required maxLength={2000} rows={3} /></label><button className="button button-blue" type="submit">Continuar en WhatsApp <ArrowUpRight size={19} /></button><p className="form-note" role="status">{requestReady ? 'Tu solicitud está preparada. Revisa el mensaje en WhatsApp y pulsa enviar para hacérnoslo llegar.' : 'Se abrirá WhatsApp con tu mensaje. Tú lo revisas y decides cuándo enviarlo.'}</p></form>
      </section>
    </main>

    <footer className="footer"><div className="shell footer-top"><a href="#inicio" aria-label="CarryOn, volver al inicio"><img src="/images/carryon-logo-white.png" alt="CarryOn" width="2056" height="765" /></a><p>Personas preparadas.<br />Operaciones que avanzan.</p><a href="#inicio" className="back-top">Volver al inicio <ArrowUpRight size={20} /></a></div><div className="shell footer-bottom"><span>© {new Date().getFullYear()} CarryOn. Todos los derechos reservados.</span><span>CAPACITACIÓN + SERVICIOS INDUSTRIALES</span><span>MONTERREY, N.L.</span></div></footer>
    <WhatsAppLink className="whatsapp-float"><MessageCircle size={23} /><span>Hablemos</span></WhatsAppLink>

    <dialog ref={dialog} className="lightbox" aria-label={photos[activePhoto].title} onClick={e => { if (e.target === e.currentTarget) dialog.current.close(); }}><button className="lightbox-close" aria-label="Cerrar fotografía" onClick={() => dialog.current.close()}><X size={25} /></button><img src={`/images/${photos[activePhoto].src}.jpg`} alt={photos[activePhoto].alt} /><div className="lightbox-caption"><span>{photos[activePhoto].title}</span><span>{activePhoto + 1} / {photos.length}</span></div></dialog>
  </>;
}
