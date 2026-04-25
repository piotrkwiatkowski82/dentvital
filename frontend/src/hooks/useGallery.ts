import { useEffect, useState } from 'react';

export interface ApiGalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
  caption?: string;
}

interface UseGalleryResult {
  images: ApiGalleryImage[];
  loading: boolean;
  error: boolean;
}

export function useGallery(): UseGalleryResult {
  const [images, setImages] = useState<ApiGalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('/api/gallery')
      .then((r) => r.json())
      .then((data: { items: ApiGalleryImage[]; total: number }) => {
        setImages(data.items);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { images, loading, error };
}
