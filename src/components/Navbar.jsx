import React, { useState } from 'react';
import { Menu, X, GraduationCap, ExternalLink } from 'lucide-react';

const Navbar = ({ currentPage, onNavClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', target: 'home', type:'scroll'},
    { label: 'About', target: 'about', type:'scroll' },
    { label: 'Projects', target: 'projects', type:'scroll' },
    { label: 'Leadership', target: 'leadership', type:'page'},
    { label: 'Kibera Sanitation', target: 'leadership' },
    { label: 'SDG Dashboard', isExternal: true, href: 'https://sdg.daystar.ac.ke' },
  ];

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentPage('home')}>        
              <img src="/du.png" alt="Loading..." width={140} height={140} />
            
            <div>
              <span className="text-xl font-bold text-daystar-blue tracking-tight uppercase">DRICE</span>
              <p className="text-[10px] text-gray-500 uppercase leading-none">Daystar University</p>
            </div>
          </div>

          
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              link.isExternal ? (
                <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-daystar-blue transition font-medium">
                  {link.label} <ExternalLink size={14} />
                </a>
              ) : (
                <button key={link.label} onClick={() => onNavClick(link.target)} className={`transition font-medium ${currentPage === link.target ? 'text-daystar-blue' : 'hover:text-daystar-blue'}`}>
                  {link.label}
                </button>
              )
            ))}
            <button onClick={()=>onNavClick('contact')} className="bg-daystar-blue text-white px-5 py-2 rounded-full font-semibold hover:bg-opacity-90 transition shadow-md">
              Contact Us
            </button>
          </div>

        
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

     
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t p-6 flex flex-col gap-6 shadow-xl">
          {navLinks.map((link) => (
            <button key={link.label} onClick={() => { if(!link.isExternal) setCurrentPage(link.target); setIsMenuOpen(false); }} className="text-left font-medium">
              {link.label}
            </button>
          ))}
          <button className="bg-daystar-blue text-white p-3 rounded-lg font-bold">Contact Us</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;