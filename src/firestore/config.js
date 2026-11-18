import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDXJnxsm6b7hqQXLqr7PZGNdZKQkJOTBG4",
  authDomain: "ps4store-tienda-react.firebaseapp.com",
  projectId: "ps4store-tienda-react",
  storageBucket: "ps4store-tienda-react.firebasestorage.app",
  messagingSenderId: "987646571972",
  appId: "1:987646571972:web:05551d74809b1a975f6091"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)