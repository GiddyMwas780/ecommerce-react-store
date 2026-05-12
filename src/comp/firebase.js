// firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your new Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2CHYXJ-Poz-JV9G87Brg21jql408vzbI",
  authDomain: "vitamin-g-groceries.firebaseapp.com",
  databaseURL: "https://vitamin-g-groceries-default-rtdb.firebaseio.com",
  projectId: "vitamin-g-groceries",
  storageBucket: "vitamin-g-groceries.firebasestorage.app",
  messagingSenderId: "167672193636",
  appId: "1:167672193636:web:4fbcfa656ce41ebca1b571",
  measurementId: "G-B2BR3YCM1F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and export it
const db = getDatabase(app);

export default db;
