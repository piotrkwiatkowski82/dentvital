import { useEffect } from 'react';

type PageKey = 'home' | 'uslugi' | 'galeria' | 'aktualnosci' | 'zespol' | 'kontakt';

const FALLBACK: Record<PageKey, { title: string; description: string }> = {
  home: { title: 'Dentvital — Klinika stomatologiczna Szczecin', description: 'Kompleksowa klinika stomatologiczna w Szczecinie.' },
  uslugi: { title: 'Usługi — Dentvital Szczecin', description: 'Oferta Dentvital: stomatologia, implantologia, ortodoncja i więcej.' },
  galeria: { title: 'Galeria — Dentvital Szczecin', description: 'Zdjęcia gabinetów i zespołu kliniki Dentvital.' },
  aktualnosci: { title: 'Aktualności — Dentvital Szczecin', description: 'Najnowsze informacje z kliniki Dentvital.' },
  zespol: { title: 'Nasz zespół — Dentvital Szczecin', description: 'Specjaliści kliniki Dentvital w Szczecinie.' },
  kontakt: { title: 'Kontakt — Dentvital Szczecin', description: 'Kontakt z kliniką Dentvital — adres, telefon, formularz.' },
};

let seoCache: Record<string, { title: string; description: string }> | null = null;
let seoFetchPromise: Promise<void> | null = null;

function fetchSEO(): Promise<void> {
  if (seoFetchPromise) return seoFetchPromise;
  seoFetchPromise = fetch('/api/settings/seo')
    .then((r) => r.json())
    .then((data) => { seoCache = JSON.parse(data.value); })
    .catch(() => {});
  return seoFetchPromise;
}

export function useSEO(page: PageKey): void {
  useEffect(() => {
    fetchSEO().then(() => {
      const meta = seoCache?.[page] ?? FALLBACK[page];
      document.title = meta.title;
      let el = document.querySelector<HTMLMetaElement>('meta[name="description"]');
      if (!el) {
        el = document.createElement('meta');
        el.name = 'description';
        document.head.appendChild(el);
      }
      el.content = meta.description;
    });
  }, [page]);
}
