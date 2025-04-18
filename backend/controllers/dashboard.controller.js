// controllers/dashboardController.js
import Order from '../models/order.model.js';
import Product from '../models/product.model.js';
import User from '../models/user.model.js';
import moment from 'moment';

// Obține statisticile principale pentru dashboard
export const getStats = async (req, res) => {
  try {
    // Calculăm datele pentru luna curentă
    const today = moment();
    const startOfMonth = moment().startOf('month');
    const endOfMonth = moment().endOf('month');

    // Obține comenzile din luna curentă
    const currentMonthOrders = await Order.find({
      createdAt: { $gte: startOfMonth.toDate(), $lte: endOfMonth.toDate() }
    });

    // Calculează valorile pentru statistici
    const currentMonthSales = currentMonthOrders.reduce((sum, order) => sum + order.total, 0);

    // Obține numărul de utilizatori noi din luna curentă
    const newUsers = await User.countDocuments({
      createdAt: { $gte: startOfMonth.toDate(), $lte: endOfMonth.toDate() }
    });

    // Obține numărul total de produse în stoc
    const productsInStock = await Product.aggregate([
      { $group: { _id: null, total: { $sum: "$stock" } } }
    ]);

    // Calculează vânzările totale de la începutul anului
    const startOfYear = moment().startOf('year');
    const ordersThisYear = await Order.find({
      createdAt: { $gte: startOfYear.toDate() }
    });
    const totalSalesThisYear = ordersThisYear.reduce((sum, order) => sum + order.total, 0);

    // Crează obiectul de statistici
    const stats = {
      totalVanzari: totalSalesThisYear,
      vanzariLunaCurenta: currentMonthSales,
      comenziNoi: currentMonthOrders.length,
      utilizatoriNoi: newUsers,
      produseStoc: productsInStock.length > 0 ? productsInStock[0].total : 0
    };

    res.status(200).json(stats);
  } catch (error) {
    console.error('Eroare la obținerea statisticilor:', error);
    res.status(500).json({ message: 'Eroare la obținerea statisticilor' });
  }
};


const SALES_TARGETS = {
  // Targete pentru 2024
  "2024-01": 1200,
  "2024-02": 1250,
  "2024-03": 1300,
  "2024-04": 1400,
  "2024-05": 1500,
  "2024-06": 1600,
  "2024-07": 1000,
  "2024-08": 1400,
  "2024-09": 1000,
  "2024-10": 1800,
  "2024-11": 2000,
  "2024-12": 2500,
  
  // Targete pentru 2025
  "2025-01": 1500,
  "2025-02": 1600,
  "2025-03": 1700,
  "2025-04": 1800,
  "2025-05": 1900,
  "2025-06": 2000,
  "2025-07": 1900,
  "2025-08": 1500,
  "2025-09": 2000,
  "2025-10": 2200,
  "2025-11": 2500,
  "2025-12": 3000,
};

// Obține datele pentru graficul de vânzări
export const getSalesData = async (req, res) => {
  try {
    const { period = '6months' } = req.query; // Valoare implicită: 6 luni
    let startDate, endDate;

    // Configurăm perioada pentru grafic - doar 6 luni sau 1 an
    if (period === 'year') {
      startDate = moment().subtract(1, 'year').startOf('month');
      endDate = moment().endOf('month');
    } else {
      // Implicit - 6 luni
      startDate = moment().subtract(6, 'months').startOf('month');
      endDate = moment().endOf('month');
    }

    console.log(`Generăm date pentru perioada: ${period}, de la ${startDate.format('YYYY-MM-DD')} până la ${endDate.format('YYYY-MM-DD')}`);

    // Obținem vânzările agregate pe luni, calculând suma din items
    const salesData = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate.toDate(), $lte: endDate.toDate() },
          status: { $ne: 'Anulată' }
        }
      },
      {
        // Calculează subtotal pentru fiecare comandă
        $addFields: {
          calculatedSubtotal: {
            $reduce: {
              input: "$items",
              initialValue: 0,
              in: {
                $add: ["$$value", { $multiply: ["$$this.price", "$$this.quantity"] }]
              }
            }
          }
        }
      },
      {
        // Calculează totalul final pentru comandă
        $addFields: {
          calculatedTotal: {
            $subtract: [
              { $add: ["$calculatedSubtotal", { $ifNull: ["$shipping", 0] }] },
              { $ifNull: ["$discount", 0] }
            ]
          }
        }
      },
      {
        // Grupează pe luni
        $group: {
          _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
          vanzari: { $sum: "$calculatedTotal" },
          comenzi: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    // Formăm array-ul de date pentru grafic
    let formattedData = [];
    
    // Generăm toate lunile pentru interval, chiar dacă nu există date
    let current = startDate.clone();
    while (current <= endDate) {
      const dateKey = current.format('YYYY-MM');
      
      // Căutăm datele pentru luna curentă
      const dataForMonth = salesData.find(item => item._id === dateKey);
      
      // Obținem targetul pentru luna curentă din obiectul SALES_TARGETS
      // Dacă nu există un target definit, folosim 0 sau o valoare calculată
      const target = SALES_TARGETS[dateKey] || 0;
      
      // Adăugăm datele în array
      formattedData.push({
        name: current.format('MMM'),          // Luna în format scurt (ex: "Apr")
        an: current.format('YYYY'),           // Anul (ex: "2025")
        vanzari: dataForMonth ? dataForMonth.vanzari : 0,  // Valoarea totală a vânzărilor
        comenzi: dataForMonth ? dataForMonth.comenzi : 0,  // Numărul de comenzi
        target: target                       // Target personalizat pentru luna respectivă
      });
      
      // Trecem la luna următoare
      current.add(1, 'months');
    }
    
    res.status(200).json(formattedData);
  } catch (error) {
    console.error('Eroare la obținerea datelor de vânzări:', error);
    res.status(500).json({ message: 'Eroare la obținerea datelor de vânzări' });
  }
};
// // Obține distribuția vânzărilor pe categorii
// export const getSalesDistribution = async (req, res) => {
//   try {
//     // Obține toate comenzile din ultima lună (pentru a calcula distribuția)
//     const startOfMonth = moment().subtract(1, 'month').toDate();
//     const endOfMonth = moment().toDate();
    
//     // Agregate pentru a obține vânzările pe categorii
//     const orderItems = await Order.aggregate([
//       {
//         $match: {
//           createdAt: { $gte: startOfMonth, $lte: endOfMonth },
//           status: { $ne: 'Anulată' }
//         }
//       },
//       {
//         $unwind: '$items'
//       },
//       {
//         $lookup: {
//           from: 'products',
//           localField: 'items.productId',
//           foreignField: '_id',
//           as: 'productDetails'
//         }
//       },
//       {
//         $unwind: '$productDetails'
//       },
//       {
//         $group: {
//           _id: '$productDetails.category',
//           value: { $sum: { $multiply: ['$items.price', '$items.quantity'] } }
//         }
//       },
//       {
//         $project: {
//           _id: 0,
//           name: '$_id',
//           value: 1
//         }
//       },
//       {
//         $sort: { value: -1 }
//       }
//     ]);
    
//     res.status(200).json(orderItems);
//   } catch (error) {
//     console.error('Eroare la obținerea distribuției vânzărilor:', error);
//     res.status(500).json({ message: 'Eroare la obținerea distribuției vânzărilor' });
//   }
// };

// Obține distribuția vânzărilor pe categorii
export const getSalesDistribution = async (req, res) => {
  try {
    // Obține toate comenzile din ultima lună (pentru a calcula distribuția)
    const startOfMonth = moment().subtract(1, 'month').toDate();
    const endOfMonth = moment().toDate();
    
    // Agregate pentru a obține vânzările pe categorii
    const orderItems = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfMonth, $lte: endOfMonth },
          status: { $ne: 'Anulată' }
        }
      },
      {
        $unwind: '$items'
      },
      {
        $lookup: {
          from: 'products',
          localField: 'items.productId',
          foreignField: '_id',
          as: 'productDetails'
        }
      },
      {
        $unwind: '$productDetails'
      },
      {
        $group: {
          _id: '$productDetails.category',
          value: { $sum: { $multiply: ['$items.price', '$items.quantity'] } }
        }
      },
      {
        $project: {
          _id: 0,
          name: '$_id',
          value: 1
        }
      },
      {
        $sort: { value: -1 }
      }
    ]);
    
    // Calculăm suma totală pentru a determina procentajele
    const totalValue = orderItems.reduce((sum, item) => sum + item.value, 0);
    
    // Dacă nu există vânzări, returnăm un array gol
    if (totalValue === 0) {
      return res.status(200).json([]);
    }
    
    // Transformăm valorile în procentaje (din total 100%)
    const percentageItems = orderItems.map(item => ({
      name: item.name || 'Necategorizat',
      value: Math.round((item.value / totalValue) * 100),
      rawValue: item.value // Păstrăm și valoarea brută pentru referință, dacă e nevoie
    }));
    
    // Verificăm dacă suma procentelor este exact 100 (pentru a evita erori de rotunjire)
    const totalPercentage = percentageItems.reduce((sum, item) => sum + item.value, 0);
    
    // Dacă suma nu este exact 100 din cauza rotunjirilor, ajustăm ultima categorie
    if (totalPercentage !== 100 && percentageItems.length > 0) {
      const diff = 100 - totalPercentage;
      percentageItems[percentageItems.length - 1].value += diff;
    }
    
    // Adăugăm un log pentru verificare
    console.log(`Distribuție vânzări (${percentageItems.length} categorii):`, 
      percentageItems.map(i => `${i.name}: ${i.value}%`).join(', '));
    
    res.status(200).json(percentageItems);
  } catch (error) {
    console.error('Eroare la obținerea distribuției vânzărilor:', error);
    res.status(500).json({ message: 'Eroare la obținerea distribuției vânzărilor' });
  }
};

// Obține ultimele comenzi
export const getRecentOrders = async (req, res) => {
  try {
    const { limit = 5 } = req.query;
    
    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .lean();
  
    
    res.status(200).json(recentOrders);
  } catch (error) {
    console.error('Eroare la obținerea comenzilor recente:', error);
    res.status(500).json({ message: 'Eroare la obținerea comenzilor recente' });
  }
};
