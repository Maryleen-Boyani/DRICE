import { useRef } from "react";
import { useNavigate } from "@tanstack/react-router";
import { motion, useInView } from "framer-motion";
import { ArrowRight, FileText, ExternalLink } from "lucide-react";

const GRANT_TYPES = [
  {
    id: "vc-innovation",
    title: "Innovation & Commercialization Grant",
    subtitle: "VC'S RESEARCH & INNOVATION",
    description:
      "Supporting high-potential innovations from proof-of-concept to market-ready products. Open to faculty, staff, students, and university-linked enterprises.",
    colorClass: "bg-daystar-blue",
    footerTag: "Up to 10 awardees",
    deadline: "20th May 2026",
    cycle: "2025/2026",
    eligibility: "Staff & Students",
    pdfUrl: "/VcInnovationForm.pdf",
  },
  {
    id: "internal-research",
    title: "Internal Research Grant",
    subtitle: "STAFF RESEARCH FUND",
    description:
      "Strengthening Daystar's research culture by funding interdisciplinary, impact-oriented research aligned to the University's mission and national priorities.",
    colorClass: "bg-daystar-dark",
    footerTag: "KSh 800,000 max",
    deadline: "20th May 2026",
    cycle: "2025/2026",
    eligibility: "Full-Time Staff",
    pdfUrl: "/InternalGrantForm.pdf",
  },
];

export default function GrantsPage() {
  const navigate = useNavigate();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  return (
    <div ref={ref} className="max-w-7xl mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        className="text-center mb-16 space-y-4"
      >
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight">
          Available Grants
        </h1>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
          Transform your ideas into impact. Explore our 2025/2026 funding
          opportunities designed for the Daystar University research and
          innovation community.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-10 lg:gap-12">
        {GRANT_TYPES.map((grant, idx) => (
          <motion.div
            key={grant.id}
            initial={{ opacity: 0, x: idx === 0 ? -30 : 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: idx * 0.2 }}
            className="bg-white rounded-4xl overflow-hidden shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-slate-100 flex flex-col group"
          >
            {/* Card Header */}
            <div className={`${grant.colorClass} p-10 text-white relative overflow-hidden`}>
              <div className="absolute top-[-20px] right-[-20px] bg-white/10 w-40 h-40 rounded-full blur-3xl group-hover:bg-white/20 transition-colors" />
              <p className="text-xs uppercase tracking-[0.2em] font-bold opacity-70 mb-2">
                {grant.subtitle}
              </p>
              <h3 className="text-2xl lg:text-3xl font-bold tracking-tight">
                {grant.title}
              </h3>
            </div>

            {/* Card Body */}
            <div className="p-10 flex flex-col grow">
              <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                {grant.description}
              </p>

              {/* Metadata Grid */}
              <div className="pt-8 border-t border-slate-100 grid grid-cols-2 gap-6 mb-8">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                    Deadline
                  </p>
                  <p className="text-base font-bold text-slate-900">{grant.deadline}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                    Value
                  </p>
                  <p className="text-base font-bold text-slate-900">{grant.footerTag}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                    Eligibility
                  </p>
                  <p className="text-base font-bold text-slate-900">{grant.eligibility}</p>
                </div>
              </div>

              {/* PDF External Link Button */}
              <div className="mb-6">
                <a
                  href={grant.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 border-2 border-slate-200 text-slate-500 rounded-2xl hover:border-daystar-blue hover:text-daystar-blue hover:bg-blue-50/30 transition-all duration-300 font-bold flex items-center justify-center gap-3 group/link"
                >
                  <FileText
                    size={20}
                    className="text-slate-400 group-hover/link:text-daystar-blue transition-colors"
                  />
                  <span>View Grant Details</span>
                  <ExternalLink
                    size={16}
                    className="opacity-0 group-hover/link:opacity-100 transition-all translate-x-[-10px] group-hover/link:translate-x-0"
                  />
                </a>
              </div>

              {/* Apply Button */}
              <div className="mt-auto">
                <button
                  onClick={() => navigate({ to: `/grants/${grant.id}` })}
                  className="w-full py-5 bg-daystar-blue text-white rounded-2xl hover:bg-daystar-dark transition-all duration-300 font-bold flex items-center justify-center gap-3 group shadow-lg shadow-blue-100"
                >
                  Apply Now
                  <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}