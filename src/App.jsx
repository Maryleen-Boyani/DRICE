import React, { useState, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Leadership from './components/Leadership';
import HowItWorks from './components/HowItWorks';

import { Mail, Globe, MapPin } from 'lucide-react';
import ResearchEvent from './components/ResearchEvent';
import Footer from './components/Footer';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const contactRef = useRef(null);
  const aboutRef = useRef(null);
  const worksRef = useRef(null);
  const researchRef = useRef(null);
  const ref=useRef(null);
  const projectsRef = useRef(null);

  const handleNavClick = (target) => {
    setCurrentPage(target);

    if (target !== 'leadership') {
      setTimeout(() => {
        const refs = {
          about: aboutRef,
          projects: projectsRef,
          contact: contactRef,
          researchweek:researchRef,
          researchpipeline: worksRef
        };

        if (target === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        refs[target]?.current?.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);

       
      };
  };

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // const mailtoLink=`mailto:drice@daystar.ac.ke?subject=Inquiry: DRICE Research Pipeline&body=${encodeURIComponent(userMessage)}`;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar onNavClick={handleNavClick} currentPage={currentPage} />

      <main className="flex-grow">
  
      {currentPage === 'leadership' ? (
        <Leadership />
          ) : (
          <>
        <Hero />
        <div ref={aboutRef}><About /></div>
        <div ref={worksRef}><HowItWorks/></div>
        <div ref={researchRef}><ResearchEvent/></div>
        <div ref={projectsRef}><Projects /></div>
        
        <section ref={contactRef} className="bg-daystar-dark text-white py-24 px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h3 className="text-4xl font-bold">Ready to Start? <br/> <span className="text-daystar-blue">Let's Talk.</span></h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="bg-white/10 p-3 rounded-full"><Mail className="text-daystar-blue"/></div>
                  <div><p className="text-sm text-gray-400">Email us at</p><p className="font-bold"><a href="mailto:drice@daystar.ac.ke" className='hover:text-daystar-blue'>drice@daystar.ac.ke</a></p></div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-white/10 p-3 rounded-full"><MapPin className="text-daystar-blue"/></div>
                  <div><p className="text-sm text-gray-400">Visit us at</p><p className="font-bold">Athi River Campus, Machakos County</p></div>
                </div>
              </div>
            </div>

            <form className="bg-white md:p-10 rounded-3xl shadow-2xl space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="text" placeholder="First Name" className="p-3 bg-gray-50 border rounded-xl text-black outline-none focus:ring-2 focus:ring-daystar-blue" />
                <input type="text" placeholder="Last Name" className="p-3 bg-gray-50 border rounded-xl text-black outline-none focus:ring-2 focus:ring-daystar-blue" />
              </div>
              <input type="email" placeholder="Enter your email" className="w-full p-3 bg-gray-50 border rounded-xl text-black outline-none focus:ring-2 focus:ring-daystar-blue" />
              <textarea placeholder="Tell us about your project..." rows="4" className="w-full p-3 bg-gray-50 border rounded-xl text-black outline-none focus:ring-2 focus:ring-daystar-blue"></textarea>
              <button className="w-full bg-daystar-blue text-white py-4 rounded-xl font-bold hover:scale-105 transition-transform">
                Submit Inquiry
              </button>
            </form>
          </div>
        </section>
      </>
    )}
</main>
      <Footer/>
      <footer className="bg-white border-t py-4 text-center text-gray-500">
        <p>© {new Date().getFullYear()} Daystar University DRICE</p>
      </footer>
    </div>
  );
};

export default App;