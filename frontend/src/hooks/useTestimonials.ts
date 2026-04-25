import { useEffect, useState } from 'react';

export interface Testimonial {
  id: string;
  author_name: string;
  author_title: string;
  content: string;
  rating: number;
}

const FALLBACK: Testimonial[] = [
  { id: '1', author_name: 'Agnieszka W.', author_title: 'Pacjentka od 3 lat', content: 'Jestem pod wrażeniem profesjonalizmu całego zespołu. Leczenie implantologiczne przebiegło bez bólu, a efekt przerósł moje oczekiwania. Polecam z całego serca!', rating: 5 },
  { id: '2', author_name: 'Tomasz K.', author_title: 'Pacjent od 2 lat', content: 'Przyszedłem ze sporą tremą przed implantami. Lekarz wytłumaczył każdy krok, a sama procedura była szybsza niż myślałem. Teraz nie wyobrażam sobie innej kliniki.', rating: 5 },
  { id: '3', author_name: 'Marta L.', author_title: 'Pacjentka', content: 'Córka chodziła tu na ortodoncję, a ja na fizjoterapię szczęki. Kompleksowe podejście robi różnicę — wszystko skoordynowane w jednym miejscu. Świetny kontakt z personelem.', rating: 5 },
  { id: '4', author_name: 'Piotr N.', author_title: 'Pacjent od roku', content: 'Higienizacja wykonana bardzo dokładnie, bez dyskomfortu. Na każdej wizycie dostaje rzetelne informacje o stanie zębów. Nareszcie klinika, gdzie czuć, że pacjent jest na pierwszym miejscu.', rating: 5 },
];

export function useTestimonials(): Testimonial[] {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(FALLBACK);

  useEffect(() => {
    fetch('/api/testimonials')
      .then((r) => r.json())
      .then((data) => { if (data.items?.length) setTestimonials(data.items); })
      .catch(() => {});
  }, []);

  return testimonials;
}
