// // import React from "react";
// // import { RevealOnScroll } from "../../components/ui/RevealOnScroll";
// // import TestimonialCard from "../../components/TestimonialCard";


// // export const TestimonialsSection = () => {

// //   const testimonials = [
// //     {
// //       id: 1,
// //       name: "Maria & Paul",
// //       role: "Tort de nuntă",
// //       review:
// //         "Tortul pentru nunta noastră a fost un adevărat spectacol! Nu doar că arăta impecabil, dar gustul a fost divin. Toți invitații au fost impresionați.",
// //       rating: 5,
// //     },
// //     {
// //       id: 2,
// //       name: "Alexandra D.",
// //       role: "Client fidel",
// //       review:
// //         "De fiecare dată când am o ocazie specială, comand de aici. Macarons-urile sunt pur și simplu perfecte, iar serviciul este întotdeauna impecabil.",
// //       rating: 2,
// //     },
// //     {
// //       id: 3,
// //       name: "Radu M.",
// //       role: "Produse vegane",
// //       review:
// //         "Am descoperit recent opțiunile lor vegane și sunt impresionat. În sfârșit un loc unde pot savura deserturi delicioase fără compromisuri de gust!",
// //       rating: 5,
// //     },
// //   ];


// //  return (
// //     <section className="py-20 bg-[#F5EDE3]">
// //       <div className="container mx-auto px-4 md:px-8">

// //         <RevealOnScroll>
// //           <div className="text-center mb-16">
// //             <h5 className="text-[#C39074] font-medium mb-3 tracking-wider uppercase">
// //               Ce Spun Clienții
// //             </h5>
// //             <h2 className="font-serif text-3xl italic text-[#4A3F35] mb-3">
// //               Experiențe Dulci
// //             </h2>
// //             <div className="w-24 h-1 bg-[#C39074] mx-auto"></div>
// //           </div>
// //         </RevealOnScroll>

// //         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
// //           {testimonials.map((testimonial, index) => (
// //             <RevealOnScroll key={testimonial.id} className={`delay-${index * 100}`}>
// //               <TestimonialCard {...testimonial} />
// //             </RevealOnScroll>
// //           ))}
// //         </div>
// //       </div>
// //     </section>
// //   );
// // };

// // import React, { useState, useEffect } from "react";
// // import { RevealOnScroll } from "../../components/ui/RevealOnScroll";
// // import TestimonialCard from "../../components/TestimonialCard";
// // import HomepageService from '../../services/homepageService';

// // export const TestimonialsSection = () => {
// //   const [testimonials, setTestimonials] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     const fetchHomepageData = async () => {
// //       try {
// //         setLoading(true);
// //         const homepage = await HomepageService.getHomepageData();
        
// //         if (homepage && homepage.reviewuri && homepage.reviewuri.length > 0) {
// //           // Formatăm datele pentru a se potrivi cu formatul TestimonialCard
// //           const reviews = homepage.reviewuri.map(review => ({
// //             id: review._id,
// //             name: review.nume,
// //             role: review.tip || "Client fidel",
// //             review: review.text,
// //             rating: review.rating || 5
// //           }));
          
// //           setTestimonials(reviews);
// //         }
// //       } catch (err) {
// //         console.error('Eroare la încărcarea recenziilor:', err);
// //         setError('Nu s-au putut încărca recenziile. Vă rugăm încercați mai târziu.');
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchHomepageData();
// //   }, []);

// //   // Date implicite pentru a fi folosite dacă nu există date în backend sau dacă apare o eroare
// //   const defaultTestimonials = [
// //     {
// //       id: 1,
// //       name: "Maria & Paul",
// //       role: "Tort de nuntă",
// //       review:
// //         "Tortul pentru nunta noastră a fost un adevărat spectacol! Nu doar că arăta impecabil, dar gustul a fost divin. Toți invitații au fost impresionați.",
// //       rating: 5,
// //     },
// //     {
// //       id: 2,
// //       name: "Alexandra D.",
// //       role: "Client fidel",
// //       review:
// //         "De fiecare dată când am o ocazie specială, comand de aici. Macarons-urile sunt pur și simplu perfecte, iar serviciul este întotdeauna impecabil.",
// //       rating: 5,
// //     },
// //     {
// //       id: 3,
// //       name: "Radu M.",
// //       role: "Produse vegane",
// //       review:
// //         "Am descoperit recent opțiunile lor vegane și sunt impresionat. În sfârșit un loc unde pot savura deserturi delicioase fără compromisuri de gust!",
// //       rating: 5,
// //     },
// //   ];

// //   // Folosim datele din backend sau cele implicite dacă nu există date sau apare o eroare
// //   const displayTestimonials = testimonials.length > 0 ? testimonials : defaultTestimonials;

// //   return (
// //     <section className="py-20 bg-[#F5EDE3]">
// //       <div className="container mx-auto px-4 md:px-8">
// //         <RevealOnScroll>
// //           <div className="text-center mb-16">
// //             <h5 className="text-[#C39074] font-medium mb-3 tracking-wider uppercase">
// //               Ce Spun Clienții
// //             </h5>
// //             <h2 className="font-serif text-3xl italic text-[#4A3F35] mb-3">
// //               Experiențe Dulci
// //             </h2>
// //             <div className="w-24 h-1 bg-[#C39074] mx-auto"></div>
// //           </div>
// //         </RevealOnScroll>

// //         {loading ? (
// //           <div className="text-center py-10">
// //             <p>Se încarcă recenziile...</p>
// //           </div>
// //         ) : error ? (
// //           <div className="text-center py-10 text-red-500">
// //             <p>{error}</p>
// //           </div>
// //         ) : (
// //           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
// //             {displayTestimonials.map((testimonial, index) => (
// //               <RevealOnScroll key={testimonial.id} className={`delay-${index * 100}`}>
// //                 <TestimonialCard {...testimonial} />
// //               </RevealOnScroll>
// //             ))}
// //           </div>
// //         )}
// //       </div>
// //     </section>
// //   );
// // };

// import React, { useState, useEffect } from "react";
// import { RevealOnScroll } from "../../components/ui/RevealOnScroll";
// import TestimonialCard from "../../components/TestimonialCard";
// import HomepageService from '../../services/homepageService';

// export const TestimonialsSection = () => {
//   const [testimonials, setTestimonials] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchHomepageData = async () => {
//       try {
//         setLoading(true);
//         const response = await HomepageService.getHomepageData();
        
//         if (response && response.success && response.homepage && response.homepage.reviewuri && response.homepage.reviewuri.length > 0) {
//           // Formatăm datele pentru a se potrivi cu formatul TestimonialCard
//           const reviews = response.homepage.reviewuri.map(review => ({
//             id: review._id,
//             name: review.nume,
//             role: review.tip || "Client fidel",
//             review: review.text,
//             rating: review.rating || 5
//           }));
          
//           setTestimonials(reviews);
//         }
//       } catch (err) {
//         console.error('Eroare la încărcarea recenziilor:', err);
//         setError('Nu s-au putut încărca recenziile. Vă rugăm încercați mai târziu.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchHomepageData();
//   }, []);

//   // Date implicite pentru a fi folosite dacă nu există date în backend sau dacă apare o eroare
//   const defaultTestimonials = [
//     {
//       id: 1,
//       name: "Maria & Paul",
//       role: "Tort de nuntă",
//       review:
//         "Tortul pentru nunta noastră a fost un adevărat spectacol! Nu doar că arăta impecabil, dar gustul a fost divin. Toți invitații au fost impresionați.",
//       rating: 5,
//     },
//     {
//       id: 2,
//       name: "Alexandra D.",
//       role: "Client fidel",
//       review:
//         "De fiecare dată când am o ocazie specială, comand de aici. Macarons-urile sunt pur și simplu perfecte, iar serviciul este întotdeauna impecabil.",
//       rating: 5,
//     },
//     {
//       id: 3,
//       name: "Radu M.",
//       role: "Produse vegane",
//       review:
//         "Am descoperit recent opțiunile lor vegane și sunt impresionat. În sfârșit un loc unde pot savura deserturi delicioase fără compromisuri de gust!",
//       rating: 5,
//     },
//   ];

//   // Folosim datele din backend sau cele implicite dacă nu există date sau apare o eroare
//   const displayTestimonials = testimonials.length > 0 ? testimonials : defaultTestimonials;

//   return (
//     <section className="py-20 bg-[#F5EDE3]">
//       <div className="container mx-auto px-4 md:px-8">
//         <RevealOnScroll>
//           <div className="text-center mb-16">
//             <h5 className="text-[#C39074] font-medium mb-3 tracking-wider uppercase">
//               Ce Spun Clienții
//             </h5>
//             <h2 className="font-serif text-3xl italic text-[#4A3F35] mb-3">
//               Experiențe Dulci
//             </h2>
//             <div className="w-24 h-1 bg-[#C39074] mx-auto"></div>
//           </div>
//         </RevealOnScroll>

//         {loading ? (
//           <div className="text-center py-10">
//             <p>Se încarcă recenziile...</p>
//           </div>
//         ) : error ? (
//           <div className="text-center py-10 text-red-500">
//             <p>{error}</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {displayTestimonials.map((testimonial, index) => (
//               <RevealOnScroll key={testimonial.id} className={`delay-${index * 100}`}>
//                 <TestimonialCard {...testimonial} />
//               </RevealOnScroll>
//             ))}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// // };

// import React, { useState, useEffect } from "react";
// import { RevealOnScroll } from "../../components/ui/RevealOnScroll";
// import TestimonialCard from "../../components/TestimonialCard";
// import HomepageService from '../../services/homepageService';

// export const TestimonialsSection = () => {
//   const [testimonials, setTestimonials] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchHomepageData = async () => {
//       try {
//         setLoading(true);
//         const response = await HomepageService.getHomepageData();
        
//         // Log the response for debugging
//         console.log('API Response (Testimonials):', response);
        
//         // Check if we have the expected data structure
//         if (response?.success && response?.homepage?.reviewuri?.length > 0) {
//           // Formatăm datele pentru a se potrivi cu formatul TestimonialCard
//           const reviews = response.homepage.reviewuri.map(review => ({
//             id: review._id || `temp-${Math.random()}`, // Ensure we always have an ID
//             name: review.nume || 'Client',
//             role: review.tip || "Client fidel",
//             review: review.text || '',
//             rating: review.rating || 5
//           }));
          
//           console.log('Mapped reviews:', reviews);
//           setTestimonials(reviews);

//         } else {
//           console.log('Response missing expected structure, using defaults for testimonials');
//           setTestimonials([]); // This will trigger using the default testimonials
//         }
//       } catch (err) {
//         console.error('Eroare la încărcarea recenziilor:', err);
//         setError('Nu s-au putut încărca recenziile. Vă rugăm încercați mai târziu.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchHomepageData();
//   }, []);

//   // Date implicite pentru a fi folosite dacă nu există date în backend sau dacă apare o eroare
//   const defaultTestimonials = [
//     {
//       id: 1,
//       name: "Maria & Paul",
//       role: "Tort de nuntă",
//       review:
//         "Tortul pentru nunta noastră a fost un adevărat spectacol! Nu doar că arăta impecabil, dar gustul a fost divin. Toți invitații au fost impresionați.",
//       rating: 5,
//     },
//     {
//       id: 2,
//       name: "Alexandra D.",
//       role: "Client fidel",
//       review:
//         "De fiecare dată când am o ocazie specială, comand de aici. Macarons-urile sunt pur și simplu perfecte, iar serviciul este întotdeauna impecabil.",
//       rating: 5,
//     },
//     {
//       id: 3,
//       name: "Radu M.",
//       role: "Produse vegane",
//       review:
//         "Am descoperit recent opțiunile lor vegane și sunt impresionat. În sfârșit un loc unde pot savura deserturi delicioase fără compromisuri de gust!",
//       rating: 5,
//     },
//   ];

//   // Folosim datele din backend sau cele implicite dacă nu există date sau apare o eroare
//   const displayTestimonials = testimonials.length > 0 ? testimonials : defaultTestimonials;

//   return (
//     <section className="py-20 bg-[#F5EDE3]">
//       <div className="container mx-auto px-4 md:px-8">
//         <RevealOnScroll>
//           <div className="text-center mb-16">
//             <h5 className="text-[#C39074] font-medium mb-3 tracking-wider uppercase">
//               Ce Spun Clienții
//             </h5>
//             <h2 className="font-serif text-3xl italic text-[#4A3F35] mb-3">
//               Experiențe Dulci
//             </h2>
//             <div className="w-24 h-1 bg-[#C39074] mx-auto"></div>
//           </div>
//         </RevealOnScroll>

//         {loading ? (
//           <div className="text-center py-10">
//             <p>Se încarcă recenziile...</p>
//           </div>
//         ) : error ? (
//           <div className="text-center py-10 text-red-500">
//             <p>{error}</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {displayTestimonials.map((testimonial, index) => (
//               <RevealOnScroll key={testimonial.id} className={`delay-${index * 100}`}>
//                 <TestimonialCard {...testimonial} />
//               </RevealOnScroll>
//             ))}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };


import React, { useState, useEffect } from "react";
import { RevealOnScroll } from "../../components/ui/RevealOnScroll";
import TestimonialCard from "../../components/TestimonialCard";
import HomepageService from '../../services/homepageService';

export const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        // Folosim noul endpoint care returneaza datele deja formatate pentru TestimonialCard
        const reviews = await HomepageService.getReviewsForDisplay();
        console.log('Recenzii primite de la API:', reviews);
        setTestimonials(reviews);
      } catch (err) {
        console.error('Eroare la încărcarea recenziilor:', err);
        setError('Nu s-au putut încărca recenziile. Vă rugăm încercați mai târziu.');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // Date implicite pentru a fi folosite dacă nu există date în backend sau dacă apare o eroare
  const defaultTestimonials = [
    {
      id: 1,
      name: "Maria & Paul",
      role: "Tort de nuntă",
      review:
        "Tortul pentru nunta noastră a fost un adevărat spectacol! Nu doar că arăta impecabil, dar gustul a fost divin. Toți invitații au fost impresionați.",
      rating: 5,
    },
    {
      id: 2,
      name: "Alexandra D.",
      role: "Client fidel",
      review:
        "De fiecare dată când am o ocazie specială, comand de aici. Macarons-urile sunt pur și simplu perfecte, iar serviciul este întotdeauna impecabil.",
      rating: 5,
    },
    {
      id: 3,
      name: "Radu M.",
      role: "Produse vegane",
      review:
        "Am descoperit recent opțiunile lor vegane și sunt impresionat. În sfârșit un loc unde pot savura deserturi delicioase fără compromisuri de gust!",
      rating: 5,
    },
  ];

  // Folosim datele din backend sau cele implicite dacă nu există date sau apare o eroare
  const displayTestimonials = testimonials.length > 0 ? testimonials : defaultTestimonials;

  return (
    <section className="py-20 bg-[#F5EDE3]">
      <div className="container mx-auto px-4 md:px-8">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <h5 className="text-[#C39074] font-medium mb-3 tracking-wider uppercase">
              Ce Spun Clienții
            </h5>
            <h2 className="font-serif text-3xl italic text-[#4A3F35] mb-3">
              Experiențe Dulci
            </h2>
            <div className="w-24 h-1 bg-[#C39074] mx-auto"></div>
          </div>
        </RevealOnScroll>

        {loading ? (
          <div className="text-center py-10">
            <p>Se încarcă recenziile...</p>
          </div>
        ) : error ? (
          <div className="text-center py-10 text-red-500">
            <p>{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {displayTestimonials.map((testimonial, index) => (
              <RevealOnScroll key={testimonial.id} className={`delay-${index * 100}`}>
                <TestimonialCard {...testimonial} />
              </RevealOnScroll>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
