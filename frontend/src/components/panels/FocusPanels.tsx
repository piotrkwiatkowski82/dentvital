import { CLINIC } from '../../constants/contact';

export default function FocusPanels() {
  return (
    <section className="focus-panels" aria-labelledby="focus-panels-title">
      <div className="container-wide">
        <h2 id="focus-panels-title" className="visually-hidden">
          Kluczowe obszary opieki Dentvital
        </h2>
        <div className="panels-grid">
          {/* Stomatologia — large panel */}
          <article className="panel panel-large panel-dent">
            <div className="panel-label">Dentvital Stomatologia</div>
            <h3>Doświadczenie i nowoczesność dla Twojego uśmiechu</h3>
            <p>Kompleksowa diagnostyka, profilaktyka i implantologia z wykorzystaniem cyfrowych narzędzi.</p>
            <ul className="panel-list">
              <li>Stomatologia zachowawcza i endodoncja</li>
              <li>Ortodoncja: alignery, aparaty stałe</li>
              <li>Implantologia i protetyka cyfrowa CAD/CAM</li>
              <li>Diagnostyka RTG, CBCT, skanery 3D</li>
            </ul>
            <div className="panel-footer">
              <div className="panel-meta">
                <strong>{CLINIC.address}</strong>
                <span>tel. 666 977 530 · {CLINIC.email}</span>
              </div>
              <a className="button primary" href="#rejestracja">Umów wizytę</a>
            </div>
          </article>

          {/* Fizjoterapia */}
          <article className="panel panel-physio">
            <div className="panel-label">Fizjoterapia</div>
            <h3>Ruch bez bólu i pełna sprawność</h3>
            <p>Terapia bólu kręgosłupa i stawów, rehabilitacja pourazowa oraz praca nad postawą i TMJ.</p>
            <ul className="panel-list">
              <li>Terapia manualna i stabilizacja</li>
              <li>Fizjoterapia stomatologiczna (staw skroniowo-żuchwowy)</li>
              <li>Programy ćwiczeń domowych</li>
            </ul>
            <div className="panel-footer">
              <div className="panel-chip">Indywidualne plany terapii</div>
              <a className="button ghost" href="#zespol">Poznaj zespół</a>
            </div>
          </article>

          {/* Logopedia */}
          <article className="panel panel-logo">
            <div className="panel-label">Logopedia</div>
            <h3>Wyraźna mowa od najmłodszych lat</h3>
            <p>Diagnoza, terapia wad wymowy i współpraca z ortodontą oraz fizjoterapeutą.</p>
            <ul className="panel-list">
              <li>Terapia dzieci i dorosłych</li>
              <li>Ćwiczenia oddechowo-artykulacyjne</li>
              <li>Wsparcie domowe — zestawy ćwiczeń</li>
            </ul>
            <div className="panel-footer">
              <div className="panel-chip">Przyjazne gabinety dla dzieci</div>
              <a className="button ghost" href="#kontakt">Umów konsultację</a>
            </div>
          </article>

          {/* Trening medyczny */}
          <article className="panel panel-training">
            <div className="panel-label">Trening medyczny</div>
            <h3>Silne ciało — bezpieczny ruch</h3>
            <p>Programy funkcjonalne i stabilizujące, które przygotują do powrotu do aktywności.</p>
            <ul className="panel-list">
              <li>Powrót do formy po kontuzjach</li>
              <li>Wzmocnienie po rehabilitacji</li>
              <li>Edukacja ruchowa i ergonomia</li>
            </ul>
            <div className="panel-footer">
              <div className="panel-chip">Start od krótkiej konsultacji</div>
              <a className="button ghost" href="#rejestracja">Zobacz program</a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
