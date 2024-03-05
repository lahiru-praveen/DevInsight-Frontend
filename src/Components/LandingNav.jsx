import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "../Styles/LandingNav.css";

function LandingNav() {
    const navRef = useRef();

    const showNavbar = () => {
        navRef.current.classList.toggle("responsive_nav");
    };

    return (
        <header>
            <nav ref={navRef}>
                <a href="/#">Home</a>
                <a href="/#">About us</a>
                <a href="/#">Contact us</a>
                <a href="/#">Login</a>
                <a href="/#">Sign Up</a>
                <button className="nav-btn nav-close-btn" onClick={showNavbar}>
                    <FaTimes/>
                </button>
            </nav>
            <button className="nav-btn" onClick={showNavbar}>
                <FaBars />
            </button>
        </header>
    );
}

export default LandingNav;
