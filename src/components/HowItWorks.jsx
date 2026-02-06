import React, { useRef, useState } from 'react';
import { motion, useInView } from "framer-motion";
import { ArrowRight, Upload, CheckCircle } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    "Undergraduate Projects",
    "Postgraduate Research",
    "Research Clinics",
    "Industry & Grants",
    "Commercialisation & Impact"
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  // --- Approach used in ContactForm ---
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const recipient = "drice@daystar.ac.ke";
    const subject = encodeURIComponent("DRICE Report Submission");
    const body = encodeURIComponent(
      `Hello DRICE Team,\n\nI am writing to submit a research report for review.\n\n[Please attach your document to this email before sending]\n\nSubmitted via DRICE Website.`
    );

    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipient}&su=${subject}&body=${body}`;

  setFormSubmitted(true);

  setTimeout(() => {
    window.open(gmailLink, '_blank');
  }, 500);


  setTimeout(() => {
    setFormSubmitted(false);
  }, 10000);
};

  return (
    <section ref={ref} className="py-10 px-6 md:px-20">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 2, ease: "easeOut" }} className="max-w-7xl mx-auto px-4">

        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 2, ease: "easeOut" }} className="text-center mb-12">
          <h4 className='text-daystar-blue mb-4'>THE DRICE MODEL</h4>
          <h2 className="text-3xl font-bold text-daystar-dark mb-4 underline underline-offset-10 decoration-daystar-blue decoration-4">How DRICE Works</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            DRICE operates a structured, output-driven pipeline that transforms
            student and faculty work into publishable research, funded projects,
            and real-world solutions.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <div className="flex-1 w-full md:w-auto">
                <div className="bg-blue-50 border-2 border-blue-100 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow hover:translate-1.5 text-center min-h-[120px] flex items-center justify-center">
                  <span className="font-semibold text-blue-900 text-lg">{step}</span>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block text-blue-300"><ArrowRight size={32} /></div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* --- Submission Area using ContactForm approach --- */}
        <div className="mt-12 flex flex-col items-center">
          {formSubmitted ? (
            <div className="bg-white p-8 rounded-3xl shadow-xl text-center space-y-4 max-w-md">
              <CheckCircle className="text-green-500 w-12 h-12 mx-auto" />
              <h3 className="text-xl font-bold text-gray-800">Email Prepared!</h3>
              <p className="text-gray-600">Please attach <strong>{fileName}</strong> in your email app before sending.</p>
              <button onClick={resetForm} className="w-full bg-daystar-blue text-white py-2 rounded-xl font-bold hover:bg-blue-700">
                Upload Another
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept=".pdf,.doc,.docx" 
              />
              <button 
                onClick={handleSubmit}
                className="hover:cursor-pointer flex items-center justify-center gap-2 bg-daystar-dark text-white font-bold p-4 rounded-2xl mt-10 w-full sm:w-auto sm:px-8 transition-transform active:scale-95 shadow-lg"
              >
                <Upload size={20} />
                <span>{fileName ? `Submit: ${fileName}` : 'Upload Report'}</span>
              </button>
              {fileName && (
                <p className="mt-3 text-sm text-gray-500 italic">
                  Click the button again to open your email client.
                </p>
              )}
            </div>
          )}
        </div>

      </motion.div>
    </section>
  );
}

export default HowItWorks;