// ============================================
// MANEJO DE FORMULARIO DE AFILIACIÓN
// ============================================

async function handleAffiliateSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    const messageDiv = document.getElementById('formMessage');
    
    // Deshabilitar botón
    submitButton.disabled = true;
    submitButton.textContent = 'Enviando...';
    
    // Convertir FormData a objeto
    const data = {
        tipoDocumento: formData.get('tipoDocumento'),
        numeroDocumento: formData.get('numeroDocumento'),
        nombres: formData.get('nombres'),
        apellidos: formData.get('apellidos'),
        email: formData.get('email'),
        telefono: formData.get('telefono'),
        tipoTramite: formData.get('tipoTramite'),
        observaciones: formData.get('observaciones'),
        fecha: new Date().toLocaleDateString('es-CO'),
        hora: new Date().toLocaleTimeString('es-CO'),
        estado: 'En Revisión',
        radicado: 'RAD-' + Date.now()
    };
    
    messageDiv.style.display = 'block';
    messageDiv.className = 'alert alert-info';
    messageDiv.innerHTML = '⏳ Procesando tu solicitud...';
    
    try {
        // 1. Enviar por EmailJS
        if (EMAILJS_SERVICE_ID !== 'TU_SERVICE_ID_AQUI') {
            await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
                to_email: COMPANY_EMAIL,
                from_name: `${data.nombres} ${data.apellidos}`,
                from_email: data.email,
                telefono: data.telefono,
                documento: `${data.tipoDocumento} - ${data.numeroDocumento}`,
                tramite: data.tipoTramite,
                observaciones: data.observaciones,
                radicado: data.radicado,
                fecha: data.fecha
            });
        }
        
        // 2. Guardar en Firebase
        if (db) {
            await db.collection('solicitudes').add(data);
        }
        
        // 3. Guardar en localStorage (backup)
        const solicitudes = JSON.parse(localStorage.getItem('solicitudes') || '[]');
        solicitudes.push(data);
        localStorage.setItem('solicitudes', JSON.stringify(solicitudes));
        
        // Mostrar mensaje de éxito
        messageDiv.className = 'alert alert-success';
        messageDiv.innerHTML = `
            ✅ <strong>¡Solicitud enviada exitosamente!</strong><br>
            Número de radicado: <strong>${data.radicado}</strong><br>
            Te contactaremos a <strong>${data.email}</strong> en las próximas 24-48 horas.<br>
            Puedes consultar el estado de tu solicitud en el Portal del Cliente.
        `;
        
        // Limpiar formulario
        form.reset();
        
        // Ocultar mensaje después de 10 segundos
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 10000);
        
    } catch (error) {
        console.error('Error:', error);
        messageDiv.className = 'alert alert-error';
        messageDiv.innerHTML = `
            ❌ <strong>Error al enviar la solicitud</strong><br>
            ${error.message}<br>
            Por favor, intenta nuevamente o contáctanos por WhatsApp.
        `;
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Enviar Solicitud';
    }
}

// ============================================
// WHATSAPP
// ============================================

function sendWhatsApp() {
    const form = document.getElementById('affiliateForm');
    const formData = new FormData(form);
    
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    
    const mensaje = `
*Nueva Solicitud de Afiliación EPS*
*Soluciones Empresariales*

📋 *Datos Personales:*
• Tipo Doc: ${formData.get('tipoDocumento')}
• Número: ${formData.get('numeroDocumento')}
• Nombre: ${formData.get('nombres')} ${formData.get('apellidos')}

📧 *Contacto:*
• Email: ${formData.get('email')}
• Teléfono: ${formData.get('telefono')}

🏥 *Trámite:*
• Tipo: ${formData.get('tipoTramite')}

💬 *Observaciones:*
${formData.get('observaciones') || 'Ninguna'}
    `.trim();
    
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
}

// ============================================
// FAQ
// ============================================

function toggleFAQ(element) {
    const answer = element.nextElementSibling;
    const isActive = answer.classList.contains('active');
    
    // Cerrar todas las respuestas
    document.querySelectorAll('.faq-answer').forEach(ans => {
        ans.classList.remove('active');
    });
    
    // Abrir la seleccionada si no estaba activa
    if (!isActive) {
        answer.classList.add('active');
    }
}