import React from 'react';
import {Button} from './Button'; // Ajustăm importul

const ModalFooter = ({ modalMode, onClose, handleDelete, handleFormSubmit }) => (
  <div className="bg-gray-50 px-4 py-3 sm:px-6 flex flex-col sm:flex-row-reverse sm:justify-end gap-2">
    {modalMode === 'delete' ? (
      <>
        <Button type="button" onClick={handleDelete} variant="danger" className="w-full sm:w-auto">Șterge</Button>
        <Button type="button" onClick={onClose} variant="secondary" className="w-full sm:w-auto">Anulează</Button>
      </>
    ) : (
      <>
        <Button type="submit" onClick={handleFormSubmit} variant="primary" className="w-full sm:w-auto">
          {modalMode === 'add' ? 'Adaugă' : 'Salvează'}
        </Button>
        <Button type="button" onClick={onClose} variant="secondary" className="w-full sm:w-auto">Anulează</Button>
      </>
    )}
  </div>
);

export default ModalFooter;