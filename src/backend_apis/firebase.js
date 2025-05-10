import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


//Firebase configurations
const firebaseConfig = {
    apiKey: "AIzaSyDo84y01JjSwawka9mwBc6mzptCeOawSIg",
    authDomain: "nodemob.firebaseapp.com",
    projectId: "nodemob",
    storageBucket: "nodemob.firebasestorage.app",
    messagingSenderId: "582073536532",
    appId: "1:582073536532:web:ceb1b24907da4ad8cbd701",
    measurementId: "G-V9S9H54YQF"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {app, auth};