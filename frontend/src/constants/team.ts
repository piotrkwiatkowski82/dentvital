export interface TeamMember {
  id: string;
  name: string;
  title: string;
  specializations: string[];
  bio: string;
  image: string;
}

// TODO: Replace placeholder data with actual team member info from dentvital.pl/o-nas/zespol/
export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'anna-kowalska',
    name: 'lek. dent. Anna Kowalska',
    title: 'Stomatolog, założycielka kliniki',
    specializations: ['Stomatologia zachowawcza', 'Stomatologia estetyczna', 'Protetyka'],
    bio: 'Absolwentka Pomorskiego Uniwersytetu Medycznego w Szczecinie. Od ponad 15 lat zajmuje się kompleksową opieką stomatologiczną. Specjalizuje się w stomatologii estetycznej i odbudowach protetycznych.',
    // TODO: Replace with actual clinic photo
    image: 'https://images.pexels.com/photos/5214999/pexels-photo-5214999.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
  },
  {
    id: 'marek-nowak',
    name: 'lek. dent. Marek Nowak',
    title: 'Implantolog',
    specializations: ['Implantologia', 'Chirurgia stomatologiczna', 'Protetyka CAD/CAM'],
    bio: 'Specjalista implantologii z wieloletnim doświadczeniem. Ukończył liczne kursy podyplomowe w kraju i za granicą. Wykonuje implanty jednoetapowe, augmentację kości oraz zaawansowane prace protetyczne.',
    // TODO: Replace with actual clinic photo
    image: 'https://images.pexels.com/photos/6812464/pexels-photo-6812464.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
  },
  {
    id: 'katarzyna-wisniewski',
    name: 'lek. dent. Katarzyna Wiśniewska',
    title: 'Ortodonta',
    specializations: ['Ortodoncja', 'Alignery', 'Aparaty stałe'],
    bio: 'Specjalista ortodoncji, certyfikowany terapeuta systemów alignerowych. Prowadzi leczenie ortodontyczne zarówno u dzieci, jak i dorosłych, stosując najnowsze techniki cyfrowego planowania leczenia.',
    // TODO: Replace with actual clinic photo
    image: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
  },
  {
    id: 'piotr-zajac',
    name: 'mgr fizjoterapii Piotr Zając',
    title: 'Fizjoterapeuta',
    specializations: ['Fizjoterapia stomatologiczna (TMJ)', 'Terapia manualna', 'Rehabilitacja pourazowa'],
    bio: 'Magister fizjoterapii, specjalista terapii manualnej i rehabilitacji. Zajmuje się leczeniem bólów kręgosłupa, stawów oraz fizjoterapią stomatologiczną — leczeniem zaburzeń stawu skroniowo-żuchwowego.',
    // TODO: Replace with actual clinic photo
    image: 'https://images.pexels.com/photos/5473182/pexels-photo-5473182.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
  },
  {
    id: 'magdalena-dabrowska',
    name: 'mgr Magdalena Dąbrowska',
    title: 'Logopeda',
    specializations: ['Logopedia', 'Terapia wad wymowy', 'Terapia dzieci i dorosłych'],
    bio: 'Certyfikowany logopeda z doświadczeniem w terapii wad wymowy u dzieci i dorosłych. Współpracuje z ortodontami kliniki w zakresie terapii miofunkcjonalnej i przygotowania do leczenia ortodontycznego.',
    // TODO: Replace with actual clinic photo
    image: 'https://images.pexels.com/photos/5214997/pexels-photo-5214997.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
  },
  {
    id: 'tomasz-krol',
    name: 'mgr Tomasz Król',
    title: 'Trener medyczny',
    specializations: ['Trening medyczny', 'Programy funkcjonalne', 'Rehabilitacja sportowa'],
    bio: 'Certyfikowany trener medyczny z wykształceniem w zakresie fizjoterapii i treningu funkcjonalnego. Tworzy indywidualne programy ćwiczeń wspierające rehabilitację i poprawiające sprawność ruchową.',
    // TODO: Replace with actual clinic photo
    image: 'https://images.pexels.com/photos/4498606/pexels-photo-4498606.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
  },
];
