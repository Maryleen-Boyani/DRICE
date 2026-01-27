// import React, { useRef } from 'react';
// import { Lightbulb, ChevronRight } from 'lucide-react';
// import {degrees, easeIn, easeOut, motion, useInView} from "framer-motion";

// const Projects = () => {
//   const ref=useRef(null);
//   const isInView= useInView(ref,{ once: false, margin:"-100px"});
  
//   const projects = [
//     { status:"PUBLISHED", title: "Institutional Knowledge AI", category: "Innovation", output1:"Paper", output2:"Dataset", output3:"Prototype", desc: "An intelligent knowledge management system designed as the single source of truth for Daystar University. It uses LLMs and custom-indexed policy repositories to provide staff and students with instant, verified responses to institutional queries." },
//     { status:"SUBMITTED", title: "Kibera Sanitation Mapping", category: "Research", output1:"Paper", output2:"Mobile App", output3:"Dataset", desc: "A geospatial mapping project identifying infrastructure gaps in Kibera to drive data-driven public health interventions. It leverages community-led surveying to help NGOs and local government optimize sanitation service delivery." },
//     { status:"IN PROGRESS", title: "Daystar Research Collaboration Graph & Intelligence Hub", category: "Education", output1:"Working Paper", output2:"Policy Brief", output3:"", desc: "Improving digital resource access for remote students." },
    
//   ];

//   return (
//     <motion.section ref={ref} className="max-w-7xl mx-auto py-16 px-20">
//       <motion.h3 initial={{opacity:0, y:30}} animate={isInView ? {opacity:1, y:0}:{}} transition={{duration:2 , ease:"easeOut"}} className="text-3xl font-bold mb-10">Featured Projects</motion.h3>
//       <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//         {projects.map((proj, idx) => (
//           <motion.div initial={{rotate: 0, opacity:0, y:40}} animate={isInView ? {opacity:1, y:0}: {}} whileHover={{scale:1.1}} transition={{duration:1, ease:easeOut}} key={idx} className="rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
//             <div className='p-6 pb-2'>
//               <div className="w-12 h-12 pl-10 rounded-lg flex items-center justify-center mb-6 transition-colors">
              
//               <div className='bg-[#eefcf4] text-[#059669] text-[10px] md:text-xs font-medium tracking-wider px-2.5 py-1 md:px-3 md:py-1.5 rounded-md inline-flex items-center justify-center shadow-sm '>
//                 {proj.status}
//               </div>
//               </div>
//               <span className="text-xs font-bold text-daystar-blue uppercase tracking-widest">{proj.category}</span>
//               <h4 className="text-xl font-bold mt-2 mb-3">{proj.title}</h4>
//               <p className="text-gray-500 text-sm leading-relaxed mb-6">{proj.desc}</p>
//               <div className="w-full h-0.4 bg-gray-200 rounded-full " />
//             </div>
//             <div className="w-full h-0.5 bg-gray-200 rounded-full" />
//             <div className='p-6 pt-2 text-gray-500 text-sm mb-0'>
//               <h5 className='font-medium'>OUTPUTS</h5>
//               <div className=' flex flex-row gap-4 mt-2 mb-2'>
//                 <div className='bg-[#f8fafc]/500'>
//                   {proj.output1}
//                 </div>
//                 <div className='bg-[#f8fafc]/500'>
//                   {proj.output2}
//                 </div>
//                 <div className='bg-[#f8fafc]/500'>
//                   {proj.output3}
//                 </div>
//               </div>
              
//               <button className="flex-end items-center gap-2 text-daystar-blue font-bold text-sm">
//                 Visit Site <ChevronRight size={16} />
//               </button>
//             </div>
            

            
//           </motion.div>
//         ))}
//       </motion.div>
//     </motion.section>
//   );
// };

// export default Projects;
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
      desc: "LLM-driven system providing verified responses from indexed university policy repositories." 
    },
    { 
      status: "PILOTED", 
      title: "Kibera Sanitation Mapping", 
      category: "Research", 
      problem: "Lack of geospatial data for sanitation infrastructure in informal settlements.",
      outputs: ["Dataset", "Policy Brief", "Interactive Map"], 
      desc: "Community-led surveying to optimize NGO and government sanitation service delivery." 
    },
    { 
      status: "DRAFT", 
      title: "Research Collaboration Graph", 
      category: "Intelligence", 
      problem: "Silod research efforts across departments.",
      outputs: ["Working Paper", "Network Map"], 
      desc: "Visualizing faculty research synergies to drive cross-disciplinary grant applications." 
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((proj, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 1, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all group flex flex-col"
            >
              <div className='p-8 flex-grow'>
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
              
              <button className="w-full py-4 bg-slate-50 border-t border-slate-100 text-daystar-blue font-bold text-xs flex items-center justify-center gap-2 group-hover:text-white group-hover:bg-daystar-blue transition-all">
                View Artefact <ChevronRight size={14} />
              </button>
            </motion.div>
          ))}
        </div>

        {/* SECTION: DATASETS & PUBLICATIONS GALLERY */}
        <h3 className="text-4xl font-bold text-daystar-dark uppercase tracking-widest text-center mt-20">Research Outputs</h3>
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Datasets & Publications</h3>
            <p className="text-sm text-slate-500 leading-relaxed mb-6">
              Our open-access repository for institutional memory and research validation.
            </p>
            <button className="flex items-center gap-2 text-sm font-bold text-daystar-blue hover:underline">
              Access Full Repository <Download size={16} />
            </button>
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
            <div className='px-6 py-3 border-2 border-slate-200 text-slate-700 font-bold rounded-full hover:border-daystar-blue hover:text-daystar-blue transition-all text-sm'>
              <input type="file"className='hidden' ref={fileInputRef} />
              <button onClick={handleButtonClick}>Submit a Poster</button>
            </div>
            {[
              
              "Adopt an Innovation",
              "Propose a Problem",
              "Partner with DRICE",
              "Apply to Clinics"
            ].map((cta, i) => (
              <button 
                key={i} 
                className="px-6 py-3 border-2 border-slate-200 text-slate-700 font-bold rounded-full hover:border-daystar-blue hover:text-daystar-blue transition-all text-sm"
              >
                {cta}
              </button>
            ))}
          </div>
        </div>

      </motion.section>
    </div>
  );
};

export default Projects;