import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { doCreateUser } from '../backend_apis/auth';
import { TextField, Button } from "@mui/material";
import { Popup } from "../components/popup";
import './../styles/registerPage.css';

function RegisterPage() {
    const { userLoggedIn } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [error, setError] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        if (userLoggedIn) {
            setShowPopup(true);
        }
    }, [userLoggedIn]);

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            if (!isRegistering && password === confirmPassword) {
                setIsRegistering(true);
                await doCreateUser(email, password);
                setShowPopup(true);
                setHasError(false);
            } else {
                throw new Error('Passwords do not match');
            }
        } catch (err) {
            setError(err.message);
            setHasError(true);
            setShowPopup(true);
        } finally {
            setIsRegistering(false);
        }
    };

    const handlePopupClose = () => {
        setShowPopup(false);
        if (!hasError) navigate('/home');
    };

    return (
        <>
            <div className="registerSection">
                <form className="registerForm" onSubmit={handleRegister}>
                    <h2 className="formTitle">Create Account</h2>
                    <TextField
                        label="Email"
                        variant="outlined"
                        type="email"
                        required
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        label="Password"
                        variant="outlined"
                        type="password"
                        required
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextField
                        label="Confirm Password"
                        variant="outlined"
                        type="password"
                        required
                        fullWidth
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <Button variant="contained" type="submit" fullWidth disabled={isRegistering}>
                        {isRegistering ? "Registering..." : "Register"}
                    </Button>
                    <div className="linktoregister">
                        <p>Already have an account? <a href="/">Log In</a></p>
                    </div>
                </form>
            </div>

            {showPopup && !hasError && (
                <Popup
                    type="success"
                    heading="Registration Successful"
                    message="You have been registered successfully."
                    onClose={handlePopupClose}
                />
            )}

            {showPopup && hasError && (
                <Popup
                    type="error"
                    heading="Registration Error"
                    message={error}
                    onClose={() => setShowPopup(false)}
                />
            )}
        </>
    );
}

export default RegisterPage;
