import React from 'react';
import { RevealOnScroll } from '../../components/ui/RevealOnScroll';

export const SpecialitiesSection = () => {
  const specialities = [
    {
      icon: '🎂',
      title: 'Torturi Artizanale',
      description: 'Create manual cu ingrediente premium și decorațiuni personalizate'
    },
    {
      icon: '🥐',
      title: 'Patiserie Fină',
      description: 'Produse inspirate din bucătăria franceză, cu unt adevărat'
    },
    {
      icon: '🍮',
      title: 'Deserturi Vegane',
      description: 'Opțiuni delicioase fără ingrediente de origine animală'
    },
    {
      icon: '🍫',
      title: 'Ciocolaterie',
      description: 'Praline și tablete hand-made din ciocolată belgiană'
    },
  ];
  
  return (
    <section className="py-20 bg-[#F5F5F5]">
      <div className="container mx-auto px-4 md:px-8">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl italic text-[#4A3F35] mb-3">Specialitățile noastre</h2>
            <div className="w-16 h-[1.5px] bg-[#C39074] mx-auto opacity-80"></div>
            {/* <div className="w-24 h-1 bg-[#C39074] mx-auto"></div> */}
          </div>
        </RevealOnScroll>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {specialities.map((item, index) => (
            <RevealOnScroll key={index} className="delay-100 h-full">
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 text-center h-full flex flex-col">
                <div className="text-4xl mb-4 flex-shrink-0">{item.icon}</div>
                <h3 className="font-serif text-xl font-semibold mb-3 text-[#000000]">{item.title}</h3>
                <p className="text-[#000000]/80 flex-grow">{item.description}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};