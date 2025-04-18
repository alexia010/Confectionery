import React from "react";
import { RevealOnScroll } from "./ui/RevealOnScroll";


const TestimonialCard = ({ name, role, review, rating }) => {
    return (
      <div className="bg-[#F5F5F5] p-8 rounded-xl shadow-lg">
        <div className="flex items-center gap-1 mb-4 text-[#C39074]">
          {"★".repeat(rating)}
        </div>
        <p className="italic text-[#000000]/80 mb-6">{review}</p>
        <div className="flex items-center gap-4 pt-4 border-t border-[#A35D3A]/10">
          <div className="w-12 h-12 bg-[#D7BFA8] rounded-full flex items-center justify-center text-[#000000] font-medium">
            {name.split(" ").map((n) => n[0]).join("")}
     
          </div>
          <div>
            <p className="font-medium text-[#000000]">{name}</p>
            <p className="text-sm text-[#A35D3A]/70">{role}</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default TestimonialCard;
  