


import React from 'react';
import { X } from 'lucide-react';
import { Button } from './Button';

/**
 * Componentă reutilizabilă pentru confirmarea ștergerii
 * @param {Object} props - Proprietățile componentei
 * @param {boolean} props.isOpen - Dacă dialogul este deschis sau nu
 * @param {Function} props.onClose - Funcția apelată la închiderea dialogului
 * @param {Function} props.onConfirm - Funcția apelată la confirmarea ștergerii
 * @param {string} props.title - Titlul dialogului
 * @param {string} props.message - Mesajul de confirmare
 * @param {React.ReactNode} props.itemPreview - [Opțional] Preview-ul elementului care va fi șters
 * @returns {JSX.Element}
 */
const DeleteConfirmationDialog = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Confirmare ștergere", 
  message = "Ești sigur că vrei să ștergi acest element? Această acțiune nu poate fi anulată.",
  itemPreview 
}) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              {title}
            </h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X size={20} />
            </button>
          </div>
          
          <div className="bg-white px-4 py-5 sm:p-6">
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                {message}
              </p>
              
              {itemPreview && (
                <div className="mt-4 p-3 bg-gray-50 rounded-md">
                  {itemPreview}
                </div>
              )}
            </div>
          </div>
          
          <div className="bg-gray-50 px-4 py-3 sm:px-6 flex flex-col sm:flex-row-reverse sm:justify-end gap-2">
            <Button 
              type="button"
              onClick={onConfirm}
              variant="danger"
              className="w-full sm:w-auto"
            >
              Șterge
            </Button>
            <Button
              type="button"
              onClick={onClose}
              variant="secondary"
              className="w-full sm:w-auto"
            >
              Anulează
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationDialog;