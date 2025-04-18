import mongoose from 'mongoose';
import Order from '../models/order.model.js';
import User from '../models/user.model.js'
import { v4 as uuidv4 } from 'uuid';

// Creare comandă nouă
export const createOrder = async (req, res) => {
  try {
    const orderData = req.body;
    
    console.log('order data');
    console.log(orderData);
    // Validare date obligatorii pentru comandă
    if (!orderData.customerInfo || !orderData.shippingInfo) {
      return res.status(400).json({ message: 'Customer and shipping information are required' });
    }

    console.log('aici 2');
    // Adaugă userId sau guestId
    if (req.user) {
      orderData.userId = req.user._id;
    } else {
      orderData.guestId = req.guestId || uuidv4();
    }

    // Validare items
    if (!orderData.items || orderData.items.length === 0) {
      return res.status(400).json({ message: 'Order must contain at least one item' });
    }

    // Creare comandă nouă
    const newOrder = new Order(orderData);
    await newOrder.save();

    console.log('aici 2');

    res.status(201).json({
      message: 'Order created successfully',
      order: {
        _id: newOrder._id,
        orderNumber: newOrder.orderNumber
      }
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ 
      message: 'Error creating order', 
      error: error.message 
    });
  }
};

// Preluare comenzi pentru utilizatorul autentificat
export const getUserOrders = async (req, res) => {
  try {
    // Verifică dacă utilizatorul este autentificat
    if (!req.user) {
      return res.status(403).json({ 
        message: 'Authentication required to view orders' 
      });
    }

    // Caută comenzile pentru utilizatorul autentificat
    const orders = await Order.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .lean({virtuals: true});

    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching user orders:', error);
    res.status(500).json({ 
      message: 'Error fetching user orders', 
      error: error.message 
    });
  }
};

// Preluare comandă după ID
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validare ID MongoDB
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid order ID' });
    }

    // Caută comanda
    const order = await Order.findById(id).lean();

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Verificări de securitate
    // Pentru utilizatori autentificați
    if (req.user) {
      // Verifică dacă comanda aparține utilizatorului
      if (order.userId && order.userId.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Unauthorized to view this order' });
      }
    } 
    // Pentru guest
    else {
      // Dacă nu e utilizator autentificat, nu permite accesul decât dacă are guestId
      return res.status(403).json({ message: 'Unauthorized to view this order' });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ 
      message: 'Error fetching order', 
      error: error.message 
    });
  }
};

// Metodă pentru administrație - preluare toate comenzile
export const getAllOrders = async (req, res) => {
  try {
    // Verifică dacă utilizatorul este admin
    console.log(req.userId);
    const user = await User.findById(req.userId);

    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    // Parametri pentru filtrare și paginare
    const { 
      page = 1, 
      limit = 10, 
      status, 
      startDate, 
      endDate 
    } = req.query;

    // Construiește filtru
    const filter = {};
    if (status) filter.status = status;
    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate);
      if (endDate) filter.createdAt.$lte = new Date(endDate);
    }

    // Opțiuni pentru paginare și sortare
    const options = {
      sort: { createdAt: -1 },
      limit: parseInt(limit),
      skip: (page - 1) * limit
    };

    // Preluare comenzi și număr total
    const [orders, total] = await Promise.all([
      Order.find(filter, null, options).lean(),
      Order.countDocuments(filter)
    ]);

    res.status(200).json({
      orders,
      totalOrders: total,
      currentPage: page,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ 
      message: 'Error fetching orders', 
      error: error.message 
    });
  }
};

// Actualizare status comandă (doar pentru admin)
export const updateOrderStatus = async (req, res) => {
  try {
    // Verifică dacă utilizatorul este admin
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const { id } = req.params;
    const { status } = req.body;

    // Validare ID MongoDB
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid order ID' });
    }

    // Actualizare comandă
    const order = await Order.findByIdAndUpdate(
      id, 
      { 
        status, 
        updatedAt: new Date() 
      }, 
      { 
        new: true,  // Returnează documentul actualizat
        runValidators: true  // Validează noul status
      }
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({
      message: 'Order status updated successfully',
      order
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ 
      message: 'Error updating order status', 
      error: error.message 
    });
  }
};


export const updateOrder = async (req, res) => {
  try {
    console.log(req.body);
    const { orderId } = req.params;
    const { status, customerInfo, shippingInfo, cancellationReason } = req.body;
    
    const order = await Order.findById(orderId);
    
    if (!order) {
      return res.status(404).json({ success: false, message: 'Comanda nu a fost găsită' });
    }
    
    // Actualizăm statusul (obligatoriu)
    if (status) {
      order.status = status;
    }
    
    // Actualizăm telefonul clientului (opțional)
    if (customerInfo && customerInfo.phone) {
      // Presupunem că structure modelului Order are un câmp nested customerInfo
      order.customerInfo.phone = customerInfo.phone;
    }
    
    // Actualizăm adresa de livrare (opțional)
    if (shippingInfo && shippingInfo.address&& shippingInfo.city&&shippingInfo.county) {
      // Presupunem că structure modelului Order are un câmp nested shippingInfo
      order.shippingInfo.address = shippingInfo.address;
      order.shippingInfo.city=shippingInfo.city;
      order.shippingInfo.county=shippingInfo.county;
    }
    
  
    if(shippingInfo && shippingInfo.postalCode)
      {
        // Asigură-te că order.shippingInfo există înainte de a-i atribui proprietăți
        if (!order.shippingInfo) {
          order.shippingInfo = {};
        }
        order.shippingInfo.postalCode = shippingInfo.postalCode;
      }

    // Actualizăm motivul anulării (opțional)
    if (status === 'Anulată' && cancellationReason !== undefined) {
      order.cancellationReason = cancellationReason;
    }
    
    console.log(order);
    await order.save();
    
    return res.status(200).json({ 
      success: true, 
      message: 'Comanda a fost actualizată cu succes',
      order
    });
    
  } catch (error) {
    console.error('Eroare la actualizarea comenzii:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'A apărut o eroare la actualizarea comenzii' 
    });
  }
};