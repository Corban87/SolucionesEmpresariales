// ============================================
// PORTAL DEL CLIENTE
// ============================================

function openPortalModal() {
    document.getElementById('portalModal').classList.add('active');
    checkUserSession();
}

function closePortalModal() {
    document.getElementById('portalModal').classList.remove('active');
}

function showTab(tabName) {
    document.querySelectorAll('#loginSection .tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('#loginSection .tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    event.target.classList.add('active');
    document.getElementById(tabName + 'Tab').classList.add('active');
}

function showDashboardTab(tabName) {
    document.querySelectorAll('#dashboardSection .tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('#dashboardSection .tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    event.target.classList.add('active');
    document.getElementById(tabName + 'Tab').classList.add('active');
    
    if (tabName === 'solicitudes') {
        loadSolicitudes();
    } else if (tabName === 'perfil') {
        loadPerfil();
    }
}

// ============================================
// AUTENTICACIÓN
// ============================================

async function handleLogin(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');
    
    try {
        if (auth) {
            await auth.signInWithEmailAndPassword(email, password);
        } else {
            // Simulación local
            const users = JSON.parse(localStorage.getItem('users') || '{}');
            if (users[email] && users[email].password === password) {
                localStorage.setItem('currentUser', JSON.stringify(users[email]));
            } else {
                throw new Error('Credenciales incorrectas');
            }
        }
        
        showDashboard();
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

async function handleRegister(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const nombre = formData.get('nombre');
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    
    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
    }
    
    try {
        if (auth) {
            const userCredential = await auth.createUserWithEmailAndPassword(email, password);
            await userCredential.user.updateProfile({ displayName: nombre });
        } else {
            // Simulación local
            const users = JSON.parse(localStorage.getItem('users') || '{}');
            users[email] = { nombre, email, password };
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('currentUser', JSON.stringify({ nombre, email }));
        }
        
        alert('¡Registro exitoso!');
        showDashboard();
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

function handleLogout() {
    if (auth) {
        auth.signOut();
    }
    localStorage.removeItem('currentUser');
    document.getElementById('loginSection').style.display = 'block';
    document.getElementById('dashboardSection').classList.remove('active');
}

function checkUserSession() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    
    if (currentUser || (auth && auth.currentUser)) {
        showDashboard();
    } else {
        document.getElementById('loginSection').style.display = 'block';
        document.getElementById('dashboardSection').classList.remove('active');
    }
}

function showDashboard() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    const user = currentUser || (auth && auth.currentUser);
    
    if (user) {
        document.getElementById('userName').textContent = user.nombre || user.displayName || user.email;
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('dashboardSection').classList.add('active');
        loadSolicitudes();
    }
}

// ============================================
// CARGAR DATOS DEL PORTAL
// ============================================

async function loadSolicitudes() {
    const container = document.getElementById('solicitudesList');
    container.innerHTML = '<p>Cargando solicitudes...</p>';
    
    try {
        let solicitudes = [];
        
        if (db) {
            const snapshot = await db.collection('solicitudes').orderBy('fecha', 'desc').get();
            solicitudes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } else {
            solicitudes = JSON.parse(localStorage.getItem('solicitudes') || '[]');
        }
        
        if (solicitudes.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: #6b7280;">No tienes solicitudes registradas</p>';
            return;
        }
        
        container.innerHTML = solicitudes.map(sol => `
            <div class="solicitud-card">
                <div class="solicitud-header">
                    <div>
                        <strong>Radicado: ${sol.radicado}</strong><br>
                        <small style="color: #6b7280;">${sol.fecha} - ${sol.hora || ''}</small>
                    </div>
                    <span class="estado-badge estado-${sol.estado.toLowerCase().replace(' ', '-')}">${sol.estado}</span>
                </div>
                <div>
                    <p><strong>Tipo de Trámite:</strong> ${sol.tipoTramite}</p>
                    <p><strong>Nombre:</strong> ${sol.nombres} ${sol.apellidos}</p>
                    <p><strong>Documento:</strong> ${sol.tipoDocumento} ${sol.numeroDocumento}</p>
                    <p><strong>Email:</strong> ${sol.email}</p>
                    <p><strong>Teléfono:</strong> ${sol.telefono}</p>
                    ${sol.observaciones ? `<p><strong>Observaciones:</strong> ${sol.observaciones}</p>` : ''}
                </div>
            </div>
        `).join('');
        
    } catch (error) {
        console.error('Error cargando solicitudes:', error);
        container.innerHTML = '<p class="alert alert-error">Error al cargar las solicitudes</p>';
    }
}

function loadPerfil() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    const user = currentUser || (auth && auth.currentUser);
    const container = document.getElementById('perfilInfo');
    
    if (user) {
        container.innerHTML = `
            <div class="solicitud-card">
                <p><strong>Nombre:</strong> ${user.nombre || user.displayName || 'No especificado'}</p>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Cuenta creada:</strong> ${user.metadata ? new Date(user.metadata.creationTime).toLocaleDateString('es-CO') : 'No disponible'}</p>
            </div>
        `;
    }
}

// ============================================
// EVENTOS GLOBALES
// ============================================

// Cerrar modal al hacer clic fuera
window.onclick = function(event) {
    const modal = document.getElementById('portalModal');
    if (event.target == modal) {
        closePortalModal();
    }
}