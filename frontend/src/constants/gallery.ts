export type GalleryCategory = 'gabinety' | 'zespol' | 'zabiegi';

export interface GalleryImage {
  src: string;
  alt: string;
  category: GalleryCategory;
  caption?: string;
}

// TODO: Replace all Pexels placeholders with actual clinic photos from dentvital.pl/galeria/
export const GALLERY_IMAGES: GalleryImage[] = [
  // Gabinety
  {
    src: 'https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Gabinet stomatologiczny Dentvital',
    category: 'gabinety',
    caption: 'Gabinet stomatologiczny',
  },
  {
    src: 'https://images.pexels.com/photos/3845126/pexels-photo-3845126.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Nowoczesne wyposażenie gabinetu',
    category: 'gabinety',
    caption: 'Nowoczesne wyposażenie',
  },
  {
    src: 'https://images.pexels.com/photos/305568/pexels-photo-305568.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Poczekalnią kliniki Dentvital',
    category: 'gabinety',
    caption: 'Poczekalnia',
  },
  {
    src: 'https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Recepcja kliniki',
    category: 'gabinety',
    caption: 'Recepcja',
  },
  {
    src: 'https://images.pexels.com/photos/4687360/pexels-photo-4687360.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Gabinet fizjoterapii',
    category: 'gabinety',
    caption: 'Gabinet fizjoterapii',
  },
  // Zespół
  {
    src: 'https://images.pexels.com/photos/6812464/pexels-photo-6812464.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Zespół kliniki Dentvital',
    category: 'zespol',
    caption: 'Nasz zespół',
  },
  {
    src: 'https://images.pexels.com/photos/5214999/pexels-photo-5214999.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Stomatolog podczas konsultacji',
    category: 'zespol',
    caption: 'Konsultacja stomatologiczna',
  },
  {
    src: 'https://images.pexels.com/photos/5473182/pexels-photo-5473182.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Fizjoterapeuta podczas terapii',
    category: 'zespol',
    caption: 'Fizjoterapia',
  },
  {
    src: 'https://images.pexels.com/photos/4498606/pexels-photo-4498606.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Trening medyczny',
    category: 'zespol',
    caption: 'Trening medyczny',
  },
  // Zabiegi
  {
    src: 'https://images.pexels.com/photos/3779705/pexels-photo-3779705.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Zabieg stomatologiczny',
    category: 'zabiegi',
    caption: 'Leczenie stomatologiczne',
  },
  {
    src: 'https://images.pexels.com/photos/3845811/pexels-photo-3845811.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Diagnostyka RTG',
    category: 'zabiegi',
    caption: 'Diagnostyka cyfrowa',
  },
  {
    src: 'https://images.pexels.com/photos/6627639/pexels-photo-6627639.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Higienizacja zębów',
    category: 'zabiegi',
    caption: 'Higienizacja',
  },
];
