import './globals.css';

export const metadata = {
  title: 'CarryOn | Capacitación y soluciones industriales en Monterrey',
  description: 'Capacitación para operadores y servicios industriales en Monterrey, Nuevo León. Conoce CarryOn y solicita información para tu empresa.',
  keywords: 'capacitación industrial Monterrey, cursos montacargas, servicios industriales, operadores, CarryOn',
  openGraph: {
    title: 'CarryOn | Capacitación y soluciones industriales',
    description: 'Personas preparadas. Operaciones que avanzan. Capacitación y servicios en Monterrey, Nuevo León.',
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
