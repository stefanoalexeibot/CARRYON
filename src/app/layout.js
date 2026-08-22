import './globals.css';

export const metadata = {
  title: 'CarryOn — Plataforma Digital de Capacitación Industrial',
  description: 'Plataforma LMS especializada en capacitación industrial, cursos presenciales y virtuales, generador DC3 oficial STPS y servicios industriales en México.',
  keywords: 'capacitación industrial, LMS México, cursos montacargas, DC3 STPS, seguridad industrial, CarryOn',
  openGraph: {
    title: 'CarryOn — Plataforma Digital de Capacitación Industrial',
    description: 'De la operación manual a un sistema digital autónomo de capacitación y servicios industriales.',
    type: 'website',
    locale: 'es_MX',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es-MX">
      <body>{children}</body>
    </html>
  );
}
