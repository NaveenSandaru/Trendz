import React from "react";
import "./../styles/footer.css";

export function Footer() {
    return (
        <footer className="footer">
            <div className="footer-section aboutSection">
                <h3>About</h3>
                <p>
                    Trendz is your go-to platform for discovering movies, watching trailers, and exploring film stats.
                </p>
            </div>

            <div className="footer-section linksSection">
                <h3>Quick Links</h3>
                <ul>
                    <li><a href="/home">Home</a></li>
                    <li><a href="/about">About Us</a></li>
                    <li><a href="/contact">Contact Us</a></li>
                </ul>
            </div>

            <div className="footer-section contactSection">
                <h3>Contact</h3>
                <p>Email: support@trendz.com</p>
                <p>Phone: +94 (77) 111-1111</p>
                <p>&copy; {new Date().getFullYear()} Trendz. All rights reserved.</p>
            </div>
        </footer>
    );
}
