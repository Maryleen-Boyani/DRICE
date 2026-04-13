// import React, { useRef } from 'react';
// import { ChevronRight, FileText, Database, Code, Activity, Download } from 'lucide-react';
// import { motion, useInView } from "framer-motion";

// const Project = () => {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: false, margin: "-100px" });
//   const fileInputRef=useRef(null);

//   const handleButtonClick=()=>{
//     fileInputRef.current.click();
//   }
  
//   const project = [
//     {
//       status: "PUBLISHED", 
//       title: "SDG Impact Dashboard", 
//       category: "Impact", 
//       problem: "Difficulty in tracking and visualizing institutional contribution to Global Sustainable Development Goals.",
//       outputs: ["Live Dashboard", "Evidence Map", "SDG Report"], 
//       desc: "An interactive platform for evidence generation and tracking impact across the 17 UN Sustainable Development Goals.",
//       href: "https://daystar-sdg-impact-and-evidence-gen.vercel.app/",
//       isExternal: true      
//     },
    
//     { 
//       status: "OPEN", 
//       title: "Daystar University Internal Research Grant", 
//       category: "Staff Research", 
//       problem: "Strengthening Daystar's research culture by funding interdisciplinary, impact-oriented research.",
//       outputs: ["Interdisciplinary Research", "Institutional Impact"], 
//       desc: "Funding support for research aligned to the University's mission and national development priorities, with a maximum award of KSh 800,000.",
//       href: "https://forms.office.com/r/mH67vZyLXX",
//       isExternal: true      
//     },
//   //   { 
//   //     status: "PILOTED", 
//   //     title: "Kibera Sanitation Mapping", 
//   //     category: "Research", 
//   //     problem: "Lack of geospatial data for sanitation infrastructure in informal settlements.",
//   //     outputs: ["Dataset", "Policy Brief", "Interactive Map"], 
//   //     desc: "Community-led surveying to optimize NGO and government sanitation service delivery.",
//   //     href:"https://kibera-sp-zeta.vercel.app/",
//   //     isExternal: true
//   //   },
//   //   { 
//   //     status: "DRAFT", 
//   //     title: "Research Collaboration Graph", 
//   //     category: "Intelligence", 
//   //     problem: "Silod research efforts across departments.",
//   //     outputs: ["Working Paper", "Network Map"], 
//   //     desc: "Visualizing faculty research synergies to drive cross-disciplinary grant applications.",
//   //     href:"https://daystar.nexoracreatives.co.ke",
//   //     isExternal: true
//   //   },
//   ];

//   // Helper for status badge colors
//   const getStatusColor = (status) => {
//     switch(status) {
//       case 'PUBLISHED': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
//       case 'PILOTED': return 'bg-blue-50 text-daystar-blue border-blue-100';
//       case 'DRAFT': return 'bg-amber-50 text-amber-700 border-amber-100';
//       default: return 'bg-gray-50 text-gray-700';
//     }
//   };

//   return (
//     <div>
//       <motion.section ref={ref} className="max-w-7xl mx-auto py-20 px-6 md:px-20">
        
//         {/* SECTION: ARTEFACT-LED PROJECTS */}
//         {/* <div className="flex flex-col md:flex-row justify-between items-end mb-12">
//           <div>
            
//             <h2 className="text-4xl font-bold text-slate-900">Featured Artefacts</h2>
//           </div>
//           <p className="text-slate-500 max-w-md text-sm mt-4 md:mt-0">
//             DRICE only features projects that have produced verifiable outputs, from peer-reviewed papers to functional prototypes.
//           </p>
//         </div> */}

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
//           {project.map((proj, idx) => (
//             <motion.div 
//               key={idx}
//               initial={{ opacity: 1, y: 20 }}
//               animate={isInView ? { opacity: 1, y: 0 } : {}}
//               transition={{ delay: idx * 0.1 }}
//               className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all hover:-translate-2 group flex flex-col"
//             >
//               <div className='p-8 grow'>
//                 <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStatusColor(proj.status)} mb-4`}>
//                   {proj.status}
//                 </div>
//                 <h4 className="text-xl font-bold text-slate-900 mb-2 leading-tight group-hover:text-daystar-blue transition-colors">{proj.title}</h4>
                
//                 <div className="mb-4">
//                   <p className="text-[11px] font-bold text-slate-400 uppercase tracking-tighter">Problem Statement</p>
//                   <p className="text-slate-600 text-sm italic">"{proj.problem}"</p>
//                 </div>

//                 <p className="text-slate-500 text-sm leading-relaxed mb-6">{proj.desc}</p>
                
//                 <div className="pt-6 border-t border-slate-100">
//                   <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Verifiable Outputs</h5>
//                   <div className='flex flex-wrap gap-2'>
//                     {proj.outputs.map((out, i) => (
//                       <span key={i} className='bg-slate-100 text-slate-600 text-[10px] font-semibold px-2 py-1 rounded'>
//                         {out}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//               <a href={proj.href} target='_blank'>
//                 <button className="w-full py-4 bg-slate-50 border-t hover:cursor-pointer border-slate-100 text-daystar-blue font-bold text-xs flex items-center justify-center gap-2 group-hover:text-white group-hover:bg-daystar-blue transition-all">
//                   View Site<ChevronRight size={14} />
//                 </button>                      
//               </a>
             
//             </motion.div>
//           ))}
//         </div>

        
//         {/* <h3 className="text-4xl font-bold text-daystar-dark uppercase tracking-widest text-center mt-20">Research Outputs</h3>
//         <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12">
          
//           <div className="lg:col-span-1">
//             <h3 className="text-2xl font-bold text-slate-900 mb-4">Datasets & Publications</h3>
//             <p className="text-sm text-slate-500 leading-relaxed mb-6">
//               Our open-access repository for institutional memory and research validation.
//             </p>
//             <a href="https://repository.daystar.ac.ke/home">
//               <button className="flex items-center gap-2 text-sm font-bold text-daystar-blue hover:underline">
//                 Access Full Repository
//               </button>
//             </a>
            
//           </div>
          
//           <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4">
//             {[
//               { type: "Working Paper", title: "AI Adoption in Kenyan Higher Ed", date: "2025" },
//               { type: "Dataset", title: "Kibera Sanitation Points v1.2", date: "2024" },
//               { type: "Policy Brief", title: "Emotional Inclusivity in Tech", date: "2025" },
//               { type: "Poster", title: "Innovation Week Proceedings", date: "2024" }
//             ].map((item, i) => (
//               <div key={i} className="flex items-center p-4 bg-white border border-slate-200 rounded-xl hover:border-blue-300 transition-colors cursor-pointer">
//                 <div className="p-3 bg-blue-50 text-daystar-blue rounded-lg mr-4">
//                   {item.type === "Dataset" ? <Database size={20} /> : <FileText size={20} />}
//                 </div>
//                 <div>
//                   <p className="text-[10px] font-bold text-daystar-blue uppercase">{item.type}</p>
//                   <p className="text-sm font-bold text-slate-800">{item.title}</p>
//                 </div>
//                 <ChevronRight size={16} className="ml-auto text-slate-300" />
//               </div>
//             ))}
//           </div>
//         </div>

        
//         <div className="mt-24 p-8 md:p-12 bg-slate-900 rounded-3xl text-white flex flex-col md:flex-row items-center justify-between gap-8">
//           <div className="max-w-xl">
//             <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs font-bold mb-4">
//               <Activity size={14} /> NEW RELEASE
//             </div>
//             <h2 className="text-3xl font-bold mb-4">2025 Researcher Impact Report</h2>
//             <p className="text-slate-400 leading-relaxed">
//               An exhaustive analysis of researcher productivity, grant acquisition, and commercialization milestones at Daystar University over the last academic year.
//             </p>
//           </div>
          
//             <a className="whitespace-nowrap px-8 py-4 bg-white text-slate-900 font-bold rounded-xl hover:bg-blue-50 transition-colors flex items-center gap-2" href={`${import.meta.env.BASE_URL}document.pdf`}>Download 2025 Report<Download size={18} /></a> 
          
//         </div> */}

//    {/* SECTION: TARGETED CTAS */}
// {/* <div className="mt-32 text-center">
//   <h3 className="text-sm font-bold text-daystar-blue uppercase tracking-widest mb-4">Get Involved</h3>
//   <h2 className="text-4xl font-bold text-slate-900 mb-12">Ready to Enter the Pipeline?</h2>
  
//   <div className="flex flex-wrap justify-center gap-4">
//     {[
//       {
//         label: "Submit a Poster",
//         formType: "poster",
//         url: "https://forms.office.com/r/uFGD2S1NPz"
//       },
//       {
//         label: "Adopt an Innovation",
//         formType: "innovation",
//         url:"https://forms.office.com/r/7hMZzufsE0"
//       },
//       {
//         label: "Propose a Problem",
//         formType: "problem",
//         url: "https://forms.office.com/r/JedQpzgpmf"
//       },
//       {
//         label: "Partner with DRICE",
//         formType: "partner",
//         url:"https://forms.office.com/r/rxBB4d3h1K"
//       },
//       {
//         label: "Apply to Clinics",
//         formType: "clinic",
//         url:"https://forms.office.com/r/mDdvu9Qb9C"
//       }
//     ].map((cta, i) => (
//       <button 
//         key={i} 
//         onClick={() => {
          
//           console.log(`CTA clicked: ${cta.formType}`);
          
//           if (cta.url && cta.url.startsWith('http')) {
//             window.open(cta.url, '_blank', 'noopener,noreferrer');
//           } else {
//             console.error(`Invalid URL for ${cta.formType}: ${cta.url}`);
//             alert('Form link not configured. Please contact DRICE team.');
//           }
//         }}
//         className="px-6 py-3 border-2 border-slate-200 text-slate-700 font-bold rounded-full hover:border-daystar-blue hover:text-daystar-blue transition-all text-sm"
//       >
//         {cta.label}
//       </button>
//             ))}
//           </div>
//         </div> */}

//       </motion.section>
//     </div>
//   );
// };

// export default Project;
import React, { useState, useRef } from 'react';
import { User, Calendar, X, PlusCircle, CheckCircle } from 'lucide-react';
import {degrees, easeIn, easeOut, motion, useInView} from "framer-motion";
import { ChevronRight } from 'lucide-react';
import { href } from 'react-router-dom';
const Grants = () => {
  const [selectedGrant, setSelectedGrant] = useState(null);

  const [grants, setGrants] = useState([
    {
      id: 1,
      type: "INNOVATION & COMMERCIALIZATION GRANT",
      title: "Research, Innovation & Commercialization Grant",
      description: "Supporting high-potential innovations from proof-of-concept to market-ready products. Open to faculty, staff, students, and university-linked enterprises.",
      category: "Commercialization",
      tags: ["Commercialization", "Product Dev"],
      footerTag: "Up to 10 awardees",
      colorClass: "bg-[#003366]", // Dark Blue
      href: "https://forms.cloud.microsoft/r/Z32y4ptcTj",
      deadline: "11 May 2026",
      cycle: "2026/2027",
      eligibility:"Staff & Students"
    },
    {
      id: 2,
      type: "INNOVATION & COMMERCIALIZATION GRANT",
      title: "Daystar University Internal Research Grant",
      description: "Strengthening Daystar's research culture by funding interdisciplinary, impact-oriented research aligned to the University's mission and national development priorities.",
      category: "Staff Research",
      tags: ["Interdisciplinary", "Staff Research"],
      footerTag: "KSh 800,000 max",
      colorClass: "bg-[#004d33]", // Dark Green
      href: "https://forms.cloud.microsoft/r/nfnvDfQRdC",
      deadline: "11 May 2026",
      cycle: "2026/2027",
      eligibility:"Full-Time Staff"
    }
  ]);
    const ref=useRef(null);
    const isInView= useInView(ref,{ once: false, margin:"-100px"});

  return (
    <div ref={ref} className="relative min-h-screen bg-gray-50 p-6 md:p-12">
      <motion.div initial={{opacity:0, y:30}} animate={isInView ? {opacity:1, y:0}:{}} transition={{duration:2 , ease:"easeOut"}} className={`max-w-7xl mx-auto transition-all duration-300 ${selectedGrant ? 'blur-md brightness-75' : ''}`}>
        <motion.div initial={{opacity:0, y:30}} animate={isInView ? {opacity:1, y:0}:{}} transition={{duration:2 , ease:"easeOut"}} className="mb-12">
          <motion.h2 initial={{opacity:0, y:30}} animate={isInView ? {opacity:1, y:0}:{}} transition={{duration:2 , ease:"easeOut"}} className="text-4xl font-bold text-daystar-dark">Available <span className="text-daystar-blue">Grants</span></motion.h2>
          <p className="text-gray-500 mt-2">Explore funding opportunities for research and innovation.</p>
        </motion.div>

        <motion.div initial={{opacity:0, y:30}} animate={isInView ? {opacity:1, y:0}:{}} transition={{duration:2 , ease:"easeOut"}} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {grants.map((grant) => (
            <div key={grant.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-gray-100 flex flex-col h-full">
              
              <div className={`${grant.colorClass} p-8 text-white min-h-[160px] relative`}>
                <div className="bg-white/20 w-10 h-10 rounded-lg flex items-center justify-center mb-4">
                  {grant.id === 1 ? <PlusCircle size={20} /> : <User size={20} />}
                </div>
                <p className="text-[10px] uppercase tracking-widest font-bold opacity-80">{grant.type}</p>
                <h3 className="text-xl font-bold leading-tight mt-1">{grant.title}</h3>
              </div>
              
              <div className="p-6 flex flex-col flex-grow"> 
                <p className="text-gray-600 text-md mb-6 flex-grow leading-relaxed">
                  {grant.description}
                </p>
                
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {grant.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-teal-50 text-teal-700 text-xs font-medium rounded-full border border-teal-100">
                      {tag}
                    </span>
                  ))}
                </div>
                

                <div className="pt-4 border-t flex gap-10 flex-wrap">
                  <div >
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Deadline</p>
                    <p className="text-sm font-bold text-gray-800">{grant.deadline}</p>

                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Cycle</p>
                    <p className="text-sm font-bold text-gray-800">{grant.cycle}</p>
                    
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Eligibility</p>
                    <p className="text-sm font-bold text-gray-800">{grant.eligibility}</p>
                    
                  </div>
                  <span className="px-4 py-1.5 bg-orange-50 text-orange-700 text-xs font-bold rounded-full">
                    {grant.footerTag}
                  </span>
                </div>
              </div>

              <button 
                onClick={href => window.open(grant.href, '_blank', 'noopener,noreferrer')} 
                className="w-full py-4 bg-gray-50 hover:bg-daystar-blue hover:text-white transition-colors font-bold text-daystar-blue"
              >
                Apply Now
              </button>
            </div>
          ))}
        </motion.div>
      </motion.div>

    </div>
  );
};

export default Grants;