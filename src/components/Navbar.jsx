import React, { useState } from 'react';
import { Menu, X, ExternalLink } from 'lucide-react';

const Navbar = ({ currentPage, onNavClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', target: 'home', type: 'scroll' },
    { label: 'Grants', target: 'grants' },
    { label: 'DRICE News', target: 'blogs' },
    { label: 'Leadership', target: 'leadership' },
    { label: 'Publications', target: 'publications' },
    { label: 'BRAINS 2026', isExternal: true, href: 'https://daystar.odoo.com/event/du-brains-ai-conference-2026-16/page/introduction-brains-conference-2026-1' },
    { label: 'Grants Hub', isExternal: true, href: 'https://grants-intelligence-hub.vercel.app/' },
    { label: 'Innovation', isExternal: true, href: 'https://drice-start-ups.web.app/' },
  ];

  const handleInternalClick = (target) => {
    onNavClick(target);
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">

          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => onNavClick('home')}
          >
            <img src="./du.png" alt="Logo" className="w-24 md:w-[140px] h-auto" />
            <div>
              <span className="text-xl font-bold text-daystar-blue tracking-tight uppercase">DRICE</span>
              <p className="text-[10px] text-gray-500 uppercase leading-none">Daystar University</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) =>
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
                <button
                  key={link.label}
                  onClick={() => onNavClick(link.target)}
                  className={`transition-colors duration-200 font-medium ${
                    currentPage === link.target ? 'text-daystar-blue' : 'text-gray-700 hover:text-daystar-blue'
                  }`}
                >
                  {link.label}
                </button>
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
          {navLinks.map((link) =>
            link.isExternal ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="text-left font-medium text-gray-700 hover:text-daystar-blue transition-colors duration-200 flex items-center gap-1"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label} <ExternalLink size={14} />
              </a>
            ) : (
              <button
                key={link.label}
                onClick={() => handleInternalClick(link.target)}
                className="text-left font-medium text-gray-700 hover:text-daystar-blue transition-colors duration-200"
              >
                {link.label}
              </button>
            )
          )}
          <button className="bg-daystar-blue text-white p-3 rounded-lg font-bold">
            Contact Us
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;