import React, { useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Leadership from './components/Leadership';
import HowItWorks from './components/HowItWorks';
import ContactForm from './components/ContactForm';
import Project from './components/Project';
import About from './components/About';
import Blogs from './components/Blogs';
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
  const homeRef=useRef(null);
  const projectsRef = useRef(null);

  const handleNavClick = (target) => {
    setCurrentPage(target);

    const standalonePages=['leadership', 'project'];

    if(standalonePages.includes(target)){
      window.scrollTo({top:0, behavior:'instant'})
    }
      else{
        setTimeout(() => {
        const refs = {
          home:homeRef,
          about: aboutRef,
          contact: contactRef,
          researchweek: researchRef,
          researchpipeline: worksRef
        };

        if (target === 'home') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          refs[target]?.current?.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };
   const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // const mailtoLink=`mailto:drice@daystar.ac.ke?subject=Inquiry: DRICE Research Pipeline&body=${encodeURIComponent(userMessage)}`;
  const renderContent= ()=>{
    switch (currentPage){
      case 'leadership':
        return <Leadership/>;
      case 'project':
        return <Project/>;
      case 'blogs':
        return <Blogs/>
      case 'home':
        default :
        return (
          <>
            <Hero />
            <div ref={aboutRef}><About /></div>
            <div ref={worksRef}><HowItWorks/></div>
            <div ref={researchRef}><ResearchEvent/></div>
            <div ref={contactRef}><ContactForm/></div>
        
        
          </>
        )
    }
  }

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Navbar onNavClick={handleNavClick} currentPage={currentPage} />

        <main className="flex-grow">
          {currentPage === 'leadership' ? (
            <Leadership />
          ) : (
            <>
              <Hero />
              <div ref={aboutRef}><About /></div>
              <div ref={worksRef}><HowItWorks /></div>
              <div ref={researchRef}><ResearchEvent /></div>
              <div ref={projectsRef}><Projects /></div>
              <div ref={contactRef}>
                <ContactForm />
              </div>
            </>
          )}
        </main>
        
        <Footer />
        <footer className="bg-white border-t py-4 text-center text-gray-500">
          <p>© {new Date().getFullYear()} Daystar University DRICE</p>
        </footer>
      </div>
      
      <Routes>
        <Route path="/contact" element={<ContactForm />} />
      </Routes>
    </Router>
  );
};

export default App;