// provider.js
import { auth, db } from './firebaseConfig.js';
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('providerForm');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const countryCode = document.getElementById('country-code').value;
    const phone = countryCode + document.getElementById('phone').value.trim();
    const service = document.getElementById('service').value;
    const experience = document.querySelector('input[name="experience"]:checked')?.value || '';
    const daysNodes = document.querySelectorAll('input[name="days"]:checked');
    const days = Array.from(daysNodes).map(day => day.value);
    const description = document.getElementById('description').value.trim();

    if (!password || password.length < 6) {
      alert("Password is required and must be at least 6 characters.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await addDoc(collection(db, "providercreds"), {
        uid: user.uid,
        name,
        email,
        phone,
        service,
        experience,
        days,
        description,
        createdAt: new Date()
      });

      alert("Provider registration successful!");
      form.reset();
      window.location.href = "provider_dashboard.html";  // Update as per your routing

    } catch (error) {
      console.error("Provider registration error:", error);
      if(error.code === 'auth/email-already-in-use'){
        alert("This email is already registered. Please login.");
      } else {
        alert("Registration failed: " + error.message);
      }
    }
  });
});
