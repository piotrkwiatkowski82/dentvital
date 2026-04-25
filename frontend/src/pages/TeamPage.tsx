import { useScrollReveal } from '../hooks/useScrollReveal';
import PageHero from '../components/ui/PageHero';
import BookingSection from '../components/booking/BookingSection';
import { useTeam } from '../hooks/useTeam';

export default function TeamPage() {
  useScrollReveal();
  const { members } = useTeam();

  return (
    <>
      <PageHero
        eyebrow="O nas"
        title="Nasz zespół"
        subtitle="Multidyscyplinarny zespół specjalistów — stomatolodzy, fizjoterapeuci, logopedzi i trenerzy medyczni pod jednym dachem."
        icon="users"
        breadcrumbs={[
          { label: 'Strona główna', href: '/' },
          { label: 'O nas' },
          { label: 'Zespół' },
        ]}
      />

      <section className="section scroll-reveal">
        <div className="container">
          <div className="team-grid">
            {members.map((member) => (
              <div className="team-card" key={member.id}>
                <img
                  className="team-card-img"
                  src={member.image}
                  alt={member.name}
                  loading="lazy"
                />
                <div className="team-card-body">
                  <h3 className="team-card-name">{member.name}</h3>
                  <p className="team-card-title">{member.title}</p>
                  <div className="team-card-specs">
                    {member.specializations.map((spec) => (
                      <span key={spec} className="team-card-spec">{spec}</span>
                    ))}
                  </div>
                  <p className="team-card-bio">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt scroll-reveal">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Jakość</span>
            <h2>Nasze osiągnięcia</h2>
          </div>
          <div className="stat-badges">
            <div className="stat-badge">
              <div className="stat-badge-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
              </div>
              <strong>15+</strong>
              <span>lat doświadczenia kliniki</span>
            </div>
            <div className="stat-badge">
              <div className="stat-badge-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <strong>12</strong>
              <span>specjalizacji w jednym miejscu</span>
            </div>
            <div className="stat-badge">
              <div className="stat-badge-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              </div>
              <strong>4.9</strong>
              <span>średnia ocen pacjentów</span>
            </div>
          </div>
        </div>
      </section>

      <BookingSection />
    </>
  );
}
