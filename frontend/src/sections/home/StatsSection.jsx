import React from 'react';
import StatsBlock from '../../components/ui/StatsBlock';
import { FaSmile, FaTruck, FaCalendarAlt, FaBirthdayCake } from 'react-icons/fa';

export const StatsSection = () => {
  const statsData = [
    { id: 1, icon: <FaSmile />, title: 'CLIENȚI FERICIȚI', value: '+50,000' },
    { id: 2, icon: <FaTruck />, title: 'LIVRĂRI SĂPTĂMÂNALE', value: '+200' },
    { id: 3, icon: <FaCalendarAlt />, title: 'PREZENȚĂ LA EVENIMENTE', value: '+10,000' },
    { id: 4, icon: <FaBirthdayCake />, title: 'REȚETE UNICE', value: '+100' },
  ];

  return (
    <section className="relative w-full h-auto min-h-[500px] max-h-[800px] flex justify-center items-center overflow-hidden bg-[#FFFFFF]/80 mt-[10vh] mb-[5vh]">
      {/* Overlay */}
      <div className="absolute inset-0 bg-[url('/path/to/dessert-background.jpg')] bg-cover bg-center opacity-20 z-10"></div>
      
      {/* Container */}
      <div className="relative w-[90%] max-w-[1200px] h-[80%] flex flex-col justify-center items-center z-20 px-[2vw]">
        <h2 className="font-serif text-3xl italic text-[#4A3F35] mb-3">
          Cifrele Noastre
        </h2>
        
        {/* Stats Row - am modificat aici pentru dimensiuni egale */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 w-full mb-[5vh] gap-4 sm:gap-6 md:gap-8">
          {statsData.map((stat) => (
            <div key={stat.id} className="flex justify-center">
              <StatsBlock icon={stat.icon} title={stat.title} value={stat.value} />
            </div>
          ))}
        </div>
      </div>
      
      {/* Responsive Styles */}
      <style jsx>{`
        @media (max-width: 992px) {
          section { padding: 10vh 0; }
        }
        
        @media (max-width: 768px) {
          section { padding: 8vh 0; }
          h2 { font-size: 4vh; margin-bottom: 4vh; }
          button { padding: 1.5vh 3vw; font-size: 1.6vh; }
        }
        
        @media (max-width: 576px) {
          section { padding: 6vh 0; }
          h2 { font-size: 3.5vh; margin-bottom: 3vh; }
          button { padding: 1.2vh 2.5vw; font-size: 1.4vh; width: 80%; }
        }
      `}</style>
    </section>
  );
};
