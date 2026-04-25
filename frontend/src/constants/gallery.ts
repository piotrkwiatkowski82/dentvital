export type GalleryCategory = 'gabinety' | 'zespol' | 'zabiegi';

export interface GalleryImage {
  src: string;
  alt: string;
  category: GalleryCategory;
  caption?: string;
}

