import React, { useState, useEffect } from 'react';
import ModalWrapper from './ui/ModalWrapper';
import ModalHeader from './ui/ModalHeader';
import ProductForm from './ui/ModalProductForm';
import ModalFooter from './ui/ModalFooter';

const Modal = ({
  isOpen,
  onClose,
  modalMode,
  title,
  selectedProduct,
  formValues,
  handleFormChange,
  handleSubmit,
  handleDelete,
  categories,
  characteristics,
}) => {
  const [previews, setPreviews] = useState([]);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (isOpen && modalMode === 'edit' && selectedProduct?.images?.length > 0) {
      const existingPreviews = selectedProduct.images
        .map((image) =>
          typeof image === 'string' ? image : URL.createObjectURL(image)
        )
        .filter(Boolean);
      setPreviews(existingPreviews);
    } else if (!isOpen) {
      setPreviews([]);
      setFormErrors({});
    }
  }, [isOpen, modalMode, selectedProduct]);

  const validateForm = () => {
    const errors = {};
    if (!formValues.name?.trim()) errors.name = 'Numele produsului este obligatoriu';
    if (!formValues.description?.trim())
      errors.description = 'Descrierea este obligatorie';
    if (!formValues.price || formValues.price <= 0)
      errors.price = 'Prețul trebuie să fie mai mare decât 0';
    if (!formValues.category?.trim())
      errors.category = 'Trebuie să selectați o categorie';
    if (!formValues.allergensText?.trim())
      errors.allergensText = 'Informațiile despre alergeni sunt obligatorii';
    if (!formValues.ingredients?.length)
      errors.ingredients = 'Trebuie să adăugați cel puțin un ingredient';
    if (modalMode === 'add' && !formValues.images?.length)
      errors.images = 'Trebuie să adăugați cel puțin o imagine';
    console.log('formValues.images in validateForm:', formValues.images); // Debugging
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) handleSubmit(e);
  };

  const handleCategoryChange = (category) => {
    handleFormChange({
      target: {
        name: 'category',
        value: category,
      },
    });
  };

  const handleCheckboxChange = (fieldName, itemId, isChecked) => {
    const currentValues = formValues[fieldName] || [];
    const newValues = isChecked
      ? [...currentValues, itemId]
      : currentValues.filter((id) => id !== itemId);
    handleFormChange({ target: { name: fieldName, value: newValues } });
  };

  return (
    <ModalWrapper isOpen={isOpen}>
      <ModalHeader title={title} onClose={onClose} modalMode={modalMode} />
      <div
        className="bg-white px-4 py-4 max-h-[70vh] overflow-y-auto"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {modalMode === 'delete' ? (
          <p className="text-sm text-gray-500">
            Ești sigur că vrei să ștergi produsul "{selectedProduct?.name}"? Această
            acțiune nu poate fi anulată.
          </p>
        ) : (
          <ProductForm
            formValues={formValues}
            handleFormChange={handleFormChange}
            categories={categories}
            characteristics={characteristics}
            formErrors={formErrors}
            handleCategoryChange={handleCategoryChange}
            handleCheckboxChange={handleCheckboxChange}
            previews={previews}
            setPreviews={setPreviews}
            handleFormSubmit={handleFormSubmit}
          />
        )}
      </div>
      <ModalFooter
        modalMode={modalMode}
        onClose={onClose}
        handleDelete={handleDelete}
        handleFormSubmit={handleFormSubmit}
      />
    </ModalWrapper>
  );
};

export default Modal;