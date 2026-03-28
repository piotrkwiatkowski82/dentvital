export interface Certificate {
  title: string;
  issuer: string;
  year: string;
  description: string;
}

// TODO: Verify and replace with actual certificates from dentvital.pl/o-nas/certyfikaty/
export const CERTIFICATES: Certificate[] = [
  {
    title: 'Certyfikat Akredytacji Gabinetu Stomatologicznego',
    issuer: 'Polskie Towarzystwo Stomatologiczne',
    year: '2023',
    description:
      'Potwierdzenie spełnienia najwyższych standardów jakości w zakresie diagnostyki i leczenia stomatologicznego.',
  },
  {
    title: 'Certyfikat Implantologa',
    issuer: 'Polskie Towarzystwo Implantologiczne',
    year: '2022',
    description:
      'Kwalifikacje w zakresie zaawansowanej implantologii, w tym augmentacji kości i wszczepów w trudnych przypadkach.',
  },
  {
    title: 'Autoryzowany Partner ITI Scholar',
    issuer: 'International Team for Implantology',
    year: '2021',
    description:
      'Autoryzacja renomowanej organizacji naukowej potwierdzająca wiedzę i doświadczenie w dziedzinie implantologii.',
  },
  {
    title: 'Certyfikat Ortodonty — Systemy Alignerowe',
    issuer: 'Invisalign / ClearCorrect',
    year: '2022',
    description:
      'Kwalifikacje do prowadzenia leczenia ortodontycznego przezroczystymi nakładkami alignerowymi dla dorosłych i dzieci.',
  },
  {
    title: 'Certyfikat Fizjoterapeuty — Terapia TMJ',
    issuer: 'Polskie Towarzystwo Fizjoterapii',
    year: '2021',
    description:
      'Specjalistyczne uprawnienia w zakresie diagnostyki i leczenia zaburzeń stawu skroniowo-żuchwowego i okolicy głowy i szyi.',
  },
  {
    title: 'Certyfikat ISO 9001',
    issuer: 'Bureau Veritas',
    year: '2023',
    description:
      'Certyfikacja systemu zarządzania jakością potwierdzająca zgodność z międzynarodowymi normami ISO dla podmiotów medycznych.',
  },
];
