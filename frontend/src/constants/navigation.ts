export interface NavChild {
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  href?: string;
  children?: NavChild[];
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Strona główna', href: '/' },
  {
    label: 'O nas',
    children: [
      { label: 'Zespół', href: '/o-nas/zespol' },
      { label: 'Certyfikaty', href: '/o-nas/certyfikaty' },
      { label: 'Szczecińska Karta Rodzinna', href: '/o-nas/szczecinska-karta-rodzinna' },
    ],
  },
  {
    label: 'Oferta',
    children: [
      { label: 'Protetyka', href: '/oferta/protetyka' },
      { label: 'Stomatologia zachowawcza', href: '/oferta/stomatologia-zachowawcza' },
      { label: 'Stomatologia estetyczna', href: '/oferta/stomatologia-estetyczna' },
      { label: 'Chirurgia stomatologiczna', href: '/oferta/chirurgia-stomatologiczna' },
      { label: 'Implantologia', href: '/oferta/implantologia' },
      { label: 'Ortodoncja', href: '/oferta/ortodoncja' },
      { label: 'Fizjoterapia', href: '/fizjoterapia' },
      { label: 'Radiowizjografia i RTG', href: '/oferta/radiowizjografia-rtg' },
    ],
  },
  { label: 'Galeria', href: '/galeria' },
  { label: 'Aktualności', href: '/aktualnosci' },
  { label: 'Kontakt', href: '/kontakt' },
];

// Flat list for Footer quick links
export const NAV_LINKS_FLAT = NAV_ITEMS.flatMap((item) =>
  item.href ? [{ label: item.label, href: item.href }] : (item.children ?? [])
);

// Legacy alias kept for backwards compatibility
export const NAV_LINKS = NAV_ITEMS;
