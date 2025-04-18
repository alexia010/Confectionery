import React from 'react';
import { Button } from '../../components/ui/Button';
import { Link } from 'react-router-dom';

export const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          // src="https://images.unsplash.com/photo-1516919549054-e08258825f80"
          src="https://images.unsplash.com/photo-1612203985729-70726954388c"
          // src="https://images.unsplash.com/photo-1542826438-bd32f43d626f"
          //src="https://images.unsplash.com/photo-1551024506-0bccd828d307"

          alt="Prăjituri artizanale"
          className="w-full h-full object-cover"
        />

        {/* Darker overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/60 to-[#A35D3A]/50"></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Title with text shadow for better visibility */}
          <h5 className="text-[#FFEFD5] font-medium mb-4 tracking-wider uppercase text-with-shadow">Din 2003</h5>

          <h1 className="font-serif text-5xl md:text-7xl font-bold text-white mb-6 leading-tight hero-title text-with-shadow">
            Arome <span className="text-[#FF007F] text-with-shadow">cerești</span>, bucurie pură!
          </h1>

          {/* Increased opacity and added text shadow for paragraph */}
          <p className="text-lg md:text-xl text-white mb-8 max-w-2xl mx-auto text-with-shadow">
            Cofetăria noastră combină rețete tradiționale cu tehnici moderne pentru a crea deserturi care încântă toate simțurile.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/produse">
              <Button
                className="text-base sm:text-lg px-8 py-4 bg-[#8B2252] hover:bg-[#6E1A40] text-white font-bold shadow-lg"
              >
                Descoperă produsele
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Custom CSS for text shadow */}
      <style jsx>{`
        .text-with-shadow {
          text-shadow: 0px 0px 3px rgba(0, 0, 0, 0.9), 0px 0px 8px rgba(0, 0, 0, 0.7);
        }
        
        .hero-title {
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
        }
      `}</style>
    </section>
  );
};
