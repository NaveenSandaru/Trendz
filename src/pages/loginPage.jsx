import { useNavigate } from "react-router-dom";
import { doSignIn, doGoogleSignIn } from "../backend_apis/auth";
import { useAuth } from "../context/authContext";
import { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { Popup } from "../components/popup";
import "./../styles/loginPage.css";
import googleLogo from './../../public/google-logo.png';

function LoginPage() {
    const { userLoggedIn } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (userLoggedIn) {
            setShowPopup(true);
        }
    }, [userLoggedIn]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!isSigningIn) {
                setIsSigningIn(true);
                await doSignIn(email, password);
                setShowPopup(true);
                setHasError(false);
            }
        } catch (err) {
            setHasError(true);
            setShowPopup(true);
            setError(err.message);
        } finally {
            setIsSigningIn(false);
        }
    };

    const handleGoogleLogIn = async () => {
        if (!isSigningIn) {
            setIsSigningIn(true);
            await doGoogleSignIn()
                .then(() => {
                    setShowPopup(true);
                    setHasError(false);
                })
                .catch(err => {
                    console.error(err);
                    setHasError(true);
                    setError(err.message);
                    setIsSigningIn(false);
                });
        }
    };

    const handlePopupClose = () => {
        setShowPopup(false);
        if (!hasError) {
            navigate('/home');
        }
    };

    return (
        <>
            <div className="loginPageContainer">
                <div className="loginBox">
                    <h2 className="loginHeading">Sign In</h2>
                    <form onSubmit={handleSubmit} className="loginForm">
                        <TextField
                            label="Email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                        />
                        <TextField
                            label="Password"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth
                        />
                        <Button
                            variant="contained"
                            type="submit"
                            disabled={isSigningIn}
                            className="loginButton"
                            fullWidth
                        >
                            Sign In
                        </Button>
                    </form>

                    <div className="separator">or</div>

                    <Button
                        variant="outlined"
                        onClick={handleGoogleLogIn}
                        disabled={isSigningIn}
                        className="googleButton"
                        fullWidth
                    >
                        <img src={googleLogo} height={20} width={20} alt="google-logo" />
                        Sign in with Google
                    </Button>
                    <div className="linktoregister">
                        <p>Don't have an account? <a href="register">Sign Up</a></p>
                    </div>
                </div>

            </div>

            {showPopup && !hasError && (
                <Popup
                    type="success"
                    heading="Login Successful"
                    message="You have been logged in successfully."
                    onClose={handlePopupClose}
                />
            )}

            {showPopup && hasError && (
                <Popup
                    type="error"
                    heading="Login Error"
                    message={error}
                    onClose={() => {
                        setShowPopup(false);
                        setError('');
                        setHasError(false);
                    }}
                />
            )}
        </>
    );
}

export default LoginPage;
