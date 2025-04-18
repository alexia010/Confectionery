import React from 'react';

const ModalImage = ({ formValues = {}, handleFormChange, previews = [], setPreviews, formErrors }) => {
  // Debug pentru a verifica ce primește componenta
  console.log('ModalImage received previews:', previews);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const currentImagesCount = Array.isArray(formValues.images) ? formValues.images.length : 0;
    
    if (files.length > 0 && currentImagesCount + files.length <= 3) {
      const newPreviews = files.map(file => URL.createObjectURL(file));
      setPreviews([...(Array.isArray(previews) ? previews : []), ...newPreviews]);
      handleFormChange({
        target: {
          name: 'images',
          value: [...(Array.isArray(formValues.images) ? formValues.images : []), ...files]
        }
      });
    } else if (files.length > 0) {
      alert('Puteți adăuga maximum 3 imagini per produs.');
    }
  };

  const removeImage = (index) => {
    const currentImages = Array.isArray(formValues.images) ? [...formValues.images] : [];
    const currentPreviews = Array.isArray(previews) ? [...previews] : [];
    currentImages.splice(index, 1);
    const removedPreview = currentPreviews.splice(index, 1)[0];
    handleFormChange({ target: { name: 'images', value: currentImages } });
    setPreviews(currentPreviews);
    if (removedPreview?.startsWith('blob:')) URL.revokeObjectURL(removedPreview);
  };

  const imagesCount = Array.isArray(formValues.images) ? formValues.images.length : 0;

  return (
    <>
      <div className={formErrors?.images ? 'error-field' : ''}>
        <label className="block text-sm font-medium text-gray-700">
          Imagini produs * ({imagesCount}/3)
        </label>
        <input
          type="file"
          id="images"
          name="images"
          accept="image/*"
          onChange={handleImageChange}
          disabled={imagesCount >= 3}
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#F5A9B8] file:text-white hover:file:bg-[#E18C9E]"
        />
        <p className="mt-1 text-xs text-gray-500">
          Adăugați între 1 și 3 imagini. Prima imagine va fi cea principală.
        </p>
        {formErrors?.images && <p className="mt-1 text-xs text-red-500">{formErrors.images}</p>}
      </div>
      {Array.isArray(previews) && previews.length > 0 && (
        <div>
          <p className="text-sm text-gray-500 mb-2">Previzualizare imagini:</p>
          <div className="flex flex-wrap gap-4">
            {previews.map((preview, index) => (
              <div key={index} className="relative w-20 h-20 sm:w-24 sm:h-24">
                <img src={preview} alt={`Previzualizare ${index + 1}`} className="w-full h-full object-cover rounded-md" />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                >
                  ×
                </button>
                {index === 0 && (
                  <span className="absolute bottom-0 left-0 right-0 bg-indigo-600 text-white text-xs text-center py-1">
                    Principală
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ModalImage;


// import React, { useEffect } from 'react';
// import { X } from 'lucide-react';

// const ImagesSection = ({
//   formValues,
//   handleFormChange,
//   previews,
//   setPreviews,
//   formErrors,
// }) => {
//   useEffect(() => {
//     // Generează previzualizări pentru imaginile noi
//     const newPreviews = formValues.images
//       .filter((img) => img instanceof File)
//       .map((img) => URL.createObjectURL(img));
//     setPreviews([
//       ...formValues.images.filter((img) => typeof img === 'string'),
//       ...newPreviews,
//     ]);

//     // Curăță URL-urile obiectelor la demontare
//     return () => {
//       newPreviews.forEach((url) => URL.revokeObjectURL(url));
//     };
//   }, [formValues.images, setPreviews]);

//   const handleRemoveImage = (index) => {
//     const updatedImages = formValues.images.filter((_, i) => i !== index);
//     handleFormChange({
//       target: {
//         name: 'images',
//         value: updatedImages,
//       },
//     });
//   };

//   return (
//     <div className={formErrors.images ? 'error-field' : ''}>
//       <label className="block text-sm font-medium text-gray-700">
//         Imagini *
//       </label>
//       <input
//         type="file"
//         name="images"
//         multiple
//         accept="image/*"
//         onChange={handleFormChange}
//         className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
//       />
//       {previews.length > 0 && (
//         <div className="mt-2 grid grid-cols-3 gap-2">
//           {previews.map((preview, index) => (
//             <div key={index} className="relative">
//               <img
//                 src={preview}
//                 alt={`Preview ${index}`}
//                 className="h-24 w-24 object-cover rounded-md"
//               />
//               <button
//                 type="button"
//                 onClick={() => handleRemoveImage(index)}
//                 className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
//               >
//                 <X size={16} />
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//       {formErrors.images && (
//         <p className="mt-1 text-xs text-red-500">{formErrors.images}</p>
//       )}
//     </div>
//   );
// };

// export default ImagesSection;