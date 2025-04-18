const ItemsPerPageSelector = ({ itemsPerPage, handleItemsPerPageChange }) => (
    <div className="flex items-center">
      <label htmlFor="itemsPerPage" className="text-sm text-gray-600 mr-2">Afișează:</label>
      <select
        id="itemsPerPage"
        value={itemsPerPage}
        onChange={handleItemsPerPageChange}
        className="px-3 py-2 border text-black border-gray-300 rounded-md text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      >
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select>
    </div>
  );
  
  export default ItemsPerPageSelector;