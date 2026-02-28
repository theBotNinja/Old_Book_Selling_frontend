import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { user, isAuthenticated, role, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        setMenuOpen(false);
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                {/* Brand */}
                <NavLink to="/" className="navbar-brand" onClick={() => setMenuOpen(false)}>
                    <span className="brand-text">♖ Book Nook</span>
                </NavLink>

                {/* Desktop Nav Links */}
                <ul className="navbar-links">
                    <li><NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Home</NavLink></li>
                    <li><NavLink to="/books" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Books</NavLink></li>
                    {isAuthenticated && role === 'user' && (
                        <li><NavLink to="/bets" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Bets</NavLink></li>
                    )}
                    {isAuthenticated && role === 'admin' && (
                        <li><NavLink to="/add-books" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Add Books</NavLink></li>
                    )}
                </ul>

                {/* Auth Area */}
                <div className="navbar-actions">
                    {isAuthenticated ? (
                        <div className="nav-user-area">
                            <span className="nav-user-badge">
                                {role === 'admin' ? '🛠️' : '📖'} {user.name}
                            </span>
                            <button className="nav-btn nav-btn--logout" onClick={handleLogout}>
                                Logout
                            </button>
                        </div>
                    ) : (
                        <NavLink to="/login" className="nav-btn nav-btn--login">
                            Login / Sign Up
                        </NavLink>
                    )}
                </div>

                {/* Mobile Hamburger */}
                <button
                    className={`hamburger ${menuOpen ? 'open' : ''}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`mobile-menu ${menuOpen ? 'show' : ''}`}>
                <NavLink to="/" className="mobile-link" onClick={() => setMenuOpen(false)}>Home</NavLink>
                <NavLink to="/books" className="mobile-link" onClick={() => setMenuOpen(false)}>Books</NavLink>
                {isAuthenticated && role === 'user' && (
                    <NavLink to="/bets" className="mobile-link" onClick={() => setMenuOpen(false)}>Bidding</NavLink>
                )}
                {isAuthenticated && role === 'admin' && (
                    <NavLink to="/add-books" className="mobile-link" onClick={() => setMenuOpen(false)}>Add Books</NavLink>
                )}
                <div className="mobile-auth">
                    {isAuthenticated ? (
                        <>
                            <span className="mobile-user-badge">{role === 'admin' ? '🛠️' : '📖'} {user.name}</span>
                            <button className="nav-btn nav-btn--logout" onClick={handleLogout}>Logout</button>
                        </>
                    ) : (
                        <NavLink to="/login" className="nav-btn nav-btn--login" onClick={() => setMenuOpen(false)}>
                            Login / Sign Up
                        </NavLink>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
