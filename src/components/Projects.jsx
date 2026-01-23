import React from 'react';
import { Lightbulb, ChevronRight } from 'lucide-react';

const Projects = () => {
  const projects = [
    { title: "Institutional Knowledge AI", category: "Innovation", desc: "Developing an AI-driven knowledge base for Daystar." },
    { title: "Urban Citizen Sensing & Open Data Platform", category: "Research", desc: "Redesigning social interfaces for Kenyan youth." },
    { title: "Daystar Research Collaboration Graph & Intelligence Hub", category: "Education", desc: "Improving digital resource access for remote students." },
    
  ];

  return (
    <section className="max-w-7xl mx-auto py-16 px-6">
      <h3 className="text-3xl font-bold mb-10">Featured Projects</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((proj, idx) => (
          <div key={idx} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-daystar-blue transition-colors">
              <Lightbulb className="text-daystar-blue group-hover:text-white" size={24} />
            </div>
            <span className="text-xs font-bold text-daystar-blue uppercase tracking-widest">{proj.category}</span>
            <h4 className="text-xl font-bold mt-2 mb-3">{proj.title}</h4>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">{proj.desc}</p>
            <button className="flex items-center gap-2 text-daystar-blue font-bold text-sm">
              Read More <ChevronRight size={16} />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;