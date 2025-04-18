/**
 * Formats an array of ingredient objects into a readable string
 * @param {Array} ingredients - Array of ingredient objects with name, quantity, unit
 * @param {Object} options - Formatting options
 * @param {boolean} options.includeQuantities - Whether to include quantities and units
 * @param {string} options.separator - Separator between ingredients
 * @returns {string} Formatted ingredients string
 */
export const formatIngredients = (ingredients, options = {}) => {
    const { 
      includeQuantities = false, 
      separator = ', ' 
    } = options;
    
    // Handle empty or invalid input
    if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
      return '';
    }
    
    // Format each ingredient based on options
    return ingredients.map(ingredient => {
      if (typeof ingredient === 'string') return ingredient;
      
      if (includeQuantities && ingredient.quantity && ingredient.unit) {
        return `${ingredient.name} (${ingredient.quantity} ${ingredient.unit})`;
      }
      
      return ingredient.name || '';
    }).filter(text => text).join(separator);
  };
  
  /**
   * Gets just the names of ingredients as a comma-separated string
   * @param {Array} ingredients - Array of ingredient objects
   * @returns {string} Comma-separated ingredient names
   */
  export const getIngredientNames = (ingredients) => {
    return formatIngredients(ingredients, { includeQuantities: false });
  };
  
  /**
   * Gets full ingredient details including quantities
   * @param {Array} ingredients - Array of ingredient objects
   * @returns {string} Formatted ingredients with quantities
   */
  export const getIngredientDetails = (ingredients) => {
    return formatIngredients(ingredients, { includeQuantities: true });
  };
  
  export const formatPrice = (price, options = {}) => {
    const {
      currency = 'lei',
      spaceBeforeCurrency = true,
      decimals = 2
    } = options;
    
    // Handle invalid input
    if (price === null || price === undefined || isNaN(Number(price))) {
      return '';
    }
    
    // Format the number
    const formattedPrice = Number(price).toFixed(decimals);
    
    // Add currency
    return spaceBeforeCurrency 
      ? `${formattedPrice} ${currency}`
      : `${formattedPrice}${currency}`;
  };

  export default {
    formatIngredients,
    getIngredientNames,
    getIngredientDetails,
    formatPrice
  };