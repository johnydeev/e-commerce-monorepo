// src/components/Navbar.tsx
import { FaShoppingCart } from 'react-icons/fa';
import './Navbar.css';

interface NavbarProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
}

const Navbar = ({ searchTerm, setSearchTerm }: NavbarProps) => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <h2>MiLogo</h2>
            </div>

            <div className="navbar-search">
                <input
                    type="text"
                    placeholder="Buscar productos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="navbar-cart">
                <FaShoppingCart size={24} />
            </div>
        </nav>
    );
};

export default Navbar;

