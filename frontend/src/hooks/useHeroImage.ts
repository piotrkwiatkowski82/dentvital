import { useEffect, useState } from 'react';
import { IMAGES } from '../constants/images';

export function useHeroImage(): string {
  const [src, setSrc] = useState<string>(IMAGES.hero);

  useEffect(() => {
    fetch('/api/settings/hero')
      .then((r) => r.json())
      .then((data: { value: string }) => {
        if (data.value) setSrc(data.value);
      })
      .catch(() => {
        // Keep fallback on error
      });
  }, []);

  return src;
}
