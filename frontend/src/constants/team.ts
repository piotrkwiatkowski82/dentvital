export interface TeamMember {
  id: string;
  name: string;
  title: string;
  specializations: string[];
  bio: string;
  image: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'kamila-radzimowska',
    name: 'Kamila Radzimowska',
    title: 'lek. dent. — właścicielka kliniki',
    specializations: ['Protetyka', 'Chirurgia stomatologiczna', 'Implanty'],
    bio: 'Absolwentka Pomorskiej Akademii Medycznej w Szczecinie z ponad 10-letnim doświadczeniem w dużych klinikach stomatologicznych. Szkolenie chirurgiczne odbyła w Wojskowym Szpitalu Klinicznym w Bydgoszczy. Doktorantka i właścicielka kliniki Dentvital.',
    image: 'https://www.dentvital.pl/wp-content/uploads/2020/05/k_radzimowska.jpg',
  },
  {
    id: 'anna-rogoza',
    name: 'Anna Rogoża',
    title: 'lek. dent. specjalista 1° stomatologii ogólnej',
    specializations: ['Ortodoncja', 'Stomatologia zachowawcza', 'Medycyna estetyczna'],
    bio: 'Ponad 20 lat doświadczenia w kompleksowej opiece stomatologicznej. Specjalizuje się w ortodoncji oraz nowoczesnych technikach korekcji tkanek miękkich z użyciem kwasu hialuronowego i botuliny.',
    image: 'https://www.dentvital.pl/wp-content/uploads/2020/05/a_rogoza.jpg',
  },
  {
    id: 'tomasz-zabski',
    name: 'Tomasz Żabski',
    title: 'lek. dent. specjalista chirurgii twarzowo-szczękowej',
    specializations: ['Chirurgia szczękowa', 'Chirurgia rekonstrukcyjna', 'Ekstrakcje złożone'],
    bio: 'Absolwent z wyróżnieniem Pomorskiej Akademii Medycznej (2006). Pracuje w Szpitalu Klinicznym PUM, specjalizując się w złożonych operacjach jamy ustnej i zabiegach rekonstrukcyjnych.',
    image: 'https://www.dentvital.pl/wp-content/uploads/2020/05/t_zabski.jpeg',
  },
  {
    id: 'marta-rogocka',
    name: 'Marta Rogocka',
    title: 'lek. dent.',
    specializations: ['Stomatologia zachowawcza', 'Endodoncja', 'Leczenie kanałowe'],
    bio: 'Absolwentka Pomorskiego Uniwersytetu Medycznego (2018). Na co dzień pracuje w Katedrze Stomatologii Zachowawczej, ze szczególnym zainteresowaniem endodoncją i leczeniem kanałowym.',
    image: 'https://www.dentvital.pl/wp-content/uploads/2020/05/m_rogocka.jpg',
  },
  {
    id: 'olga-skotarek',
    name: 'Olga Skotarek',
    title: 'Asystentka stomatologiczna',
    specializations: ['Asystowanie przy zabiegach', 'Opieka nad pacjentem'],
    bio: 'Energiczna asystentka stomatologiczna, uzupełniająca kwalifikacje w TEB Edukacja. Dba o komfort pacjentów na każdym etapie wizyty.',
    image: 'https://www.dentvital.pl/wp-content/uploads/2020/05/o_skotarek.jpg',
  },
  {
    id: 'maciej-radzimowski',
    name: 'Maciej Radzimowski',
    title: 'Administracja i zarządzanie',
    specializations: ['Obsługa pacjentów', 'Koordynacja kliniki'],
    bio: 'Odpowiada za sprawne funkcjonowanie kliniki i koordynację obsługi pacjentów. Pierwsza linia kontaktu w sprawach organizacyjnych.',
    image: 'https://www.dentvital.pl/wp-content/uploads/2020/05/m_radzimowski.jpg',
  },
];
