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
                    Giving <span className="highlight">Books</span> a Second Life
                </h1>
                <p className="hero-subtitle">
                    You can explore books without logging in. When you're ready to buy or place a bid, simply create an account and get started.
                </p>
                <p className="hero-subtitle">
                    Place a bid within the allowed range. The highest valid bid wins when the listing closes.
                </p>
                <a href="/books" className="hero-cta">
                    Browse Collection
                    <span className="cta-arrow">→</span>
                </a>
            </div>
        </section>
    );
}

export default Home;
