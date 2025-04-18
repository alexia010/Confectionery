// constants.js
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);

// Obține directorul fișierului curent
const __dirname = path.dirname(__filename);

const constants = {
    // Durate de timp (în milisecunde)
    ONE_MINUTE_IN_MS: 60 * 1000,
    FIFTEEN_MINUTES_IN_MS: 15 * 60 * 1000,
    ONE_DAY_IN_MS: 24 * 60 * 60 * 1000,
    SEVEN_DAYS_IN_MS: 7 * 24 * 60 * 60 * 1000,
  
    // Configurare Multer
    MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
    MAX_IMAGES_PER_PRODUCT: 5, // Numărul maxim de imagini per produs
    IMAGE_UPLOADS_DIR: path.join(__dirname, '../imageUpload'),
    UPLOADS_DIR: 'uploads/',
  
    // Configurare JWT și cookie
    JWT_EXPIRES_IN: '7d',
    COOKIE_MAX_AGE: 7 * 24 * 60 * 60 * 1000,//7ZILE
  
    // Configurare cod de verificare
    VERIFICATION_CODE_LENGTH: 6,
  
    // Configurare produs
    MAX_PRODUCT_NAME_LENGTH: 100,
    MAX_DESCRIPTION_LENGTH: 500,
  };
  
  export default constants;