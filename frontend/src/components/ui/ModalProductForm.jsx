// import React from 'react';
// import IngredientsSection from './ModalIngredients'; // Ajustăm importul
// import ImagesSection from './ModalImage'; // Ajustăm importul

// const ModalProductForm = ({
//   formValues,
//   handleFormChange,
//   categories,
//   characteristics,
//   formErrors,
//   handleCategoryChange,
//   handleCheckboxChange,
//   previews,
//   setPreviews,
//   handleFormSubmit
// }) => (
//   <form onSubmit={handleFormSubmit} className="space-y-4 text-black">
//     <div className={formErrors.name ? 'error-field' : ''}>
//       <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nume produs *</label>
//       <input
//         type="text"
//         name="name"
//         id="name"
//         value={formValues.name || ''}
//         onChange={handleFormChange}
//         required
//         className={`mt-1 block w-full border ${formErrors.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
//       />
//       {formErrors.name && <p className="mt-1 text-xs text-red-500">{formErrors.name}</p>}
//     </div>
//     <div className={formErrors.description ? 'error-field' : ''}>
//       <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descriere *</label>
//       <textarea
//         name="description"
//         id="description"
//         rows="3"
//         value={formValues.description || ''}
//         onChange={handleFormChange}
//         required
//         className={`mt-1 block w-full border ${formErrors.description ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
//       ></textarea>
//       {formErrors.description && <p className="mt-1 text-xs text-red-500">{formErrors.description}</p>}
//     </div>
//     <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 ${formErrors.price ? 'error-field' : ''}`}>
//       <div>
//         <label htmlFor="price" className="block text-sm font-medium text-gray-700">Preț (lei) *</label>
//         <input
//           type="number"
//           name="price"
//           id="price"
//           min="0.01"
//           step="0.01"
//           value={formValues.price || ''}
//           onChange={handleFormChange}
//           required
//           className={`mt-1 block w-full border ${formErrors.price ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
//         />
//         {formErrors.price && <p className="mt-1 text-xs text-red-500">{formErrors.price}</p>}
//       </div>
//     </div>
//     <div className={formErrors.categories ? 'error-field' : ''}>
//       <label className="block text-sm font-medium text-gray-700">Categorii *</label>
//       <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1">
//         {categories.map((category, index) => (
//             <div key={index} className="flex items-center">
//             <input
//             type="radio"
//             id={`category-${index}`}
//             name="category-radio"
//             checked={formValues.categories?.includes(category) || false}
//             onChange={() => handleCategoryChange(category)}
//             className="w-3 h-3 appearance-none bg-white border-2 border-[#96633F] rounded-full checked:bg-[#96633F] focus:ring-[#96633F]"
//             required
//             />
//             <label htmlFor={`category-${index}`} className="ml-1 block text-xs text-gray-700">{category}</label>
//         </div>
//         ))}
//       </div>
//       {formErrors.categories && <p className="mt-1 text-xs text-red-500">{formErrors.categories}</p>}
//     </div>
//     <div>
//       <label className="block text-sm font-medium text-gray-700">Caracteristici</label>
//       <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1">
//         {characteristics && characteristics.map((characteristic, index) => (
//           <div key={index} className="flex items-center">
//             <input
//               type="checkbox"
//               id={`characteristic-${index}`}
//               checked={formValues.characteristics?.includes(characteristic) || false}
//               onChange={(e) => handleCheckboxChange('characteristics', characteristic, e.target.checked)}
//               className="focus:ring-indigo-500 h-3 w-3 text-indigo-600 border-gray-300 rounded"
//             />
//             <label htmlFor={`characteristic-${index}`} className="ml-1 block text-xs text-gray-700">
//               {characteristic}
//             </label>
//           </div>
//         ))}
//       </div>
//     </div>
//     <div className={formErrors.allergensText ? 'error-field' : ''}>
//       <label htmlFor="allergens" className="block text-sm font-medium text-gray-700">Alergeni *</label>
//       <textarea
//         name="allergens"
//         id="allergens"
//         rows="2"
//         value={formValues.allergensText || ''}
//         onChange={(e) => handleFormChange({
//           target: {
//             name: 'allergensText',
//             value: e.target.value
//           }
//         })}
//         required
//         placeholder="Introduceți alergenii separați prin virgulă (ex: Gluten, Ouă, Lactoza)"
//         className={`mt-1 block w-full border ${formErrors.allergensText ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
//       ></textarea>
//       {formErrors.allergensText && <p className="mt-1 text-xs text-red-500">{formErrors.allergensText}</p>}
//     </div>
//     <IngredientsSection formValues={formValues} handleFormChange={handleFormChange} formErrors={formErrors} />
//     <ImagesSection
//       formValues={formValues}
//       handleFormChange={handleFormChange}
//       previews={previews}
//       setPreviews={setPreviews}
//       formErrors={formErrors}
//     />
//   </form>
// );

// export default ModalProductForm;


// import React from 'react';
// import IngredientsSection from './ModalIngredients';
// import ImagesSection from './ModalImage';

// const ModalProductForm = ({
//   formValues,
//   handleFormChange,
//   category,
//   characteristics,
//   formErrors,
//   handleCategoryChange,
//   handleCheckboxChange,
//   previews,
//   setPreviews,
//   handleFormSubmit
// }) => (
//   <form onSubmit={handleFormSubmit} className="space-y-4 text-black">
//     <div className={formErrors.name ? 'error-field' : ''}>
//       <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nume produs *</label>
//       <input
//         type="text"
//         name="name"
//         id="name"
//         value={formValues.name || ''}
//         onChange={handleFormChange}
//         required
//         className={`mt-1 block w-full border ${formErrors.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
//       />
//       {formErrors.name && <p className="mt-1 text-xs text-red-500">{formErrors.name}</p>}
//     </div>
//     <div className={formErrors.description ? 'error-field' : ''}>
//       <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descriere *</label>
//       <textarea
//         name="description"
//         id="description"
//         rows="3"
//         value={formValues.description || ''}
//         onChange={handleFormChange}
//         required
//         className={`mt-1 block w-full border ${formErrors.description ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
//       ></textarea>
//       {formErrors.description && <p className="mt-1 text-xs text-red-500">{formErrors.description}</p>}
//     </div>
//     <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 ${formErrors.price ? 'error-field' : ''}`}>
//       <div>
//         <label htmlFor="price" className="block text-sm font-medium text-gray-700">Preț (lei) *</label>
//         <input
//           type="number"
//           name="price"
//           id="price"
//           min="0.01"
//           step="0.01"
//           value={formValues.price || ''}
//           onChange={handleFormChange}
//           required
//           className={`mt-1 block w-full border ${formErrors.price ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
//         />
//         {formErrors.price && <p className="mt-1 text-xs text-red-500">{formErrors.price}</p>}
//       </div>
//     </div>
//     <div className={formErrors.category ? 'error-field' : ''}>
//       <label className="block text-sm font-medium text-gray-700">Categorii *</label>
//       <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1">
//         {category.map((cat) => (
//           <div key={cat} className="flex items-center">
//             <input
//               type="radio"
//               id={`category-${cat}`}
//               name="category"
//               value={cat}
//               checked={formValues.category === cat}
//               onChange={() => handleCategoryChange(cat)}
//               className="w-3 h-3 appearance-none bg-white border-2 border-[#96633F] rounded-full checked:bg-[#96633F] focus:ring-[#96633F]"
//               required
//             />
//             <label htmlFor={`category-${cat}`} className="ml-1 block text-xs text-gray-700">{cat}</label>
//           </div>
//         ))}
//       </div>
//       {formErrors.category && <p className="mt-1 text-xs text-red-500">{formErrors.category}</p>}
//     </div>
//     <div>
//       <label className="block text-sm font-medium text-gray-700">Caracteristici</label>
//       <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1">
//         {characteristics && characteristics.map((characteristic) => (
//           <div key={characteristic} className="flex items-center">
//             <input
//               type="checkbox"
//               id={`characteristic-${characteristic}`}
//               checked={formValues.characteristics?.includes(characteristic) || false}
//               onChange={(e) => handleCheckboxChange('characteristics', characteristic, e.target.checked)}
//               className="focus:ring-indigo-500 h-3 w-3 text-indigo-600 border-gray-300 rounded"
//             />
//             <label htmlFor={`characteristic-${characteristic}`} className="ml-1 block text-xs text-gray-700">
//               {characteristic}
//             </label>
//           </div>
//         ))}
//       </div>
//     </div>
//     <div className={formErrors.allergensText ? 'error-field' : ''}>
//       <label htmlFor="allergens" className="block text-sm font-medium text-gray-700">Alergeni *</label>
//       <textarea
//         name="allergens"
//         id="allergens"
//         rows="2"
//         value={formValues.allergensText || ''}
//         onChange={(e) => handleFormChange({
//           target: {
//             name: 'allergensText',
//             value: e.target.value
//           }
//         })}
//         required
//         placeholder="Introduceți alergenii separați prin virgulă (ex: Gluten, Ouă, Lactoza)"
//         className={`mt-1 block w-full border ${formErrors.allergensText ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
//       ></textarea>
//       {formErrors.allergensText && <p className="mt-1 text-xs text-red-500">{formErrors.allergensText}</p>}
//     </div>
//     <IngredientsSection formValues={formValues} handleFormChange={handleFormChange} formErrors={formErrors} />
//     <ImagesSection
//       formValues={formValues}
//       handleFormChange={handleFormChange}
//       previews={previews}
//       setPreviews={setPreviews}
//       formErrors={formErrors}
//     />
//   </form>
// );

// export default ModalProductForm;

// import React from 'react';
// import IngredientsSection from './ModalIngredients';
// import ImagesSection from './ModalImage';

// const ModalProductForm = ({
//   formValues,
//   handleFormChange,
//   categories,
//   characteristics,
//   formErrors,
//   handleCategoryChange,
//   handleCheckboxChange,
//   previews,
//   setPreviews,
//   handleFormSubmit,
// }) => (
//   <form onSubmit={handleFormSubmit} className="space-y-4 text-black">
//     <div className={formErrors.name ? 'error-field' : ''}>
//       <label htmlFor="name" className="block text-sm font-medium text-gray-700">
//         Nume produs *
//       </label>
//       <input
//         type="text"
//         name="name"
//         id="name"
//         value={formValues.name || ''}
//         onChange={handleFormChange}
//         required
//         className={`mt-1 block w-full border ${
//           formErrors.name ? 'border-red-500' : 'border-gray-300'
//         } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
//       />
//       {formErrors.name && (
//         <p className="mt-1 text-xs text-red-500">{formErrors.name}</p>
//       )}
//     </div>
//     <div className={formErrors.description ? 'error-field' : ''}>
//       <label
//         htmlFor="description"
//         className="block text-sm font-medium text-gray-700"
//       >
//         Descriere *
//       </label>
//       <textarea
//         name="description"
//         id="description"
//         rows="3"
//         value={formValues.description || ''}
//         onChange={handleFormChange}
//         required
//         className={`mt-1 block w-full border ${
//           formErrors.description ? 'border-red-500' : 'border-gray-300'
//         } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
//       ></textarea>
//       {formErrors.description && (
//         <p className="mt-1 text-xs text-red-500">{formErrors.description}</p>
//       )}
//     </div>
//     <div
//       className={`grid grid-cols-1 sm:grid-cols-2 gap-4 ${
//         formErrors.price ? 'error-field' : ''
//       }`}
//     >
//       <div>
//         <label
//           htmlFor="price"
//           className="block text-sm font-medium text-gray-700"
//         >
//           Preț (lei) *
//         </label>
//         <input
//           type="number"
//           name="price"
//           id="price"
//           min="0.01"
//           step="0.01"
//           value={formValues.price || ''}
//           onChange={handleFormChange}
//           required
//           className={`mt-1 block w-full border ${
//             formErrors.price ? 'border-red-500' : 'border-gray-300'
//           } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
//         />
//         {formErrors.price && (
//           <p className="mt-1 text-xs text-red-500">{formErrors.price}</p>
//         )}
//       </div>
//     </div>
//     <div className={formErrors.categories ? 'error-field' : ''}>
//       <label className="block text-sm font-medium text-gray-700">
//         Categorii *
//       </label>
//       <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1">
//         {categories.map((cat) => (
//           <div key={cat} className="flex items-center">
//             <input
//               type="checkbox"
//               id={`category-${cat}`}
//               name="categories"
//               value={cat}
//               checked={formValues.categories?.includes(cat) || false}
//               onChange={(e) => handleCategoryChange(cat, e.target.checked)}
//               className="w-3 h-3 appearance-none bg-white border-2 border-[#96633F] rounded focus:ring-[#96633F]"
//             />
//             <label
//               htmlFor={`category-${cat}`}
//               className="ml-1 block text-xs text-gray-700"
//             >
//               {cat}
//             </label>
//           </div>
//         ))}
//       </div>
//       {formErrors.categories && (
//         <p className="mt-1 text-xs text-red-500">{formErrors.categories}</p>
//       )}
//     </div>
//     <div>
//       <label className="block text-sm font-medium text-gray-700">
//         Caracteristici
//       </label>
//       <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1">
//         {characteristics &&
//           characteristics.map((characteristic) => (
//             <div key={characteristic} className="flex items-center">
//               <input
//                 type="checkbox"
//                 id={`characteristic-${characteristic}`}
//                 checked={
//                   formValues.characteristics?.includes(characteristic) || false
//                 }
//                 onChange={(e) =>
//                   handleCheckboxChange(
//                     'characteristics',
//                     characteristic,
//                     e.target.checked
//                   )
//                 }
//                 className="focus:ring-indigo-500 h-3 w-3 text-indigo-600 border-gray-300 rounded"
//               />
//               <label
//                 htmlFor={`characteristic-${characteristic}`}
//                 className="ml-1 block text-xs text-gray-700"
//               >
//                 {characteristic}
//               </label>
//             </div>
//           ))}
//       </div>
//     </div>
//     <div className={formErrors.allergensText ? 'error-field' : ''}>
//       <label
//         htmlFor="allergensText"
//         className="block text-sm font-medium text-gray-700"
//       >
//         Alergeni *
//       </label>
//       <textarea
//         name="allergensText"
//         id="allergensText"
//         rows="2"
//         value={formValues.allergensText || ''}
//         onChange={handleFormChange}
//         required
//         placeholder="Introduceți alergenii separați prin virgulă (ex: Gluten, Ouă, Lactoza)"
//         className={`mt-1 block w-full border ${
//           formErrors.allergensText ? 'border-red-500' : 'border-gray-300'
//         } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
//       ></textarea>
//       {formErrors.allergensText && (
//         <p className="mt-1 text-xs text-red-500">{formErrors.allergensText}</p>
//       )}
//     </div>
//     <IngredientsSection
//       formValues={formValues}
//       handleFormChange={handleFormChange}
//       formErrors={formErrors}
//     />
//     <ImagesSection
//       formValues={formValues}
//       handleFormChange={handleFormChange}
//       previews={previews}
//       setPreviews={setPreviews}
//       formErrors={formErrors}
//     />
//   </form>
// );

// export default ModalProductForm;

import React from 'react';
import IngredientsSection from './ModalIngredients';
import ImagesSection from './ModalImage';

const ModalProductForm = ({
  formValues,
  handleFormChange,
  categories,
  characteristics,
  formErrors,
  handleCategoryChange,
  handleCheckboxChange,
  previews,
  setPreviews,
  handleFormSubmit,
}) => (
  <form onSubmit={handleFormSubmit} className="space-y-4 text-black">
    <div className={formErrors.name ? 'error-field' : ''}>
      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
        Nume produs *
      </label>
      <input
        type="text"
        name="name"
        id="name"
        value={formValues.name || ''}
        onChange={handleFormChange}
        required
        className={`mt-1 block w-full border ${
          formErrors.name ? 'border-red-500' : 'border-gray-300'
        } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
      />
      {formErrors.name && (
        <p className="mt-1 text-xs text-red-500">{formErrors.name}</p>
      )}
    </div>
    <div className={formErrors.description ? 'error-field' : ''}>
      <label
        htmlFor="description"
        className="block text-sm font-medium text-gray-700"
      >
        Descriere *
      </label>
      <textarea
        name="description"
        id="description"
        rows="3"
        value={formValues.description || ''}
        onChange={handleFormChange}
        required
        className={`mt-1 block w-full border ${
          formErrors.description ? 'border-red-500' : 'border-gray-300'
        } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
      ></textarea>
      {formErrors.description && (
        <p className="mt-1 text-xs text-red-500">{formErrors.description}</p>
      )}
    </div>
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 gap-4 ${
        formErrors.price ? 'error-field' : ''
      }`}
    >
      <div>
        <label
          htmlFor="price"
          className="block text-sm font-medium text-gray-700"
        >
          Preț (lei) *
        </label>
        <input
          type="number"
          name="price"
          id="price"
          min="0.01"
          step="0.01"
          value={formValues.price || ''}
          onChange={handleFormChange}
          required
          className={`mt-1 block w-full border ${
            formErrors.price ? 'border-red-500' : 'border-gray-300'
          } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
        />
        {formErrors.price && (
          <p className="mt-1 text-xs text-red-500">{formErrors.price}</p>
        )}
      </div>
    </div>
    <div className={formErrors.category ? 'error-field' : ''}>
      <label className="block text-sm font-medium text-gray-700">
        Categorie *
      </label>
      <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1">
        {categories.map((cat) => (
          <div key={cat} className="flex items-center">
            <input
              type="radio"
              id={`category-${cat}`}
              name="category"
              value={cat}
              checked={formValues.category === cat}
              onChange={() => handleCategoryChange(cat)}
              className="w-3 h-3 appearance-none bg-white border-2 border-[#96633F] rounded-full checked:bg-[#96633F] focus:ring-[#96633F]"
              required
            />
            <label
              htmlFor={`category-${cat}`}
              className="ml-1 block text-xs text-gray-700"
            >
              {cat}
            </label>
          </div>
        ))}
      </div>
      {formErrors.category && (
        <p className="mt-1 text-xs text-red-500">{formErrors.category}</p>
      )}
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">
        Caracteristici
      </label>
      <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1">
        {characteristics &&
          characteristics.map((characteristic) => (
            <div key={characteristic} className="flex items-center">
              <input
                type="checkbox"
                id={`characteristic-${characteristic}`}
                checked={
                  formValues.characteristics?.includes(characteristic) || false
                }
                onChange={(e) =>
                  handleCheckboxChange(
                    'characteristics',
                    characteristic,
                    e.target.checked
                  )
                }
                className="focus:ring-indigo-500 h-3 w-3 text-indigo-600 border-gray-300 rounded"
              />
              <label
                htmlFor={`characteristic-${characteristic}`}
                className="ml-1 block text-xs text-gray-700"
              >
                {characteristic}
              </label>
            </div>
          ))}
      </div>
    </div>
    <div className={formErrors.allergensText ? 'error-field' : ''}>
      <label
        htmlFor="allergensText"
        className="block text-sm font-medium text-gray-700"
      >
        Alergeni *
      </label>
      <textarea
        name="allergensText"
        id="allergensText"
        rows="2"
        value={formValues.allergensText || ''}
        onChange={handleFormChange}
        required
        placeholder="Introduceți alergenii separați prin virgulă (ex: Gluten, Ouă, Lactoza)"
        className={`mt-1 block w-full border ${
          formErrors.allergensText ? 'border-red-500' : 'border-gray-300'
        } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
      ></textarea>
      {formErrors.allergensText && (
        <p className="mt-1 text-xs text-red-500">{formErrors.allergensText}</p>
      )}
    </div>
    <IngredientsSection
      formValues={formValues}
      handleFormChange={handleFormChange}
      formErrors={formErrors}
    />
    <ImagesSection
      formValues={formValues}
      handleFormChange={handleFormChange}
      previews={previews}
      setPreviews={setPreviews}
      formErrors={formErrors}
    />
  </form>
);

export default ModalProductForm;