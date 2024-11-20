import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, Auth } from "firebase/auth"; // Импорт Auth
import { getAnalytics, Analytics } from "firebase/analytics";
import { FirebaseApp } from "firebase/app";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCx6bSuYjsCD3djMrb8xYnFk3NglS0FHJo",
    authDomain: "graduation-project-cbd2e.firebaseapp.com",
    projectId: "graduation-project-cbd2e",
    storageBucket: "graduation-project-cbd2e.firebasestorage.app",
    messagingSenderId: "603231151152",
    appId: "1:603231151152:web:026f06a1fadad364f6b9f5",
    measurementId: "G-8VNP5ZBT7B"
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(app); // Инициализация Firestore
const auth: Auth = getAuth(app); // Инициализация Auth

// Optional: Initialize Analytics only if available
let analytics: Analytics | undefined;
if (typeof window !== "undefined") {
    analytics = getAnalytics(app);
}

// Экспорт Firebase приложения, Auth и Firestore базы данных
export { app, analytics, db, auth };
