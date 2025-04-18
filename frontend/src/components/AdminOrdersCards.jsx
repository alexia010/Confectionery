import OrderCard from './ui/OrderCard';

const OrdersCards = ({ orders, handleEditOrder, handleShowOrderDetails }) => (
  <div className="space-y-4">
    {orders.map((order) => (
      <OrderCard
        key={order.id}
        order={order}
        handleEditOrder={handleEditOrder}
        handleShowOrderDetails={handleShowOrderDetails}
      />
    ))}
  </div>
);

export default OrdersCards;