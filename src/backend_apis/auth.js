import { auth } from "./firebase";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";


//Auth methods
export const doCreateUser = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
}

export const doSignIn = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
}

export const doGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    const result = signInWithPopup(auth, provider);
    return result;
}

export const doSignOut = async () => {
    return auth.signOut();
}