import React from "react";
import { Button } from "./Button";
import { X } from "lucide-react";

const CartPreviewItem = ({ item, onRemove }) => {
  return (
    <div className="flex items-center text-black space-x-4 border-b-[0.5px] border-gray-100 pb-4">
      <img
        src={item.image}
        alt={item.name}
        className="w-16 h-16 object-cover rounded"
      />
      <div className="flex-1">
        <h3 className="text-lg font-medium">{item.name}</h3>
        <p className="text-sm text-gray-500">
          Preț: {item.price} RON
        </p>
        <p className="text-sm text-gray-500">
          Cantitate: {item.quantity}
        </p>
      </div>
      <Button 
        variant="link"
        onClick={() => onRemove(item.id)} 
        className="text-gray-400 hover:text-gray-600 transition-colors"
        aria-label="Elimină produsul"
      >
        <X className="text-gray-300 w-4 h-4 mt-[-50px]" />
      </Button>
    </div>
  );
};

export default CartPreviewItem;