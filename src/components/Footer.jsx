import React from 'react';

const Footer = ({onNavClick}) => {
  const footerSections = [
    {
      title: "ENGAGE",
      links: [
        { 
          name: "Submit Poster", 
          href: import.meta.env.VITE_POSTER_FORM_URL || "#",
          type: "form"
        },
        { 
          name: "Propose Problem", 
          href: import.meta.env.VITE_PROBLEM_FORM_URL || "#",
          type: "form"
        },
        { 
          name: "Partner with Us", 
          href: import.meta.env.VITE_PARTNER_FORM_URL || "#",
          type: "form"
        },

      ]
    },
    {
      title: "INSTITUTION",
      links: [
        { 
          name: "Daystar University", 
          href: "https://www.daystar.ac.ke",
          type: "external"
        },
        { 
          name: "DCAMD", 
          href: "https://dcamd.daystar.ac.ke/",
          type: "external"
        },
        // { 
        //   name: "SDG Dashboard", 
        //   href: "https://daystar-sdg-impact-and-evidence-gen.vercel.app/login",
        //   type: "anchor"
        // },
        { 
          name: "Blogs", 
          href: "blogs",
          type: "internal"
        }
      ]
    }
  ];

  const handleLinkClick = (link) => {
    if (link.type === "form" || link.type === "external") {
      // Open external links in new tab
      window.open(link.href, '_blank', 'noopener,noreferrer');
    } else if (link.type === "anchor") {
      // Scroll to section
      if (link.href === "#contact") {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      } else if (link.href === "#sdg-dashboard" || link.href === "#news-events") {
        // Show placeholder alert for now
        alert(`${link.name} - Coming Soon!`);
      }
    } else if (link.type === "internal") {
      // Navigate to leadership page
      onNavClick(link.href);
    }
  };

  return (
    <footer className="bg-[#0f172a] text-white py-10 px-2 md:px-10 border-t border-slate-800">
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
                  <button
                    onClick={() => handleLinkClick(link)}
                    className="text-slate-400 hover:text-cyan-400 transition-colors text-sm cursor-pointer hover:underline"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
        
      </div>

      {/* Copyright Section */}
      <div className="max-w-7xl mx-auto mt-4 pt-8 border-t border-slate-800 text-center">
        <p className="text-slate-400 text-sm">
          © {new Date().getFullYear()} Daystar University DRICE. All rights reserved.
        </p>
        <p className="text-slate-500 text-xs mt-2">
          Athi River Campus, Machakos County | Email: drice@daystar.ac.ke
        </p>
      </div>
    </footer>
  );
};

export default Footer;