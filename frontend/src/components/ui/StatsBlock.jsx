
import React from 'react';

const StatsBlock = ({ icon, title, value }) => {
  return (
    <div className="flex flex-col items-center text-center w-[200px] sm:w-[220px] md:w-[250px] p-4 bg-white/30 rounded-lg shadow-sm backdrop-blur-sm">
      <div className="text-4xl text-[#A35D3A] mb-3">{icon}</div>
      <h4 className="text-lg sm:text-xl font-semibold text-[#3A1F17] mb-2">{title}</h4>
      <p className="text-2xl sm:text-3xl font-bold text-[#3A1F17]">{value}</p>
    </div>
  );
};

export default StatsBlock;