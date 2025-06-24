import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  Timestamp
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";
import {
  getAuth,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

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
const db = getFirestore(app);
const auth = getAuth(app);

window.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('serviceRequestForm');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Wait for auth state
    const user = await new Promise((resolve) => {
      const unsub = onAuthStateChanged(auth, (u) => {
        unsub();
        resolve(u);
      });
    });

    if (!user) {
      alert("Please log in first.");
      window.location.href = "../login.html";
      return;
    }

    // Get form values
    const selectedDateStr = form.selectedDate.value;
    const selectedTime = form.selectedTime.value;
    const description = form.description.value.trim();
    const serviceType = form.serviceType.value;

    if (!selectedDateStr) {
      alert("Please select a date.");
      return;
    }
    if (!selectedTime) {
      alert("Please select a time.");
      return;
    }
    if (!description) {
      alert("Please describe your issue.");
      return;
    }

    // Convert date string (day of month) to Date object with current month/year
    const today = new Date();
    const selectedDay = parseInt(selectedDateStr, 10);
    const selectedDate = new Date(today.getFullYear(), today.getMonth(), selectedDay);

    try {
      await addDoc(collection(db, "requests"), {
        uid: user.uid,
        serviceType,
        description,
        date: selectedDate,
        time: selectedTime,
        reqTime: Timestamp.now(),
        status: "pending",
        userCompleted: false,
        providerCompleted: false,
        providerId: null
      });

      alert("Request submitted!");
      window.location.href = "../customer_dashboard.html";
    } catch (error) {
      alert("Error submitting request: " + error.message);
      console.error(error);
    }
  });
});
