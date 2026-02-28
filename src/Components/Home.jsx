import heroImg from '../assets/hero_bookshop.png';

function Home() {
    return (
        <section id="home" className="hero">
            {/* Background image */}
            <div className="hero-bg">
                <img src={heroImg} alt="Old bookshop interior" />
                <div className="hero-overlay"></div>
            </div>

            {/* Content */}
            <div className="hero-content">
                <h1 className="hero-title">
                    Discover <span className="highlight">Timeless</span> Treasures
                </h1>
                <p className="hero-subtitle">
                    Rare editions, vintage classics, and forgotten gems — all waiting for a new home.
                </p>
                <a href="#books" className="hero-cta">
                    Browse Collection
                    <span className="cta-arrow">→</span>
                </a>
            </div>
        </section>
    );
}

export default Home;
