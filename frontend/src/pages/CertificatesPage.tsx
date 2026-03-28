import { useScrollReveal } from '../hooks/useScrollReveal';
import PageHero from '../components/ui/PageHero';
import { CERTIFICATES } from '../constants/certificates';

const ShieldIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

export default function CertificatesPage() {
  useScrollReveal();

  return (
    <>
      <PageHero
        eyebrow="O nas"
        title="Certyfikaty i akredytacje"
        subtitle="Nasze kwalifikacje potwierdzają najwyższe standardy opieki medycznej."
        icon="shield"
        breadcrumbs={[
          { label: 'Strona główna', href: '/' },
          { label: 'O nas' },
          { label: 'Certyfikaty' },
        ]}
      />

      <section className="section scroll-reveal">
        <div className="container">
          <div className="section-head">
            <p>
              Stale inwestujemy w rozwój naszego zespołu i wyposażenia, aby sprostać
              najwyższym standardom opieki dentystycznej i medycznej. Poniżej prezentujemy
              wybrane certyfikaty i akredytacje potwierdzające nasze kwalifikacje.
            </p>
          </div>
          <div className="feature-grid">
            {CERTIFICATES.map((cert) => (
              <div key={cert.title} className="feature-card">
                <div className="cert-icon">
                  <ShieldIcon />
                </div>
                <span className="cert-year">{cert.year}</span>
                <h3 className="feature-title">{cert.title}</h3>
                <p className="cert-issuer">{cert.issuer}</p>
                <p className="feature-desc">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt scroll-reveal">
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="section-head">
            <span className="eyebrow">Nasz zespół</span>
            <h2>Poznaj specjalistów</h2>
            <p>
              Za każdym certyfikatem stoi doświadczony specjalista, który z pasją zajmuje się
              swoją dziedziną.
            </p>
          </div>
          <a href="/o-nas/zespol" className="button primary">
            Poznaj nasz zespół
          </a>
        </div>
      </section>
    </>
  );
}
