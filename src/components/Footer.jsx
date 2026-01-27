import React from 'react';

const Footer = () => {
  const footerSections = [
    // {
    //   title: "RESEARCH",
    //   links: ["Research Pipeline", "Research Clinics", "Ethics & Compliance", "Research Week"]
    // },
    // {
    //   title: "OUTPUTS",
    //   links: ["Published Papers", "Working Papers", "Open Datasets", "Poster Proceedings"]
    // },
    {
      title: "ENGAGE",
      links: ["Submit Poster", "Propose Problem", "Partner with Us", "Contact"]
    },
    {
      title: "INSTITUTION",
      links: ["Daystar University", "Leadership", "SDG Dashboard", "News & Events"]
    }
  ];

  return (
    <footer className="bg-[#0f172a] text-white py-16 px-2 md:px-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 ">
        
        {/* Brand Column */}
        <div className="lg:col-span-1 ">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-cyan-500 text-white font-bold p-2 rounded-lg text-sm">DU</div>
            <span className="text-xl font-bold tracking-normal">DRICE</span>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed text-balance">
            Daystar Research, Innovation & Commercialisation Enterprise. Producing 
            African research leaders through a structured pipeline from student 
            projects to published papers, funded grants, and market-ready startups.
          </p>
        </div>

        {/* Links Columns */}
        {footerSections.map((section, idx) => (
          <div key={idx} className="lg:col-span-1 text-center">
            <h4 className="text-xs font-bold tracking-[0.2em] text-slate-200 mb-6 uppercase">
              {section.title}
            </h4>
            <ul className="space-y-4">
              {section.links.map((link, i) => (
                <li key={i}>
                  <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
        
      </div>

      
    </footer>
  );
};

export default Footer;