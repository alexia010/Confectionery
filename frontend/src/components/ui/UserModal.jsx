


import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '../ui/Button';

const UserModal = ({
  isOpen,
  onClose,
  modalMode,
  title,
  selectedUser,
  formValues,
  handleFormChange,
  handleSubmit,
  handleDelete,
}) => {
  const [errors, setErrors] = useState({});
  
  if (!isOpen) return null;

  // Funcția pentru validarea formularului
  const validateForm = () => {
    const newErrors = {};
    
    // Verifică câmpurile obligatorii dacă nu este un vizitator
    if (formValues.role !== 'guest') {
      if (!formValues.name.trim()) {
        newErrors.name = 'Numele este obligatoriu';
      }
      
      if (!formValues.email.trim()) {
        newErrors.email = 'Email-ul este obligatoriu';
      } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
        newErrors.email = 'Adresa de email nu este validă';
      }
      
      if (modalMode === 'add' && !formValues.password.trim()) {
        newErrors.password = 'Parola este obligatorie pentru utilizatorii noi';
      } else if (formValues.password && formValues.password.length < 6) {
        newErrors.password = 'Parola trebuie să conțină minim 6 caractere';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Override pentru handleSubmit pentru a include validare
  const onSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      handleSubmit(e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
        <div
          className="fixed inset-0 transition-opacity"
          aria-hidden="true"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div
          className="inline-block w-full max-w-md align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
            <h3
              className="text-lg leading-6 font-medium text-gray-900"
              id="modal-headline"
            >
              {title}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <X size={24} />
            </button>
          </div>

          <div 
            className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 max-h-[70vh] overflow-y-auto"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <style jsx>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            <div className="sm:flex sm:items-start">
              <div className="w-full">
                {modalMode === 'delete' ? (
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Sunteți sigur că doriți să ștergeți utilizatorul{' '}
                      <span className="font-medium">
                        {selectedUser?.name || 'selectat'}
                      </span>
                      ? Această acțiune nu poate fi anulată.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={onSubmit}>
                    <div className="space-y-4">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Nume complet <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          value={formValues.name}
                          onChange={handleFormChange}
                          required={formValues.role !== 'guest'}
                          className={`mt-1 p-2 w-full text-black border ${
                            errors.name ? 'border-red-500' : 'border-gray-300'
                          } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                          placeholder="Nume și prenume"
                        />
                        {errors.name && (
                          <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={formValues.email}
                          onChange={handleFormChange}
                          required={formValues.role !== 'guest'}
                          className={`mt-1 p-2 w-full text-black border ${
                            errors.email ? 'border-red-500' : 'border-gray-300'
                          } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                          placeholder="email@exemplu.com"
                        />
                        {errors.email && (
                          <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="password"
                          className="block text-sm font-medium text-gray-700"
                        >
                          {modalMode === 'add' ? 'Parolă' : 'Parolă nouă'} 
                          {modalMode === 'add' && formValues.role !== 'guest' && (
                            <span className="text-red-500">*</span>
                          )}
                          {modalMode === 'edit' && (
                            <span className="text-xs text-gray-500 ml-1">
                              (lăsați gol pentru a păstra parola actuală)
                            </span>
                          )}
                        </label>
                        <input
                          type="password"
                          name="password"
                          id="password"
                          value={formValues.password}
                          onChange={handleFormChange}
                          required={modalMode === 'add' && formValues.role !== 'guest'}
                          minLength={modalMode === 'add' || formValues.password ? 6 : undefined}
                          className={`mt-1 p-2 w-full text-black border ${
                            errors.password ? 'border-red-500' : 'border-gray-300'
                          } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                          placeholder={modalMode === 'add' ? "Minim 6 caractere" : "Parolă nouă (opțional)"}
                        />
                        {errors.password && (
                          <p className="mt-1 text-xs text-red-500">{errors.password}</p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Telefon
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          id="phone"
                          value={formValues.phone}
                          onChange={handleFormChange}
                          className="mt-1 p-2 w-full text-black border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          placeholder="Număr de telefon"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="adress"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Adresă
                        </label>
                        <input
                          type="text"
                          name="adress"
                          id="adress"
                          value={formValues.adress}
                          onChange={handleFormChange}
                          className="mt-1 p-2 w-full text-black border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          placeholder="Adresa completă"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="role"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Rol <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="role"
                          id="role"
                          value={formValues.role}
                          onChange={handleFormChange}
                          className="mt-1 p-2 w-full text-black border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          <option value="user">Utilizator</option>
                          {/* <option value="cofetar">Cofetar</option> */}
                          <option value="admin">Administrator</option>
                          {/* <option value="guest">Vizitator</option> */}
                        </select>
                      </div>

                      {formValues.role === 'guest' && (
                        <div className="p-3 bg-yellow-50 rounded-md border border-yellow-200">
                          <p className="text-xs text-yellow-700">
                            <span className="font-medium">Notă:</span> Un utilizator de tip "Vizitator" nu necesită nume, email sau parolă.
                          </p>
                        </div>
                      )}

         
                      <div className="p-3 bg-blue-50 rounded-md border border-blue-200">
                        <p className="text-xs text-blue-700">
                          <span className="font-medium">Notă:</span> Câmpurile marcate cu <span className="text-red-500">*</span> sunt obligatorii.
                        </p>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>

          <div className="bg-gray-50 px-4 py-3 sm:px-6 flex flex-col sm:flex-row-reverse sm:gap-2 gap-3">
            {modalMode === 'delete' ? (
              <>
                <Button
                  onClick={handleDelete}
                  className="w-full sm:w-auto justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Șterge
                </Button>
                <Button
                  onClick={onClose}
                  className="w-full sm:w-auto justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Anulează
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={onSubmit}
                  className="w-full sm:w-auto justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {modalMode === 'add' ? 'Adaugă' : 'Salvează'}
                </Button>
                <Button
                  onClick={onClose}
                  className="w-full sm:w-auto justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Anulează
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserModal;