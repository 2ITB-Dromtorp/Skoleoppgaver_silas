// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBzBHLvfxrQszr537Q-H4ChEUP7D_CSq5g",
    authDomain: "react-project-test-e1764.firebaseapp.com",
    projectId: "react-project-test-e1764",
    storageBucket: "react-project-test-e1764.appspot.com",
    messagingSenderId: "20043021569",
    appId: "1:20043021569:web:2992832b5c6e7029096f00"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };


