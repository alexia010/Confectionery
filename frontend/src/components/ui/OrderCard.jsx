const OrderCard = ({ order, handleEditOrder, handleShowOrderDetails }) => (
  <div className="bg-white rounded-lg shadow-sm p-4 mb-4 border border-gray-200">
    <div className="flex justify-between items-start mb-3">
      <h3 className="font-medium text-indigo-600">{order.id}</h3>
      <span
        className={`
          px-2 py-1 text-xs font-semibold rounded-full
          ${order.status === 'Livrată' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
        `}
      >
        {order.status}
      </span>
    </div>
    <p className="text-sm text-gray-700 mb-1"><span className="font-medium">Client:</span> {order.client}</p>
    <p className="text-sm text-gray-700 mb-1"><span className="font-medium">Data:</span> {order.data}</p>
    <p className="text-sm text-gray-700 mb-3"><span className="font-medium">Suma:</span> {order.suma} RON</p>
    <div className="flex justify-end space-x-2 mt-2">
      <button
        className="px-3 py-1 bg-gray-100 text-gray-600 rounded-md text-sm hover:bg-gray-200 flex items-center"
        onClick={() => handleShowOrderDetails(order)}
      >
        <svg /* ... icon view ... */ />
        Detalii
      </button>
      <button
        className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-md text-sm hover:bg-indigo-200 flex items-center"
        onClick={() => handleEditOrder(order)}
      >
        <svg /* ... icon edit ... */ />
        Editează
      </button>
    </div>
  </div>
);

export default OrderCard;