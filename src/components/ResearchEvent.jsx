import { section } from "framer-motion/client";

const ResearchEvent=() =>{
  
    return(
        <section className="min-h-[500px] bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#000000] text-white py-20 px-6 md:px-12 flex items-center">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Side: Content */}
            <div>
              <div className="inline-flex items-center gap-2 bg-daystar-blue/30 border border-daystar-blue/50 px-3 py-1 rounded-full mb-6">
                <span className="text-sm">ANNUAL EVENT</span>
              </div>
              <h2 className="text-xl md:text-6xl font-serif mb-6 leading-tight">
                Research & Innovation <span className="text-daystar-blue italic">Week 2025</span>
              </h2>
              <p className="text-gray-400 text-lg max-w-lg leading-relaxed">
                Our institutional engine for research production — featuring poster 
                defenses, research clinics, grant workshops, and industry pilots.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="bg-daystar-blue py-4 hover:cursor-pointer px-4 rounded-xl">
                  Submit Your Poster
                </button>
              <a 
                    href="https://repository.daystar.ac.ke/handle/123456789/2863"
                    target="_blank"
                    rel="noopener noreferrer"
>
                  <button className="border-2 border-gray-500 hover:border-white py-4 px-4 rounded-xl">
                      View Past Proceedings
                    </button>
                  </a>
              </div>
          
          </div>

        {/* Right Side: Floating Card */}
        <div className="relative">
          {/* Decorative background glow */}
          <div className="absolute -inset-4 bg-cyan-500/10 blur-3xl rounded-full"></div>
          
          <div className="relative bg-[#1e293b]/40 backdrop-blur-md border border-gray-700 p-8 rounded-2xl shadow-2xl">
            <div className="flex justify-between items-center mb-8 border-b border-gray-700 pb-4">
              <h3 className="text-xl font-serif italic">Week Schedule</h3>
              <span className="text-orange-400 text-sm font-semibold uppercase tracking-wider">
                March 10–14, 2025
              </span>
            </div>

            <div className="space-y-8">
              <div className="flex gap-6">
                <span className="text-cyan-500 text-xs font-bold uppercase tracking-widest pt-1">Monday</span>
                <div>
                  <h4 className="font-semibold text-lg">Opening & Research Ethics</h4>
                  <p className="text-gray-400 text-sm">Keynote + ethics certification workshop</p>
                </div>
              </div>

              <div className="flex gap-6">
                <span className="text-cyan-500 text-xs font-bold uppercase tracking-widest pt-1">Tuesday</span>
                <div>
                  <h4 className="font-semibold text-lg">Poster Sessions</h4>
                  <p className="text-gray-400 text-sm">Undergraduate and Postgraduate displays</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
    );
};

export default ResearchEvent;