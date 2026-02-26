import { useEffect } from 'react';

export function useScrolledHeader(headerId = 'site-header') {
  useEffect(() => {
    const header = document.getElementById(headerId);
    if (!header) return;

    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 10);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, [headerId]);
}
