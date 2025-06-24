// providermain.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
import {
  getFirestore,
  setDoc,
  doc,
  collection,
  query,
  where,
  getDocs,
  Timestamp
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyDhIJ4a4mEHbLYDXmOXorGe0VJ4l6XVqFE",
  authDomain: "finaldemo-38f19.firebaseapp.com",
  projectId: "finaldemo-38f19",
  storageBucket: "finaldemo-38f19.appspot.com",
  messagingSenderId: "260614975704",
  appId: "1:260614975704:web:c215f2d1fc257d522da7ad"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Toggle between login and signup
window.toggleForms = () => {
  document.getElementById("login-form").classList.toggle("hidden");
  document.getElementById("signup-form").classList.toggle("hidden");
};

// Signup for providers
const signupForm = document.querySelector("#signup-form form");
if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("new-email").value.trim();
    const password = document.getElementById("new-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCred.user.uid;

      await setDoc(doc(db, "providercreds", uid), {
        name,
        email,
        uid,
        createdAt: Timestamp.now()
      });

      alert(" Provider account created!");
      window.location.href = "providerlogin.html";
    } catch (err) {
      alert(" Signup failed: " + err.message);
    }
  });
}

// Login for providers
const loginForm = document.querySelector("#loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const user = userCred.user;

      const providerSnap = await getDocs(query(collection(db, "providercreds"), where("email", "==", email)));
      if (!providerSnap.empty) {
        window.location.href = "provider_dashboard.html";
        return;
      }

      alert(" Login failed: Not a registered provider.");
    } catch (err) {
      alert(" Login failed: " + err.message);
    }
  });
}
