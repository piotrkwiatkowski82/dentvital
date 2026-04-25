import { useEffect, useState } from 'react';

export interface HeroText {
  badge: string;
  heading_line1: string;
  heading_line2: string;
  subtext: string;
  cta_primary: string;
  tags: string[];
}

const FALLBACK: HeroText = {
  badge: 'Klinika stomatologiczna',
  heading_line1: 'Twój uśmiech,',
  heading_line2: 'nasz priorytet',
  subtext: 'Kompleksowa opieka, komfort i transparentność na każdym etapie leczenia. Od pierwszej wizyty po gotowy uśmiech.',
  cta_primary: 'Umów wizytę',
  tags: ['Stomatologia estetyczna', 'Implantologia', 'Wybielanie zębów'],
};

export function useHeroText(): HeroText {
  const [text, setText] = useState<HeroText>(FALLBACK);

  useEffect(() => {
    fetch('/api/settings/hero-text')
      .then((r) => r.json())
      .then((data) => setText(JSON.parse(data.value)))
      .catch(() => {});
  }, []);

  return text;
}
