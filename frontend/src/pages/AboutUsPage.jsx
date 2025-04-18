
import React from 'react';
import MainLayout from '../layouts/MainLayout';
import { motion } from 'framer-motion';
import StorySection from '../sections/about/StorySection.jsx';
import TeamSection from '../sections/about/TeamSection.jsx';


const DespreNoi = () => {
  // Team Data
  const team = [
    {
      name: "Elena Florescu",
      role: "Cofetar Șef",
      image: "/ElenaFlorescu.jpg",
      description: "Cu peste 20 de ani de experiență, Elena transformă fiecare desert într-o capodoperă plină de pasiune.",
      specialitate: "Torturi Artistice",
    },
    {
      name: "Mihai Dumitrescu",
      role: "Patiser",
      image: "/MihaiDumitrescu.jpg",
      description: "Format la Paris, Mihai creează deserturi care îmbină eleganța franceză cu arome românești.",
      specialitate: "Patiserie Fină",
    },
    {
      name: "Ana Popescu",
      role: "Specialist Deserturi Vegane",
      image: "AnaPopescu.jpg",
      description: "Ana redefinește deserturile vegane cu rețete inovatoare și gusturi autentice.",
      specialitate: "Deserturi Raw-Vegane",
    }
  ];

  // Awards Data
  const awards = [
    { year: "2023", title: "Cea mai bună cofetărie din România", organizator: "Gala Gastronomiei Românești" },
    { year: "2021", title: "Medalia de Aur - «Vis de Ciocolată»", organizator: "Campionatul European de Patiserie" },
    { year: "2019", title: "Premiul pentru Inovație în Deserturi Vegane", organizator: "Food Innovation Summit" },
  ];

  // Animation Variants - Simplified
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.7 } },
  };

  return (
    <MainLayout>
      {/* Minimalist Hero */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-2xl md:text-5xl font-light text-gray-900 mb-6">
              Despre Gust Divin
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-0">
              Creăm deserturi artizanale din 2003, îmbinând tradiția cu inovația pentru a aduce momente de fericire în viața clienților noștri.
            </p>
          </motion.div>
        </div>
      </section>
   
      <StorySection />

      {/* Timeline Section - Horizontal Line with Points */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-light text-gray-900 mb-6">Călătoria Noastră</h2>
          </motion.div>
          
          <div className="max-w-5xl mx-auto">
            {/* Horizontal Timeline Line */}
            <div className="relative">
              <div className="hidden md:block absolute left-0 right-0 top-8 h-px bg-gray-200"></div>
              
              <div className="grid md:grid-cols-5 gap-6">
                {[
                  { year: "2003", title: "Primii Pași", text: "Un mic atelier, un vis mare." },
                  { year: "2010", title: "Prima Cofetărie", text: "Deschidem o locație elegantă în oraș." },
                  { year: "2015", title: "Inovație", text: "Lansăm deserturi vegane premium." },
                  { year: "2020", title: "Expansiune", text: "Comenzi online și livrări naționale." },
                  { year: "2025", title: "22 de Ani", text: "Sărbătorim excelența dulce." },
                ].map((milestone, index) => (
                  <motion.div
                    key={index}
                    variants={fadeIn}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="text-center relative flex flex-col items-center"
                  >
                    <div className="hidden md:flex absolute top-8 transform -translate-y-1/2 justify-center items-center">
                      <div className="w-3 h-3 bg-white border border-gray-400 rounded-full"></div>
                    </div>
                    
                    <div className="mt-16 md:mt-14">
                      <span className="text-gray-500 font-medium block mb-2">{milestone.year}</span>
                      <h3 className="text-xl font-normal text-gray-800 mb-1">{milestone.title}</h3>
                      <p className="text-gray-600 text-sm">{milestone.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
   
   
      <TeamSection team={team} />

      {/* Awards Section - Minimalist */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-light text-gray-900 mb-6">Premii</h2>
          </motion.div>
          
          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
            {awards.map((award, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-white p-6 border border-gray-100"
              >
                <span className="text-gray-400 text-sm block mb-2">{award.year}</span>
                <h3 className="text-gray-900 text-lg font-normal mb-2">{award.title}</h3>
                <p className="text-gray-600 text-sm">{award.organizator}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    
    </MainLayout>
  );
};

export default DespreNoi;