// ============================================
// CONFIGURACIÓN - REEMPLAZA CON TUS DATOS
// ============================================

// EmailJS Config - Obtén estos valores en emailjs.com
// const EMAILJS_PUBLIC_KEY = 'TU_PUBLIC_KEY_AQUI';
// const EMAILJS_SERVICE_ID = 'TU_SERVICE_ID_AQUI';
// const EMAILJS_TEMPLATE_ID = 'TU_TEMPLATE_ID_AQUI';

const btn = document.getElementById('button_contact');

document.getElementById('contactForm')
 .addEventListener('submit', function(event) {
   event.preventDefault();

   btn.value = 'Enviando...';

   const serviceID = 'default_service';
   const templateID = 'template_g4dqdor';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'Send Email';
      alert('Enviado!');
    }, (err) => {
      btn.value = 'Send Email';
      alert(JSON.stringify(err));
    });
});


// Firebase Config - Obtén estos valores en console.firebase.google.com
const firebaseConfig = {
    apiKey: "TU_API_KEY_AQUI",
    authDomain: "TU_PROJECT.firebaseapp.com",
    projectId: "TU_PROJECT_ID",
    storageBucket: "TU_PROJECT.appspot.com",
    messagingSenderId: "TU_SENDER_ID",
    appId: "TU_APP_ID"
};

// WhatsApp Business Number (formato: 57XXXXXXXXXX)
const WHATSAPP_NUMBER = "573161842153";

// Email de la empresa
const COMPANY_EMAIL = "Sempresariales42@gmail.com";

// ============================================
// INICIALIZACIÓN
// ============================================

// Inicializar EmailJS
if (EMAILJS_PUBLIC_KEY !== 'TU_PUBLIC_KEY_AQUI') {
    emailjs.init(EMAILJS_PUBLIC_KEY);
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
