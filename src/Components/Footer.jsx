function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <p className="footer-text">
                    Need help? Call us at{' '}
                    <a href="tel:+911234567890" className="footer-phone">
                        📞 +91 12345 67890
                    </a>
                </p>
                <p className="footer-copyright">
                    © {new Date().getFullYear()} The Book Nook. All rights reserved.
                </p>
            </div>
        </footer>
    );
}

export default Footer;
