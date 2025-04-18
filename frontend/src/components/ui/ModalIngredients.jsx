import React, { useState } from 'react';
import { Trash2, Plus } from 'lucide-react';
import {Button} from './Button'; // Ajustăm importul
import { AVAILABLE_UNITS } from '../../config/constants';

const ModalIngredients = ({ formValues, handleFormChange, formErrors }) => {
  const [newIngredient, setNewIngredient] = useState({
    name: '',
    quantity: '',
    unit: 'g'
  });

  const handleIngredientChange = (e) => {
    const { name, value } = e.target;
    if (name === 'quantity' && parseFloat(value) < 0) return;
    setNewIngredient({ ...newIngredient, [name]: value });
  };

  const addIngredient = () => {
    if (!newIngredient.name || !newIngredient.quantity) {
      alert('Trebuie să specificați numele și cantitatea ingredientului.');
      return;
    }
    
    const ingredient = {
      _id: Date.now().toString(),
      ...newIngredient
    };
    
    handleFormChange({
      target: {
        name: 'ingredients',
        value: formValues.ingredients ? [...formValues.ingredients, ingredient] : [ingredient]
      }
    });
    
    setNewIngredient({ name: '', quantity: '', unit: 'g' });
  };

  const removeIngredient = (ingredientId) => {
    handleFormChange({
      target: {
        name: 'ingredients',
        value: formValues.ingredients.filter(ing => ing._id !== ingredientId)
      }
    });
  };

  return (
    <div className={`border border-gray-200 rounded-md p-4 ${formErrors.ingredients ? 'border-red-500 error-field' : ''}`}>
      <h3 className="text-sm font-medium text-gray-700 mb-2">Ingrediente *</h3>
      {formValues.ingredients?.length > 0 && (
        <ul className="space-y-2 mb-4">
          {formValues.ingredients.map(ingredient => (
            <li key={ingredient._id} className="flex items-center justify-between bg-gray-50 py-1 px-2 rounded text-xs">
              <span>{ingredient.name} - {ingredient.quantity} {ingredient.unit}</span>
              <button onClick={() => removeIngredient(ingredient._id)} className="text-red-500 hover:text-red-700">
                <Trash2 size={14} />
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className="grid grid-cols-1 sm:flex sm:flex-wrap gap-2">
        <input
          type="text"
          placeholder="Nume ingredient"
          name="name"
          value={newIngredient.name}
          onChange={handleIngredientChange}
          className="w-full sm:flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        <div className="grid grid-cols-2 gap-2 sm:flex">
          <input
            type="number"
            placeholder="Cant."
            min="0.01"
            step="0.01"
            name="quantity"
            value={newIngredient.quantity}
            onChange={handleIngredientChange}
            className="w-full sm:w-20 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <select
            name="unit"
            value={newIngredient.unit}
            onChange={handleIngredientChange}
            className="w-full sm:w-24 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            {AVAILABLE_UNITS.map((unit, index) => (
              <option key={index} value={unit}>{unit}</option>
            ))}
          </select>
        </div>
        <Button
          type="button"
          onClick={addIngredient}
          className="w-full sm:w-auto inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-[#F5A9B8] hover:bg-[#E18C9E] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E18C9E]"
        >
          <Plus size={16} className="mr-1" /> Adaugă
        </Button>
      </div>
      {formErrors.ingredients && <p className="mt-2 text-xs text-red-500">{formErrors.ingredients}</p>}
    </div>
  );
};

export default ModalIngredients;