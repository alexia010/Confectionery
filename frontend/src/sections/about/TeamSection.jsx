
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TeamSection = ({ team }) => {
  const [selectedMember, setSelectedMember] = useState(null);

  return (
    <section className="bg-white py-12 sm:py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-gray-900 mb-3 sm:mb-4">
            Echipa Noastră
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
            Pasiune, creativitate și expertise definesc fiecare membre al echipei noastre.
          </p>
        </div>

        {/* Responsive Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {team.map((member, index) => (
            <div 
              key={index} 
              className="w-full"
            >
              <div 
                className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedMember(member)}
              >
                {/* Responsive Image Container */}
                <div className="w-full pt-[75%] relative">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>

                {/* Member Details */}
                <div className="p-4 sm:p-5">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 mb-1">
                    {member.role}
                  </p>
                  <p className="text-xs sm:text-sm italic text-gray-500">
                    Specialitate: {member.specialitate}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Full Screen Modal */}
        <AnimatePresence>
          {selectedMember && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
              onClick={() => setSelectedMember(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="w-full max-w-md bg-white rounded-lg overflow-hidden shadow-xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Close Button */}
                <button 
                  onClick={() => setSelectedMember(null)}
                  className="absolute top-4 right-4 z-10 text-gray-600 hover:text-gray-900"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Responsive Image */}
                <div className="w-full pt-[75%] relative">
                  <img 
                    src={selectedMember.image} 
                    alt={selectedMember.name} 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>

                {/* Member Details */}
                <div className="p-5 sm:p-6">
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                    {selectedMember.name}
                  </h2>
                  <p className="text-sm text-gray-600 mb-2">
                    {selectedMember.role}
                  </p>
                  <p className="text-sm italic text-gray-500 mb-4">
                    Specialitate: {selectedMember.specialitate}
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {selectedMember.description}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default TeamSection;