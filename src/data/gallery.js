const galleryGroup = (start, end, details) => Array.from({ length: end - start + 1 }, (_, offset) => ({
  src: `gallery/carryon-${String(start + offset).padStart(2, '0')}`,
  ...details,
}));

export const photos = [
  ...galleryGroup(1, 12, { title: 'Montacargas en operación', label: 'EQUIPOS INDUSTRIALES', alt: 'Montacargas en operación dentro de instalaciones industriales', category: 'Operación' }),
  { src: 'gallery/carryon-13', title: 'Conocimiento que se comparte', label: 'FORMACIÓN EN AULA', alt: 'Instructor de CarryOn impartiendo una sesión de capacitación', category: 'Capacitación' },
  ...galleryGroup(14, 16, { title: 'Equipos preparados para la operación', label: 'MANEJO DE MATERIALES', alt: 'Equipos de manejo de materiales en instalaciones industriales', category: 'Operación' }),
  { src: 'gallery/carryon-17', title: 'Un equipo que avanza unido', label: 'EQUIPO CARRYON', alt: 'Equipo CarryOn reunido en una sesión de trabajo', category: 'Equipo' },
  ...galleryGroup(18, 21, { title: 'Práctica en el entorno real', label: 'OPERACIÓN SEGURA', alt: 'Equipo industrial utilizado en la operación diaria', category: 'Operación' }),
  { src: 'gallery/carryon-22', title: 'Aprender para hacerlo mejor', label: 'CAPACITACIÓN', alt: 'Participantes de CarryOn durante una capacitación en aula', category: 'Capacitación' },
  { src: 'gallery/carryon-23', title: 'La práctica lleva al dominio', label: 'OPERACIÓN DE EQUIPOS', alt: 'Montacargas durante una práctica dentro de una planta industrial', category: 'Capacitación' },
  { src: 'gallery/carryon-24', title: 'Servicio técnico en acción', label: 'SERVICIOS INDUSTRIALES', alt: 'Personal realizando trabajo técnico en una instalación industrial', category: 'Servicios' },
  ...galleryGroup(25, 27, { title: 'La seguridad se lleva a la práctica', label: 'CAPACITACIÓN EN CAMPO', alt: 'Práctica de capacitación industrial de CarryOn', category: 'Capacitación' }),
  ...galleryGroup(28, 29, { title: 'El valor está en el equipo', label: 'CARRYON EN ACCIÓN', alt: 'Equipo de CarryOn durante una sesión de trabajo', category: 'Equipo' }),
];

export const galleryFilters = ['Todas', 'Capacitación', 'Operación', 'Servicios', 'Equipo'];
