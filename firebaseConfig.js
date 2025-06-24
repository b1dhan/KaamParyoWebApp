// firebaseConfig.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDhIJ4a4mEHbLYDXmOXorGe0VJ4l6XVqFE",
  authDomain: "finaldemo-38f19.firebaseapp.com",
  projectId: "finaldemo-38f19",
  storageBucket: "finaldemo-38f19.firebasestorage.app",
  messagingSenderId: "260614975704",
  appId: "1:260614975704:web:c215f2d1fc257d522da7ad",
  measurementId: "G-0LV0B261XQ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

