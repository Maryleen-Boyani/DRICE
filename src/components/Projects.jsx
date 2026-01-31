import React, { useRef } from 'react';
import { ChevronRight, FileText, Database, Code, Activity, Download } from 'lucide-react';
import { motion, useInView } from "framer-motion";

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  const fileInputRef=useRef(null);

  const handleButtonClick=()=>{
    fileInputRef.current.click();
  }
  
  const projects = [
    { 
      status: "PUBLISHED", 
      title: "Institutional Knowledge AI", 
      category: "Innovation", 
      problem: "Fragmented institutional data access for staff and students.",
      outputs: ["Paper", "Dataset", "Prototype"], 
      desc: "LLM-driven system providing verified responses from indexed university policy repositories." ,
      href:"https://dikai.staka.cc/",
      isExternal: true      
    },
    { 
      status: "PILOTED", 
      title: "Kibera Sanitation Mapping", 
      category: "Research", 
      problem: "Lack of geospatial data for sanitation infrastructure in informal settlements.",
      outputs: ["Dataset", "Policy Brief", "Interactive Map"], 
      desc: "Community-led surveying to optimize NGO and government sanitation service delivery.",
      href:"https://kibera-sp-zeta.vercel.app/",
      isExternal: true
    },
    { 
      status: "DRAFT", 
      title: "Research Collaboration Graph", 
      category: "Intelligence", 
      problem: "Silod research efforts across departments.",
      outputs: ["Working Paper", "Network Map"], 
      desc: "Visualizing faculty research synergies to drive cross-disciplinary grant applications.",
      href:"https://daystar.nexoracreatives.co.ke",
      isExternal: true
    },
  ];

  // Helper for status badge colors
  const getStatusColor = (status) => {
    switch(status) {
      case 'PUBLISHED': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'PILOTED': return 'bg-blue-50 text-daystar-blue border-blue-100';
      case 'DRAFT': return 'bg-amber-50 text-amber-700 border-amber-100';
      default: return 'bg-gray-50 text-gray-700';
    }
  };

  return (
    <div>
      <motion.section ref={ref} className="max-w-7xl mx-auto py-20 px-6 md:px-20">
        
        {/* SECTION: ARTEFACT-LED PROJECTS */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            {/* <h3 className="text-sm font-bold text-daystar-blue uppercase tracking-widest mb-2">Portfolio</h3> */}
            <h2 className="text-4xl font-bold text-slate-900">Featured Artefacts</h2>
          </div>
          <p className="text-slate-500 max-w-md text-sm mt-4 md:mt-0">
            DRICE only features projects that have produced verifiable outputs, from peer-reviewed papers to functional prototypes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {projects.map((proj, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 1, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all hover:-translate-2 group flex flex-col"
            >
              <div className='p-8 grow'>
                <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStatusColor(proj.status)} mb-4`}>
                  {proj.status}
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-2 leading-tight group-hover:text-daystar-blue transition-colors">{proj.title}</h4>
                
                <div className="mb-4">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-tighter">Problem Statement</p>
                  <p className="text-slate-600 text-sm italic">"{proj.problem}"</p>
                </div>

                <p className="text-slate-500 text-sm leading-relaxed mb-6">{proj.desc}</p>
                
                <div className="pt-6 border-t border-slate-100">
                  <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Verifiable Outputs</h5>
                  <div className='flex flex-wrap gap-2'>
                    {proj.outputs.map((out, i) => (
                      <span key={i} className='bg-slate-100 text-slate-600 text-[10px] font-semibold px-2 py-1 rounded'>
                        {out}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <a href={proj.href} target='_blank'>
                <button className="w-full py-4 bg-slate-50 border-t hover:cursor-pointer border-slate-100 text-daystar-blue font-bold text-xs flex items-center justify-center gap-2 group-hover:text-white group-hover:bg-daystar-blue transition-all">
                  View Site<ChevronRight size={14} />
                </button>                      
              </a>
             
            </motion.div>
          ))}
        </div>

        {/* SECTION: DATASETS & PUBLICATIONS GALLERY */}
        <h3 className="text-4xl font-bold text-daystar-dark uppercase tracking-widest text-center mt-20">Research Outputs</h3>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12">
          
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Datasets & Publications</h3>
            <p className="text-sm text-slate-500 leading-relaxed mb-6">
              Our open-access repository for institutional memory and research validation.
            </p>
            <a href="https://repository.daystar.ac.ke/home">
              <button className="flex items-center gap-2 text-sm font-bold text-daystar-blue hover:underline">
                Access Full Repository
              </button>
            </a>
            
          </div>
          
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { type: "Working Paper", title: "AI Adoption in Kenyan Higher Ed", date: "2025" },
              { type: "Dataset", title: "Kibera Sanitation Points v1.2", date: "2024" },
              { type: "Policy Brief", title: "Emotional Inclusivity in Tech", date: "2025" },
              { type: "Poster", title: "Innovation Week Proceedings", date: "2024" }
            ].map((item, i) => (
              <div key={i} className="flex items-center p-4 bg-white border border-slate-200 rounded-xl hover:border-blue-300 transition-colors cursor-pointer">
                <div className="p-3 bg-blue-50 text-daystar-blue rounded-lg mr-4">
                  {item.type === "Dataset" ? <Database size={20} /> : <FileText size={20} />}
                </div>
                <div>
                  <p className="text-[10px] font-bold text-daystar-blue uppercase">{item.type}</p>
                  <p className="text-sm font-bold text-slate-800">{item.title}</p>
                </div>
                <ChevronRight size={16} className="ml-auto text-slate-300" />
              </div>
            ))}
          </div>
        </div>

        {/* SECTION: 2025 RESEARCHER REPORT */}
        <div className="mt-24 p-8 md:p-12 bg-slate-900 rounded-3xl text-white flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs font-bold mb-4">
              <Activity size={14} /> NEW RELEASE
            </div>
            <h2 className="text-3xl font-bold mb-4">2025 Researcher Impact Report</h2>
            <p className="text-slate-400 leading-relaxed">
              An exhaustive analysis of researcher productivity, grant acquisition, and commercialization milestones at Daystar University over the last academic year.
            </p>
          </div>
          
            <a className="whitespace-nowrap px-8 py-4 bg-white text-slate-900 font-bold rounded-xl hover:bg-blue-50 transition-colors flex items-center gap-2" href={`${import.meta.env.BASE_URL}document.pdf`}>Download 2025 Report<Download size={18} /></a> 
          
        </div>

   {/* SECTION: TARGETED CTAS */}
<div className="mt-32 text-center">
  <h3 className="text-sm font-bold text-daystar-blue uppercase tracking-widest mb-4">Get Involved</h3>
  <h2 className="text-4xl font-bold text-slate-900 mb-12">Ready to Enter the Pipeline?</h2>
  
  <div className="flex flex-wrap justify-center gap-4">
    {[
      {
        label: "Submit a Poster",
        formType: "poster",
        url: import.meta.env.VITE_POSTER_FORM_URL
      },
      {
        label: "Adopt an Innovation",
        formType: "innovation",
        url: import.meta.env.VITE_INNOVATION_FORM_URL
      },
      {
        label: "Propose a Problem",
        formType: "problem",
        url: import.meta.env.VITE_PROBLEM_FORM_URL
      },
      {
        label: "Partner with DRICE",
        formType: "partner",
        url: import.meta.env.VITE_PARTNER_FORM_URL
      },
      {
        label: "Apply to Clinics",
        formType: "clinic",
        url: import.meta.env.VITE_CLINIC_FORM_URL
      }
    ].map((cta, i) => (
      <button 
        key={i} 
        onClick={() => {
          // Optional: Add tracking
          console.log(`CTA clicked: ${cta.formType}`);
          
          if (cta.url && cta.url.startsWith('http')) {
            window.open(cta.url, '_blank', 'noopener,noreferrer');
          } else {
            console.error(`Invalid URL for ${cta.formType}: ${cta.url}`);
            alert('Form link not configured. Please contact DRICE team.');
          }
        }}
        className="px-6 py-3 border-2 border-slate-200 text-slate-700 font-bold rounded-full hover:border-daystar-blue hover:text-daystar-blue transition-all text-sm"
      >
        {cta.label}
      </button>
            ))}
          </div>
        </div>

      </motion.section>
    </div>
  );
};

export default Projects;