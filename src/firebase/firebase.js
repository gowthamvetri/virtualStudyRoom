// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc, getDocs, query, orderBy, onSnapshot } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // You missed this import

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCd9HAAZoDQj9hlqpuCsS9djFfMTlalRHo",
  authDomain: "virtual-study-room-5dc61.firebaseapp.com",
  projectId: "virtual-study-room-5dc61",
  storageBucket: "virtual-study-room-5dc61.appspot.com", // corrected the domain here too
  messagingSenderId: "748258612341",
  appId: "1:748258612341:web:605eb2694eed2d08e0943c",
  measurementId: "G-Z90JWPXCKG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const roomsCollection = collection(db, "rooms");
