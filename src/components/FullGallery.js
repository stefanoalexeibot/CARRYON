'use client';

import { useRef, useState } from 'react';
import { ArrowLeft, MoveUpRight, X } from 'lucide-react';
import { galleryFilters, photos } from '@/data/gallery';

export default function FullGallery() {
  const [filter, setFilter] = useState('Todas');
  const [activePhoto, setActivePhoto] = useState(0);
  const dialog = useRef(null);
  const visiblePhotos = filter === 'Todas' ? photos : photos.filter((photo) => photo.category === filter);

  function openPhoto(index) {
    setActivePhoto(index);
    dialog.current.showModal();
  }

  return <main className="gallery-page">
    <header className="gallery-page-header"><div className="shell"><a href="/" className="brand" aria-label="CarryOn, inicio"><img src="/images/carryon-logo.png" alt="CarryOn" width="2055" height="765" /></a><a href="/#galeria" className="gallery-back"><ArrowLeft size={18} /> Volver al inicio</a></div></header>
    <section className="section shell gallery"><div className="section-heading"><div><p className="eyebrow">CARRYON EN ACCIÓN</p><h1>La galería<br /><span className="muted">completa.</span></h1></div><p>Capacitación, operación, servicios y las personas que hacen avanzar a CarryOn.</p></div><div className="gallery-filters" aria-label="Filtrar galería">{galleryFilters.map((item) => <button key={item} className={filter === item ? 'is-active' : ''} onClick={() => setFilter(item)}>{item}</button>)}</div><div className="gallery-grid">{visiblePhotos.map((photo) => <button className="gallery-item" key={photo.src} onClick={() => openPhoto(photos.indexOf(photo))} aria-label={`Ampliar foto: ${photo.title}`}><img src={`/images/${photo.src}.jpg`} alt={photo.alt} width="1600" height="1200" loading="lazy" /><span className="gallery-overlay"><span><small>{photo.label}</small><strong>{photo.title}</strong></span><span className="gallery-open"><MoveUpRight size={19} /></span></span></button>)}</div></section>
    <dialog ref={dialog} className="lightbox" aria-label={photos[activePhoto].title} onClick={(event) => { if (event.target === event.currentTarget) dialog.current.close(); }}><button className="lightbox-close" aria-label="Cerrar fotografía" onClick={() => dialog.current.close()}><X size={25} /></button><img src={`/images/${photos[activePhoto].src}.jpg`} alt={photos[activePhoto].alt} /><div className="lightbox-caption"><span>{photos[activePhoto].title}</span><span>{activePhoto + 1} / {photos.length}</span></div></dialog>
  </main>;
}
