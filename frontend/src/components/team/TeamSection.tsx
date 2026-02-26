import { IMAGES } from '../../constants/images';

const STATS = [
  { value: '15+', label: 'lat doświadczeń kliniki' },
  { value: '12', label: 'specjalizacji w jednym miejscu' },
  { value: '4.9/5', label: 'średnia ocen pacjentów' },
];

export default function TeamSection() {
  return (
    <section id="zespol" className="section alt scroll-reveal">
      <div className="container">
        <div className="section-shell team-highlight">
          <div>
            <span className="eyebrow">Zespół</span>
            <h2>Poznaj specjalistów Dentvital</h2>
            <p style={{ color: 'var(--muted)', fontSize: 16, lineHeight: 1.7 }}>
              Łączymy doświadczenie implantologów, ortodontów, fizjoterapeutów i
              logopedów, aby prowadzić pacjenta przez każdy etap leczenia — od
              pierwszej konsultacji po rehabilitację.
            </p>
            <div className="stat-badges">
              {STATS.map((s) => (
                <div className="stat-badge" key={s.value}>
                  <strong>{s.value}</strong>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="media">
            <img
              className="media-box-img"
              src={IMAGES.team}
              alt="Nasz zespół w gabinecie"
              width={900}
              height={650}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
