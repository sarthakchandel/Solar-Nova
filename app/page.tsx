import Image from "next/image";

const Arrow = () => <span aria-hidden="true">↗</span>;

const projects = [
  { image: "/solar/residential-solar.jpg", location: "Jaipur, Rajasthan", capacity: "8.2 kW", className: "project-large" },
  { image: "/solar/solar-roof.jpg", location: "Pune, Maharashtra", capacity: "6.4 kW", className: "project-tall" },
  { image: "/solar/installation.webp", location: "Kochi, Kerala", capacity: "12.8 kW", className: "project-wide" },
];

export default function Home() {
  return (
    <main>
      <section className="hero" id="home">
        <nav className="nav container">
          <a className="brand" href="#home" aria-label="Solara home"><span className="brand-mark">✦</span>solara</a>
          <div className="nav-links">
            <a href="#why-solar">Why solar</a><a href="#projects">Projects</a><a href="#process">Process</a>
          </div>
          <a className="nav-cta" href="#consultation">Get a proposal <Arrow /></a>
        </nav>

        <div className="hero-grid container">
          <div className="hero-copy">
            <p className="eyebrow"><i /> THE BRIGHTER WAY HOME</p>
            <h1>Power your<br /><em>everyday.</em></h1>
            <p className="hero-description">Beautiful solar systems, engineered around your life. Less reliance. More possibility.</p>
            <div className="hero-actions">
              <a className="button button-sun" href="#consultation">Start your solar story <Arrow /></a>
              <a className="text-link" href="#process">Explore how it works <span>↓</span></a>
            </div>
          </div>
          <div className="hero-visual">
            <div className="solar-orbit orbit-one" /><div className="solar-orbit orbit-two" />
            <div className="sun-core"><span>01</span><b>Solar<br />energy</b></div>
            <div className="hero-image-wrap">
              <Image src="/solar/solar-home.webp" alt="Modern home powered by rooftop solar panels" fill priority sizes="(max-width: 800px) 90vw, 45vw" />
            </div>
            <div className="energy-chip"><span className="pulse" /> NOW GENERATING <b>3.8 kW</b></div>
            <div className="year-tag">— EST. 2014</div>
          </div>
        </div>
        <div className="hero-footer container"><span>Scroll to discover</span><div className="scroll-line" /><span>01 — 05</span></div>
      </section>

      <section className="impact container" id="why-solar">
        <div className="section-label"><span>01</span> A BETTER BASELINE</div>
        <div className="impact-heading"><h2>Energy should feel<br /><em>effortless.</em></h2><p>We make the switch simple: thoughtful design, premium technology and a team that stays with you long after installation.</p></div>
        <div className="stats">
          <div><strong>2,400<span>+</span></strong><p>homes powered</p></div><div><strong>₹18.6<span>Cr</span></strong><p>saved by our community</p></div><div><strong>38<span>k</span></strong><p>tonnes CO₂ avoided</p></div><div><strong>4.9<span>/5</span></strong><p>customer rating</p></div>
        </div>
      </section>

      <section className="feature-band">
        <div className="feature-image"><Image src="/solar/service-installation.jpg" alt="Solar panels being professionally installed" fill sizes="(max-width: 900px) 100vw, 50vw" /></div>
        <div className="feature-content"><p className="eyebrow"><i /> BUILT AROUND YOU</p><h2>Your roof.<br /><em>Your rhythm.</em></h2><p>Every Solara system starts with how you live. We model your daylight, your roofline and your energy habits to create a system that performs beautifully.</p><a className="text-link light" href="#process">Meet the Solara difference <Arrow /></a><div className="feature-number">02</div></div>
      </section>

      <section className="projects container" id="projects">
        <div className="projects-top"><div><p className="eyebrow"><i /> MADE FOR REAL LIFE</p><h2>Sunlight, <em>seen differently.</em></h2></div><a className="round-link" href="#consultation">View all<br />projects <Arrow /></a></div>
        <div className="project-grid">{projects.map((project) => <article className={`project ${project.className}`} key={project.location}><Image src={project.image} alt={`Solar installation in ${project.location}`} fill sizes="(max-width: 800px) 100vw, 40vw" /><div className="project-meta"><span>{project.location}</span><b>{project.capacity}</b></div></article>)}</div>
      </section>

      <section className="monitoring container" id="process">
        <div className="monitor-copy"><p className="eyebrow"><i /> ALWAYS IN VIEW</p><h2>Made to shine.<br /><em>Built to last.</em></h2><p>One intelligent system. One clear view of every watt you make, use and save.</p><a className="button button-dark" href="#consultation">Design my system <Arrow /></a></div>
        <div className="dashboard"><div className="dash-top"><span>Live energy flow</span><b>● Live</b></div><div className="energy-value"><span>Today&apos;s production</span><strong>24.8 <small>kWh</small></strong><p>↑ 18% vs. yesterday</p></div><div className="chart"><span style={{height:"42%"}} /><span style={{height:"60%"}} /><span style={{height:"49%"}} /><span style={{height:"75%"}} /><span style={{height:"64%"}} /><span style={{height:"91%"}} /><span style={{height:"78%"}} /><span style={{height:"54%"}} /><span style={{height:"35%"}} /></div><div className="dash-bottom"><span>Self-powered</span><b>87%</b><span>Exported</span><b>6.4 kWh</b></div></div>
      </section>

      <section className="cta" id="consultation"><Image src="/solar/residential-solar.jpg" alt="Rooftop solar array under blue skies" fill sizes="100vw" /><div className="cta-overlay" /><div className="cta-content container"><p className="eyebrow"><i /> YOUR NEXT CHAPTER</p><h2>Ready for your<br /><em>bright side?</em></h2><a className="button button-sun" href="mailto:hello@solara.energy">Talk to a solar guide <Arrow /></a></div></section>
      <footer className="footer container"><a className="brand" href="#home"><span className="brand-mark">✦</span>solara</a><p>Designed for a lighter footprint.</p><p>© 2026 SOLARA ENERGY</p></footer>
    </main>
  );
}
