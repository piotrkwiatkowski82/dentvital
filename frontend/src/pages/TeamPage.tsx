import { useScrollReveal } from '../hooks/useScrollReveal';
import PageHero from '../components/ui/PageHero';
import BookingSection from '../components/booking/BookingSection';
import { TEAM_MEMBERS } from '../constants/team';

export default function TeamPage() {
  useScrollReveal();

  return (
    <>
      <PageHero
        eyebrow="O nas"
        title="Nasz zespół"
        subtitle="Multidyscyplinarny zespół specjalistów — stomatolodzy, fizjoterapeuci, logopedzi i trenerzy medyczni pod jednym dachem."
        breadcrumbs={[
          { label: 'Strona główna', href: '/' },
          { label: 'O nas' },
          { label: 'Zespół' },
        ]}
      />

      <section className="section scroll-reveal">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Poznaj nas</span>
            <h2>Specjaliści Dentvital</h2>
            <p>
              Łączymy doświadczenie implantologów, ortodontów, fizjoterapeutów i logopedów,
              aby zapewnić Ci kompleksową opiekę w jednym miejscu. Każdy z naszych
              specjalistów stale podnosi kwalifikacje, uczestnicząc w szkoleniach krajowych
              i zagranicznych.
            </p>
          </div>

          <div className="team-grid">
            {TEAM_MEMBERS.map((member) => (
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
              <strong>15+</strong>
              <span>lat doświadczenia kliniki</span>
            </div>
            <div className="stat-badge">
              <strong>12</strong>
              <span>specjalizacji w jednym miejscu</span>
            </div>
            <div className="stat-badge">
              <strong>4.9/5</strong>
              <span>średnia ocen pacjentów</span>
            </div>
          </div>
        </div>
      </section>

      <BookingSection />
    </>
  );
}
