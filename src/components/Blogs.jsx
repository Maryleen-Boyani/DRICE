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
    {
      id: 2,
      title: "From Nairobi's Markets to Vienna: One Scholar's Quest to Make AI Work for African Women",
      description: "Daystar University PhD candidate Mary Onguko has been awarded a prestigious fellowship at one of Europe's foremost institutes for advanced study -  to build AI that truly serves women in Kenya's informal economy.",
      content: `
      <p>Picture a market stall in Nairobi — a Mama Mboga selling vegetables, fabric, or street food, her mobile phone nearby. She has heard that there are apps to help manage her finances, track her stock, even predict demand. But when she opens them, they speak to her in a language that is not hers, assume a bank account she does not have, and present icons that mean nothing in her world. She closes the app and goes back to what she knows.</p>
      <br/>
      <p class="text-[#003366]"><strong>This is the problem Mary Onguko wants to solve.</strong></p>
      <p>A PhD candidate in Strategic Planning at Daystar University's School of Business and Economics, Mary has been awarded a three-month fellowship at the Institute for Human Sciences (IWM) in Vienna, Austria — one of Europe's most respected centres for advanced scholarship in the humanities and social sciences. She will be in residence from 1 March to 31 May 2026.</p>
      <br/>
      <p class="text-[#003366]"><strong>A Research Question Born from Real Life</strong></p>
    
      <p>Her fellowship project — Human-Centered AI: Culturally Responsive AI-Enabled Mobile Applications for Women Micro-Entrepreneurs in Kenya — is rooted in a deceptively simple observation: the women who stand to benefit most from digital tools are often the ones least served by them.</p>
      <br/>
      <p>Kenya's informal economy is overwhelmingly female. Women micro-entrepreneurs are the backbone of household incomes across the country, operating in markets, along roadsides, and within communities that formal financial systems have long overlooked. Mobile technology has begun to change that story — but only partially. Too many AI-powered business tools arrive with built-in assumptions: that users are literate in English, that they have consistent internet access, that they operate within familiar financial frameworks. In reality, many do not.</p>
      <br/>
      <p>Mary's research asks: What would these tools look like if the women themselves designed them? Working within a human-centered and participatory design framework, her project will sit with women entrepreneurs, listen to how they actually use their phones, and identify the real barriers — language, cost, cultural context, trust. From there, she will co-design improved prototypes featuring voice interfaces in local languages, intuitive icons, offline functionality, and community device-sharing models.</p>
      <br/>
      <h4 class="text-[#003366]"><strong>Why Vienna, and Why Now</strong></h4>

      <p>The IWM is not a typical technology institute. It is a place where philosophers, political scientists, sociologists, and legal scholars gather to grapple with the deepest questions of our time — and in the age of artificial intelligence, few questions are more urgent than this one: who does technology actually serve?</p>
      <br/>
      <p>Mary's selection to the IWM's Digital Humanism Fellowship programme places her squarely within that conversation. Her work insists that AI is not a neutral tool — that every algorithm carries assumptions, and those assumptions have consequences for real people. At a moment when the world's most powerful technology companies are shaping the digital futures of the Global South, a scholar from Nairobi asking these questions in Vienna matters.</p>
      <br/>
      <p class="italic pl-10 border-l-4 border-[#8b0000] my-4">“I will represent the Daystar name with honor, and I am proud to call Daystar my intellectual home”, Mary says</p>
      <br/>
      <h4 class="text-[#003366]"><strong>A Journey of Mentorship and Institutional Support</strong></h4>
      
      <p>Mary is quick to share the credit. In her own words, her gratitude begins with Vice-Chancellor Prof. Laban Ayiro: “Through his mentorship and teaching, I have grown into the scholar I am becoming. This is about him.” She also credits Dr. Caroline Ayuya- Director of the Directorate of Innovation, Research, Commercialization and Entrepreneurship at Daystar University, whose support, she says, has made “the PhD journey feel both beautiful and achievable.”</p>
      <br/>
      <p>Behind the scenes, Daystar's Directorate of Research, Innovation, Commercialization and Entrepreneurship (DRICE) has walked with Mary through the application process, providing an institutional recommendation in support of her fellowship bid. Dr. Japheth Mursi, Deputy Director of DRICE, has been designated to provide coordination support as she prepares for her departure.</p>
      <br/>
      <p>For Daystar University, it affirms a growing institutional identity: a place where faith-rooted, purpose-driven scholarship engages the world’s hardest problems. For Kenya, it means that the women in those market stalls are one step closer to tools built with them in mind — not just for them.</p>
      
    `,
      author: "DRICE",
      date: "Feb 18, 2026",
      image: "./blog2.jpg",
      authorImg: "./drice.jpeg",
      userImage:"./userimage.jpg"
    },
     {
      id: 3,
      title: "Bridging the Gap: Daystar Students Gain Real-World Insights at SHIELD International",
      description: "Daystar University social entrepreneurship students gained practical industry insights and mentorship during a collaborative field visit to SHIELD International on February 26th.",
      content: `
      <p>On February 26th, Daystar University reaffirmed its commitment to fostering innovation by facilitating a specialized field visit for our social entrepreneurship students to SHIELD International.</p>
      
      <p>The experience was centered on deep, experiential learning. By engaging directly with the SHIELD ground team, our students moved beyond the classroom to gain unfiltered insights into the operational realities and complexities of running a high-impact social enterprise.</p>
      
      <p>At Daystar, we believe these "golden" moments of industry mentorship are essential to our mission: shaping graduates who don't just possess degrees, but possess scalable solutions for the community.</p>

      <h4 className="font-bold mt-4">Key pillars of this engagement:</h4>
      <ul className="list-decimal ml-5 space-y-2">
        <li><strong>Reality-Based Learning:</strong> Understanding the bridge between social theory and field-level execution.</li>
        <li><strong>Mentorship in Action:</strong> Gaining firsthand perspectives from practitioners on sustainable business models.</li>
        <li><strong>Ecosystem Building:</strong> Strengthening the vital link between academic excellence and practical innovation.</li>
        <li><strong>Strategic Partnerships:</strong> Collaborating with industry leaders like SHIELD to provide market-ready exposure.</li>
      </ul>
      <br/>
      <p className="mt-6 italic font-medium">“We are building an ecosystem where academic excellence meets practical innovation, ensuring our students are prepared to lead with impact.”</p>
    `,
      author: "DRICE",
      date: "Mar 3, 2026",
      image: "./blog2.jpg",
      authorImg: "./drice.jpeg",
      userImage:""
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
                {/* line-clamp-3 */}
                <h3 className="text-xl font-bold mb-2 text-daystar-dark leading-tight min-h-[4.5rem]"> 

                  {article.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 flex-grow">
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
              <h2 className="text-xl md:text-3xl font-bold text-daystar-dark mb-6">{selectedArticle.title}</h2>
              <div className="flex items-center gap-4 mb-2">
                <img src={selectedArticle.authorImg} className="w-12 h-12 rounded-full" />
                <div>
                    <p className="font-bold">{selectedArticle.author}</p>
                    <p className="text-sm text-gray-500">{selectedArticle.date}</p>
                </div> 
              </div>
              <div className='mb-4 flex flex-row items-center gap-4' >
                  {selectedArticle.id === 2 && 
                  <div>
                    <img src={selectedArticle.userImage} className="w-40 h-40 rounded-full" />
                    <p className='italic'>Mary Onguko, Daystar University PhD candidate.</p>
                  </div>
                  } 
                  
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