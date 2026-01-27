import React from 'react';
import { ArrowRight } from 'lucide-react'; // Optional: Use Lucide icons or simple SVGs

const HowItWorks = () => {
  const steps = [
    "Undergraduate Projects",
    "Postgraduate Research",
    "Research Clinics",
    "Industry & Grants",
    "Commercialisation & Impact"
  ];

  return (
    <section className="py-10 px-20 ">
      <div className="max-w-7xl mx-auto px-4">
     
        <div className="text-center mb-12">
          <h4 className='text-daystar-blue mb-4'>THE DRICE MODEL</h4>
          <h2 className="text-3xl font-bold text-daystar-dark mb-4 underline underline-offset-10 decoration-daystar-blue decoration-4">How DRICE Works</h2>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            DRICE operates a structured, output-driven pipeline that transforms 
            student and faculty work into publishable research, funded projects, 
            and real-world solutions.
          </p>
        </div>

        
        <div className="relative">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {steps.map((step, index) => (
              <React.Fragment key={index}>
               
                <div className="flex-1 w-full md:w-auto">
                  <div className="bg-blue-50 border-2 border-blue-100 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow hover:translate-1.5 text-center min-h-[120px] flex items-center justify-center">
                    <span className="font-semibold text-blue-900 text-lg">
                      {step}
                    </span>
                  </div>
                </div>

                
                {index < steps.length - 1 && (
                  <div className="hidden md:block text-blue-300">
                    <ArrowRight size={32} />
                  </div>
                )}
                
                
                {index < steps.length - 1 && (
                  <div className="md:hidden text-blue-300 transform rotate-90 my-2">
                    <ArrowRight size={24} />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;