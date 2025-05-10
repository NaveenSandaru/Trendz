import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./../context/authContext";
import { doSignOut } from "../backend_apis/auth";
import "./../styles/Header.css";

export function Header() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

    const { currentUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        document.body.classList.remove("light", "dark");
        document.body.classList.add(theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleDropdown = () => setDropdownOpen(prev => !prev);
    const toggleTheme = () => setTheme(prev => (prev === "light" ? "dark" : "light"));

    const handleLogout = async () => {
        await doSignOut();
        navigate("/");
    };

    const currentPath = window.location.pathname;
    const profileInitial = currentUser?.displayName?.charAt(0).toUpperCase() ||
        currentUser?.email?.charAt(0).toUpperCase() || "U";
    const userName = currentUser?.email?.split("@")[0] || "Guest";
    const isActive = (path) => currentPath === path ? "active-link" : "";

    return (
        <header className="header">
            <div className="logo" onClick={() => navigate("/home")}>
                <img src="/logo.png" alt="App Logo" className="logo-img" />
            </div>

            <nav className="nav-links">
                <a href="/home" className={isActive("/home")}>Home</a>
                <a href="/about" className={isActive("/about")}>About Us</a>
                <a href="/contact" className={isActive("/contact")}>Contact Us</a>
            </nav>

            <div className="right-controls">
                <div className="profile" onClick={toggleDropdown} aria-label="User menu">
                    <div className="profile-icon">{profileInitial}</div>
                </div>

                <button className="theme-toggle-btn" onClick={toggleTheme}>
                    {theme === "light" ? "🌙" : "☀️"}
                </button>
            </div>

            {dropdownOpen && (
                <div className="dropdown">
                    <ul>
                        <li className="dropdown-item username">{userName}</li>
                        <li className="dropdown-item logout" onClick={handleLogout}>Logout</li>
                    </ul>
                </div>
            )}
        </header>

    );
}

