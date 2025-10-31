// ============================================
// CONFIGURACIÓN - REEMPLAZA CON TUS DATOS
// ============================================

// EmailJS Config - Obtén estos valores en emailjs.com
const EMAILJS_PUBLIC_KEY = 'Jq8M5BiGBRUUit3qg';

// const serviceID = 'default_service';
// const templateID = 'template_g4dqdor';;

const btn = document.getElementById('button_contact');

document.getElementById('contactForm')
 .addEventListener('submit', function(event) {
   event.preventDefault();

   btn.value = 'Enviando...';
  
  const EMAILJS_SERVICE_ID = 'default_service';
  const EMAILJS_TEMPLATE_ID = 'template_g4dqdor';

   emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, this)
    .then(() => {
      btn.value = 'Send Email';
      alert('Enviado!');
    }, (err) => {
      btn.value = 'Send Email';
      alert(JSON.stringify(err));
    });
});


// Firebase Config - Obtén estos valores en console.firebase.google.com

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBXJ9XuwHRgYt56Z-hFWK5gwAxAlF7qwAg",
  authDomain: "soluciones-empresariales42.firebaseapp.com",
  projectId: "soluciones-empresariales42",
  storageBucket: "soluciones-empresariales42.firebasestorage.app",
  messagingSenderId: "449506203065",
  appId: "1:449506203065:web:17bf3564d0ae852a4c1268",
  measurementId: "G-MLMS8RQ2X7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// WhatsApp Business Number (formato: 57XXXXXXXXXX)
const WHATSAPP_NUMBER = "573161842153";

// Email de la empresa
const COMPANY_EMAIL = "Sempresariales42@gmail.com";

// ============================================
// INICIALIZACIÓN
// ============================================

// Inicializar EmailJS
if (EMAILJS_PUBLIC_KEY !== 'Jq8M5BiGBRUUit3qg') {
    emailjs.init(Jq8M5BiGBRUUit3qg);
}

// Inicializar Firebase
let db = null;
let auth = null;

if (firebaseConfig.apiKey !== 'TU_API_KEY_AQUI') {
    firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
    auth = firebase.auth();
}

// Verificar sesión al cargar
if (auth) {
    auth.onAuthStateChanged(user => {
        if (user) {
            localStorage.setItem('currentUser', JSON.stringify({
                nombre: user.displayName,
                email: user.email,
                metadata: user.metadata
            }));
        }
    });
}
