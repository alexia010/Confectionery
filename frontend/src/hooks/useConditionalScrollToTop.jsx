import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

/**
 * Hook care resetează scroll-ul condițional bazat pe tipul de rută
 * @param {Object} options - Opțiuni de configurare
 * @param {Array} options.resetPaths - Rute către care navigarea va reseta scroll-ul
 * @param {Array} options.preservePaths - Rute către care navigarea va păstra poziția scroll-ului
 */
export const useConditionalScrollToTop = (options = {}) => {
  const { pathname, state } = useLocation();
  const navType = useNavigationType(); // 'POP', 'PUSH', sau 'REPLACE'
  
  const { 
    resetPaths = [],     // Rute care vor reseta scroll-ul când navigăm către ele
    preservePaths = [],  // Rute care vor păstra scroll-ul când navigăm către ele
  } = options;

  useEffect(() => {
    // Dacă navigăm către o rută în resetPaths, sau dacă NU navigăm către o rută în preservePaths
    const shouldResetScroll = resetPaths.some(path => pathname.includes(path)) || 
                             (preservePaths.length > 0 && !preservePaths.some(path => pathname.includes(path)));
    
    // Override dacă starea include o proprietate explictă preserveScroll
    const statePreserveScroll = state && state.preserveScroll === true;
    
    // Dacă este un "POP" (înapoi/înainte) și nu avem override, păstrează scroll-ul
    if (navType === 'POP' && !resetPaths.some(path => pathname.includes(path))) {
      return;
    }
    
    // Resetează scroll-ul doar dacă trebuie
    if (shouldResetScroll && !statePreserveScroll) {
      window.scrollTo(0, 0);
    }
  }, [pathname, state, navType, resetPaths, preservePaths]);
};