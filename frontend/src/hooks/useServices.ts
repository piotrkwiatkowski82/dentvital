import { useEffect, useState } from 'react';

export interface ApiService {
  id: string;
  title: string;
  icon: string;
  description: string;
  sort_order: number;
}

const FALLBACK: ApiService[] = [
  { id: '1', title: 'Konsultacje i planowanie', icon: 'search', description: 'Cyfrowe skanery, RTG i analiza uśmiechu — dokładna diagnostyka przed rozpoczęciem leczenia.', sort_order: 0 },
  { id: '2', title: 'Stomatologia estetyczna', icon: 'sparkle', description: 'Licówki, odbudowy kompozytowe i bonding dla harmonijnego uśmiechu.', sort_order: 1 },
  { id: '3', title: 'Implantologia & protetyka', icon: 'shield', description: 'Implanty w technologii CAD/CAM oraz prace protetyczne wykonywane w naszym laboratorium.', sort_order: 2 },
  { id: '4', title: 'Profilaktyka i higienizacja', icon: 'pulse', description: 'Skaling ultradźwiękowy, piaskowanie i instruktaż domowej pielęgnacji.', sort_order: 3 },
  { id: '5', title: 'Chirurgia i endodoncja', icon: 'sun', description: 'Precyzyjne zabiegi mikroskopowe, leczenie kanałowe i regeneracja tkanek.', sort_order: 4 },
  { id: '6', title: 'Opieka rodzinna', icon: 'users', description: 'Wizyty adaptacyjne, logopedia i fizjoterapia stomatologiczna w jednym miejscu.', sort_order: 5 },
];

export function useServices(): ApiService[] {
  const [services, setServices] = useState<ApiService[]>(FALLBACK);

  useEffect(() => {
    fetch('/api/services')
      .then((r) => r.json())
      .then((data) => { if (data.items?.length) setServices(data.items); })
      .catch(() => {});
  }, []);

  return services;
}
