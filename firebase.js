import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-database.js";

const firebaseConfig = {

    apiKey: "AIzaSyACeTgCIWyynzbHcbdPLfeK24nnOjEvOJk",

    authDomain: "clock-60x.firebaseapp.com",

    projectId: "clock-60x",

    storageBucket: "clock-60x.firebasestorage.app",

    messagingSenderId: "311438870758",

    appId: "1:311438870758:web:41d7ec11bad3c924965327",

    measurementId: "G-JXQN631WTB"

};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const rtdb = getDatabase(app);

console.log("Firebase接続成功");