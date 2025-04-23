// src/components/Navbar.tsx
import { FaShoppingCart } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <h2>MiLogo</h2>
            </div>

            <div className="navbar-search">
                <input type="text" placeholder="Buscar productos..." />
            </div>

            <div className="navbar-cart">
                <FaShoppingCart size={24} />
            </div>
        </nav>
    );
};

export default Navbar;
