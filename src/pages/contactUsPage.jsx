import React, { useState } from "react";
import "./../styles/contactUsPage.css";

export default function ContactUs() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Thank you for contacting us!");
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <div className="contact-container">
            <h1>Contact Us</h1>
            <form onSubmit={handleSubmit} className="contact-form">
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    placeholder="Your Name"
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    placeholder="Your Email"
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="message"
                    value={formData.message}
                    placeholder="Your Message"
                    onChange={handleChange}
                    required
                />
                <button type="submit">Send Message</button>
            </form>
        </div>
    );
}
