import { useState, useEffect } from 'react';

// Hook pentru a determina dimensiunea ferestrei
export const useWindowSize = () => {
  // Starea inițială trebuie setată cu undefined pentru a preveni SSR mismatch
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  
  useEffect(() => {
    // Funcție pentru actualizarea dimensiunilor
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    
    // Adaugă event listener pentru resize
    window.addEventListener('resize', handleResize);
    
    // Apelează handleResize imediat pentru a seta starea inițială
    handleResize();
    
    // Curăță event listener la unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Rulează o singură dată la montare

  return windowSize;
};

export default useWindowSize;