// services/dashboardService.js
import { dashboardEndpoints } from './api/endpoints';

class DashboardService {
  /**
   * Obține statisticile principale pentru dashboard
   */
  async getStats() {
    try {
      const response = await dashboardEndpoints.getStats();
      return response.data;
    } catch (error) {
      console.error('Eroare la obținerea statisticilor:', error);
      throw error;
    }
  }

  /**
   * Obține datele de vânzări pentru perioada specificată
   * @param {string} period - Perioada pentru date (week, month, 6months, year)
   */
  async getSalesData(period = 'month') {
    try {
      const response = await dashboardEndpoints.getSalesData(period);
      return response.data;
    } catch (error) {
      console.error('Eroare la obținerea datelor de vânzări:', error);
      throw error;
    }
  }

  /**
   * Obține distribuția vânzărilor pe categorii
   */
  async getSalesDistribution() {
    try {
      const response = await dashboardEndpoints.getSalesDistribution();
      return response.data;
    } catch (error) {
      console.error('Eroare la obținerea distribuției vânzărilor:', error);
      throw error;
    }
  }

  /**
   * Obține ultimele comenzi
   * @param {number} limit - Numărul de comenzi de returnat
   */
  async getRecentOrders(limit = 5) {
    try {
      const response = await dashboardEndpoints.getRecentOrders(limit);
      return response.data;
    } catch (error) {
      console.error('Eroare la obținerea comenzilor recente:', error);
      throw error;
    }
  }

  /**
   * Obține produsele cele mai vândute
//    * @param {number} limit - Numărul de produse de returnat
//    */
//   async getTopProducts(limit = 5) {
//     try {
//       const response = await dashboardEndpoints.getTopProducts(limit);
//       return response.data;
//     } catch (error) {
//       console.error('Eroare la obținerea produselor de top:', error);
//       throw error;
//     }
//   }

  /**
   * Obține toate datele pentru dashboard
   * Metodă utilă pentru încărcarea inițială a tuturor datelor
   */
  async getAllDashboardData(salesPeriod = 'month', ordersLimit = 5, productsLimit = 5) {
    try {
      const [stats, salesData, distributionData, recentOrders, topProducts] = await Promise.all([
        this.getStats(),
        this.getSalesData(salesPeriod),
        this.getSalesDistribution(),
        this.getRecentOrders(ordersLimit),
        this.getTopProducts(productsLimit)
      ]);

      return {
        stats,
        salesData,
        distributionData,
        recentOrders,
        topProducts
      };
    } catch (error) {
      console.error('Eroare la obținerea datelor pentru dashboard:', error);
      throw error;
    }
  }
}

export default new DashboardService();