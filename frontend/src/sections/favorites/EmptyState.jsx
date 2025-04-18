import React from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { Button } from "../../components/ui/Button";

const EmptyFavorites = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full py-12 px-4 text-center">
      <Heart className="w-16 h-16 mb-6 text-gray-300" />
      <h2 className="text-xl mb-4 text-black">Nimic favorit încă? E timpul să schimbi asta!</h2>
      <p className="text-gray-600 mb-8 max-w-md">
        {/* Your paragraph content can go here */}
      </p>
      <Button className="w-auto">
        <Link to="/produse" className="px-4">
          Explorează produse
        </Link>
      </Button>
    </div>
  );
};

export default EmptyFavorites;