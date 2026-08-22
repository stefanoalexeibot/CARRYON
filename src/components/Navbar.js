'use client';

import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

const navLinks = [
  { label: 'Sistema', href: '#sistema' },
  { label: 'Cursos', href: '#cursos' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'DC3 STPS', href: '#dc3' },
  { label: 'Planes', href: '#planes' },
  { label: 'Contacto', href: '#contacto' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        {/* Logo */}
        <a href="#" className={styles.logo}>
          <span className={styles.logoIcon}>C</span>
          <span className={styles.logoText}>Carry<strong>On</strong></span>
        </a>

        {/* Desktop nav */}
        <nav className={styles.nav}>
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className={styles.navLink}>
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a href="#contacto" className={`btn btn-primary ${styles.cta}`}>
          Solicitar Demo
        </a>

        {/* Hamburger */}
        <button
          className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menú"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileOpen : ''}`}>
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={styles.mobileLink}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </a>
        ))}
        <a href="#contacto" className={`btn btn-primary ${styles.mobileCta}`} onClick={() => setMenuOpen(false)}>
          Solicitar Demo
        </a>
      </div>
    </header>
  );
}
