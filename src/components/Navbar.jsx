import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Menu, X, ExternalLink } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Grants', to: '/grants' },
  { label: 'DRICE News', to: '/news' },
  { label: 'Leadership', to: '/leadership' },
  { label: 'Publications', to: '/publications' },
  {
    label: 'BRAINS 2026',
    href: 'https://daystar.odoo.com/event/du-brains-ai-conference-2026-16/page/introduction-brains-conference-2026-1',
    isExternal: true,
  },
  {
    label: 'Innovation',
    href: 'https://drice-start-ups.web.app/',
    isExternal: true,
  },
];

const activeLinkClass = 'text-daystar-blue font-semibold';
const inactiveLinkClass = 'text-gray-700 hover:text-daystar-blue font-medium transition-colors duration-200';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2" onClick={closeMenu}>
            <img src="/du.png" alt="Logo" className="w-24 md:w-[140px] h-auto" />
            <div>
              <span className="text-xl font-bold text-daystar-blue tracking-tight uppercase">DRICE</span>
              <p className="text-[10px] text-gray-500 uppercase leading-none">Daystar University</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) =>
              link.isExternal ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-gray-700 hover:text-daystar-blue transition-colors duration-200 font-medium"
                >
                  {link.label} <ExternalLink size={14} />
                </a>
              ) : (
                <Link
                  key={link.label}
                  to={link.to}
                  activeProps={{ className: activeLinkClass }}
                  inactiveProps={{ className: inactiveLinkClass }}
                  activeOptions={link.to === '/' ? { exact: true } : undefined}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* Mobile Hamburger */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t p-6 flex flex-col gap-6 shadow-xl">
          {NAV_LINKS.map((link) =>
            link.isExternal ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="text-left font-medium text-gray-700 hover:text-daystar-blue transition-colors duration-200 flex items-center gap-1"
                onClick={closeMenu}
              >
                {link.label} <ExternalLink size={14} />
              </a>
            ) : (
              <Link
                key={link.label}
                to={link.to}
                activeProps={{ className: activeLinkClass }}
                inactiveProps={{ className: inactiveLinkClass }}
                activeOptions={link.to === '/' ? { exact: true } : undefined}
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            )
          )}
          <Link
            to="/contact"
            className="bg-daystar-blue text-white p-3 rounded-lg font-bold text-center"
            onClick={closeMenu}
          >
            Contact Us
          </Link>
        </div>
      )}
    </nav>
  );
}
