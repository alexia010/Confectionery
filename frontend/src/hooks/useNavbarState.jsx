import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Custom hook pentru a gestiona starea navbar-ului (transparentă/solidă)
 * @param {number} scrollThreshold - Pragul de scroll (în px) după care navbar-ul nu mai este transparent
 * @returns {object} - Starea navbar-ului
 */
export const useNavbarState = (scrollThreshold = 100) => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Verifică dacă este pagina home
  const isHomePage = location.pathname === '/' || location.pathname === '/home' || location.pathname === '/acasa';
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > scrollThreshold);
    };

    // Adaugă event listener pentru scroll
    window.addEventListener('scroll', handleScroll);
    
    // Verifică imediat poziția scroll-ului la montare sau schimbare de rută
    handleScroll();

    // Curăță event listener-ul la demontare
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollThreshold, location.pathname]);

  // Calculează dacă navbar-ul ar trebui să fie transparent
  // - transparent doar pe pagina home și când nu s-a dat scroll
  // - solid în toate celelalte cazuri
  const shouldBeTransparent = isHomePage && !isScrolled;

  return {
    isScrolled,
    isHomePage,
    shouldBeTransparent
  };
};

export default useNavbarState;