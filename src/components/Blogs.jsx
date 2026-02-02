import React, { useState } from 'react';
import { User, Calendar, X, PlusCircle } from 'lucide-react';

const Blogs = () => {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showWriteForm, setShowWriteForm] = useState(false);
  
  // Sample Data (Replace with Database/API later)
  const [articles, setArticles] = useState([
    {
      id: 1,
      title: "Building a National Innovation Ecosystem: Insights from the Entreprenurial Education Summit",
      description: "Daystar University joins industry leaders to transition from theoretical teaching to a venture-led innovation ecosystem",
      content: `
      <p>Daystar University was honored to participate in the recent Entrepreneurial Education Summit (ESS) 2026, convened by the Kenya National Innovation Agency (KeNIA) in partnership with NEIL, the British Council Kenya, and the UK-Kenya Tech Hub.</p>
      
      <p>The powerful theme, "Rethinking Entrepreneurial Education," resonated deeply with our mission. The discussions moved beyond theory, focusing on how universities like ours can become true entrepreneurial engines—commercializing research, nurturing student and faculty ventures, and aligning learning with real market needs.</p>
      
      <p>A key takeaway for us was the urgent call to "produce ventures, not just ideas." This aligns perfectly with our ongoing initiatives to empower our students through hands-on, market-facing programs.</p>

      <h4 className="font-bold mt-4">Pivotal insights we’re bringing back:</h4>
      <ul className="list-decimal ml-5 space-y-2">
        <li><strong>Learning by Doing:</strong> Empowering students with hands-on, challenge-based projects is non-negotiable.</li>
        <li><strong>Breaking Silos:</strong> Strengthening academia-industry links and fostering cross-university communities.</li>
        <li><strong>Systematic Support:</strong> Building structured systems from policies to cross-border capital access.</li>
        <li><strong>The Power of Mentorship:</strong> Faculty-led mentorship plays an irreplaceable role in inspiring innovators.</li>
      </ul>
      <br/>
      <p className="mt-6 italic font-medium">“The future of Kenya will not be built by certificates alone. It will be built by entrepreneurial minds, ideas, and ventures.” — Prof. Shaukat Abdulrazak</p>
    `,
      author: "Dr. Japheth Mursi",
      date: "Jan 30, 2026",
      image: "./hero2.jpg",
      authorImg: "./dr.mursi.jpg"
    },
  ]);

  return (
    <div className="relative min-h-screen bg-gray-50 p-6 md:p-12">
      <div className={`max-w-7xl mx-auto transition-all duration-300 ${selectedArticle ? 'blur-md brightness-75' : ''}`}>
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-bold text-daystar-dark">DRICE <span className="text-daystar-blue">Insights</span></h2>
            <p className="text-gray-500 mt-2">Latest research findings and innovation stories.</p>
          </div>
          <button 
            onClick={() => setShowWriteForm(true)}
            className="flex items-center gap-2 bg-daystar-blue text-white px-6 py-3 rounded-full font-semibold hover:scale-105 transition shadow-lg"
          >
            <PlusCircle size={20} /> Write Article
          </button>
        </div>

  
        <div className="grid md:grid-cols-3 gap-8 items-stretch"> 
          {articles.map((article) => (
            <div key={article.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-gray-100 flex flex-col h-full"> {/* Add h-full */}
              <img src={article.image} alt={article.title} className="h-48 w-full object-cover shrink-0" /> 
              
              <div className="p-6 flex flex-col flex-grow"> 
                <h3 className="text-xl font-bold mb-2 text-daystar-dark leading-tight line-clamp-2 min-h-[3.5rem]"> 

                  {article.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                  {article.description}
                </p>
                
                <div className="flex items-center gap-3 pt-4 border-t mt-auto"> 
                  <img src={article.authorImg} alt="" className="w-10 h-10 object-contain rounded-full border" />
                  <div>
                    <p className="text-sm font-bold text-daystar-dark">{article.author}</p>
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider">{article.date}</p>
                  </div>
                </div>
              </div>

              <button onClick={() => setSelectedArticle(article)} className="w-full py-4 bg-gray-50 hover:bg-daystar-blue hover:text-white transition-colors font-bold text-daystar-blue shrink-0">
                Read More
              </button>
            </div>
          ))}
        </div>
      </div>

      {selectedArticle && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSelectedArticle(null)}></div>
          <div className="bg-white w-full max-w-3xl max-h-[90vh] rounded-3xl overflow-y-auto relative z-10 shadow-2xl animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setSelectedArticle(null)}
              className="absolute top-6 right-6 p-2 bg-gray-100 rounded-full hover:bg-red-50 hover:text-red-500 transition"
            >
              <X size={24} />
            </button>
            <img src={selectedArticle.image} className="w-full h-64 md:h-96 object-cover" />
            <div className="p-8 md:p-12">
              <h2 className="text-3xl md:text-5xl font-bold text-daystar-dark mb-6">{selectedArticle.title}</h2>
              <div className="flex items-center gap-4 mb-8">
                <img src={selectedArticle.authorImg} className="w-12 h-12 rounded-full" />
                <div>
                    <p className="font-bold">{selectedArticle.author}</p>
                    <p className="text-sm text-gray-500">{selectedArticle.date}</p>
                </div>
              </div>
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                <div dangerouslySetInnerHTML={{ __html: selectedArticle.content }} />
              </div>
            </div>
          </div>
        </div>
      )}


      {showWriteForm && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-daystar-dark/90 backdrop-blur-sm p-4">
           <div className="bg-white w-full max-w-xl rounded-2xl p-8">
              <div className="flex justify-between mb-6">
                <h2 className="text-2xl font-bold">Share your Research Insight</h2>
                <X className="cursor-pointer" onClick={() => setShowWriteForm(false)} />
              </div>
              <form className="space-y-4">
                <input type="text" placeholder="Article Title" className="w-full p-3 border rounded-xl" />
                <textarea placeholder="Brief Description (Max 150 chars)" className="w-full p-3 border rounded-xl" rows="2"></textarea>
                <textarea placeholder="Write your full story here..." className="w-full p-3 border rounded-xl" rows="6"></textarea>
                <button type="button" className="w-full bg-daystar-blue text-white py-3 rounded-xl font-bold">Publish to DRICE</button>
              </form>
           </div>
        </div>
      )}
    </div>
  );
};

export default Blogs;