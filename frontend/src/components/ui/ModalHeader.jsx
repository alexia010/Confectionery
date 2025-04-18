import React from 'react';
import { X } from 'lucide-react';

const ModalHeader = ({ title, onClose, modalMode }) => (
  <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
    <h3 className="text-lg font-medium text-gray-900">
      {modalMode === 'delete' ? 'Șterge produs' : title}
    </h3>
    <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
      <X size={20} />
    </button>
  </div>
);

export default ModalHeader;
