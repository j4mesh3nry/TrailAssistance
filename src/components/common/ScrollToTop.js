import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    try {
      window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
    } catch {
      window.scrollTo(0, 0);
    }
  }, [pathname]);
  return null;
};

export default ScrollToTop;
