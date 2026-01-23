import React from 'react';

const Leadership = () => {
  const leaders = [
    { name: "Dr. Caro Ayuya", title: "DRICE Director" },
    { name: "Dr. Japheth Mursi", title: "DRICE Assistant Director" },
    { name: "Philipe Tinega", title: "DRICE Administrator" },
    { name: "John Nderitu", title: "DRICE Innovation Officer" },
    { name: "Vivian Angula", title: "DRICE Research Assistant" }
  ];

  return (
    <section className="max-w-7xl mx-auto py-20 px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-extrabold mb-4">Our Leadership</h2>
        <p className="text-gray-500 italic">"Excellence, Transformation, Servant Leadership"</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
        {leaders.map((leader, i) => (
          <div key={i} className="text-center group">
            <div className="w-48 h-48 rounded-full bg-gray-200 mx-auto mb-6 border-4 border-white shadow-lg group-hover:border-daystar-blue transition-all overflow-hidden">
               <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${leader.name}`} alt={leader.name} />
            </div>
            <h4 className="text-xl font-bold">{leader.name}</h4>
            <p className="text-daystar-blue font-semibold">{leader.role}</p>
            <p className="text-gray-500 text-sm">{leader.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Leadership;