# 🚀 Guía de Implementación Completa
## Soluciones Empresariales - Sitio Web

---

## 📋 PASO 1: CREAR LA ESTRUCTURA DE CARPETAS

### En tu computador crea esta estructura:

```
📁 soluciones-empresariales/
│
├── 📄 index.html
├── 📄 README.md
│
├── 📁 css/
│   └── 📄 styles.css
│
├── 📁 js/
│   ├── 📄 config.js
│   ├── 📄 forms.js
│   └── 📄 portal.js
│
└── 📁 images/
    ├── 🖼️ logo-empresa.png
    ├── 🖼️ galeria-1.jpg
    ├── 🖼️ galeria-2.jpg
    ├── 🖼️ galeria-3.jpg
    ├── 🖼️ galeria-4.jpg
    ├── 🖼️ galeria-5.jpg
    ├── 🖼️ galeria-6.jpg
    └── 📁 partners/
        ├── 🖼️ partner-sanitas.png
        ├── 🖼️ partner-sura.png
        ├── 🖼️ partner-nueva-eps.png
        ├── 🖼️ partner-salud-total.png
        ├── 🖼️ partner-compensar.png
        ├── 🖼️ partner-coomeva.png
        ├── 🖼️ partner-famisanar.png
        └── 🖼️ partner-aliansalud.png
```

---

## 📝 PASO 2: COPIAR LOS ARCHIVOS

He creado 6 archivos principales que debes copiar:

### 1. **index.html** → Raíz del proyecto
### 2. **css/styles.css** → Carpeta css
### 3. **js/config.js** → Carpeta js
### 4. **js/forms.js** → Carpeta js
### 5. **js/portal.js** → Carpeta js
### 6. **README.md** → Raíz del proyecto

---

## 🖼️ PASO 3: AGREGAR IMÁGENES

### Logo de la Empresa
**Archivo:** `images/logo-empresa.png`
- Tamaño: 300x300px o mayor
- Formato: PNG con fondo transparente
- Peso: Máximo 200KB

### Galería (6 imágenes)
**Archivos:** `images/galeria-1.jpg` hasta `galeria-6.jpg`
- Tamaño: 1200x900px (proporción 4:3)
- Formato: JPG
- Peso: 200-500KB cada una
- Contenido sugerido:
  - galeria-1: Instalaciones/Oficina
  - galeria-2: Equipo de trabajo
  - galeria-3: Atención al cliente
  - galeria-4: Área de trabajo
  - galeria-5: Reunión/Asesoría
  - galeria-6: Evento o certificación

### Logos de Empresas Aliadas
**Ubicación:** `images/partners/`
- Tamaño: 400x200px
- Formato: PNG con fondo transparente
- Peso: 50-100KB cada uno

**Logos necesarios:**
1. partner-sanitas.png
2. partner-sura.png
3. partner-nueva-eps.png
4. partner-salud-total.png
5. partner-compensar.png
6. partner-coomeva.png
7. partner-famisanar.png
8. partner-aliansalud.png

💡 **Tip:** Puedes descargar los logos oficiales de las páginas web de cada EPS.

---

## ⚙️ PASO 4: CONFIGURAR SERVICIOS

### 🔹 A. EMAILJS (Envío de correos)

1. Ve a: https://www.emailjs.com
2. Regístrate gratis
3. **Configurar servicio:**
   - Clic en "Email Services" → "Add New Service"
   - Selecciona Gmail/Outlook
   - Conecta tu cuenta: `Sempresariales42@gmail.com`
   - Guarda el **Service ID**

4. **Crear plantilla:**
   - Clic en "Email Templates" → "Create New Template"
   - Nombre: "Solicitud EPS"
   - Contenido:

```
Asunto: Nueva Solicitud EPS - {{radicado}}

Nueva solicitud de afiliación recibida:

DATOS PERSONALES:
- Nombre: {{from_name}}
- Email: {{from_email}}
- Teléfono: {{telefono}}
- Documento: {{documento}}

TRÁMITE:
- Tipo: {{tramite}}
- Fecha: {{fecha}}

OBSERVACIONES:
{{observaciones}}

---
Radicado: {{radicado}}
```

5. Guarda y copia el **Template ID**

6. Ve a "Account" → copia tu **Public Key**

7. **Edita `js/config.js`:**
```javascript
const EMAILJS_PUBLIC_KEY = 'tu_public_key';  // Pega aquí
const EMAILJS_SERVICE_ID = 'tu_service_id';  // Pega aquí
const EMAILJS_TEMPLATE_ID = 'tu_template_id'; // Pega aquí
```

---

### 🔹 B. FORMSPREE (Formulario de contacto)

1. Ve a: https://formspree.io
2. Regístrate gratis
3. Clic en "New Form"
4. Nombre: "Contacto Soluciones Empresariales"
5. Copia el **Form ID** (ejemplo: `mabcdefg`)

6. **Edita `index.html`** (línea ~330):
```html
<form action="https://formspree.io/f/mabcdefg" method="POST">
```
Reemplaza `mabcdefg` con tu Form ID real

---

### 🔹 C. FIREBASE (Base de datos y autenticación)

1. Ve a: https://console.firebase.google.com
2. Clic en "Agregar proyecto"
3. Nombre: "soluciones-empresariales-eps"
4. Desactiva Google Analytics (opcional)
5. Crear proyecto

**Configurar Firestore:**
1. Menú lateral → "Firestore Database"
2. "Crear base de datos"
3. Modo: "Producción"
4. Ubicación: "us-central"
5. Habilitar

**Reglas de Firestore:**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /solicitudes/{document} {
      allow read, write: if request.auth != null;
    }
  }
}
```

**Configurar Authentication:**
1. Menú lateral → "Authentication"
2. "Comenzar"
3. Habilitar "Correo electrónico/contraseña"
4. Guardar

**Obtener configuración:**
1. Configuración del proyecto (⚙️)
2. Tus apps → </> Web
3. Registrar app: "SolucionesEmpresariales"
4. Copiar el objeto `firebaseConfig`

5. **Edita `js/config.js`:**
```javascript
const firebaseConfig = {
    apiKey: "AIza...",           // Pega tus valores
    authDomain: "tu-proyecto.firebaseapp.com",
    projectId: "tu-proyecto",
    storageBucket: "tu-proyecto.appspot.com",
    messagingSenderId: "123456",
    appId: "1:123:web:abc"
};
```

---

### 🔹 D. VIDEO DE YOUTUBE (Opcional)

1. Sube tu video a YouTube
2. Obtén el ID del video:
   - URL: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
   - ID: `dQw4w9WgXcQ` (lo que viene después de `v=`)

3. **Edita `index.html`** (línea ~180):
```html
<iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ"
```
Reemplaza con tu ID real

---

## 🌐 PASO 5: PUBLICAR EL SITIO

### **OPCIÓN A: GitHub Pages (RECOMENDADO - GRATIS)**

1. **Crear repositorio en GitHub:**
   - Ve a https://github.com/new
   - Nombre: `soluciones-empresariales`
   - Público
   - Crear repositorio

2. **Subir archivos:**
   ```bash
   cd soluciones-empresariales
   git init
   git add .
   git commit -m "Sitio web inicial"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/soluciones-empresariales.git
   git push -u origin main
   ```

3. **Activar GitHub Pages:**
   - Ve a Settings del repositorio
   - Pages (menú lateral)
   - Source: `main` branch
   - Save

4. **Tu sitio estará en:**
   `https://TU_USUARIO.github.io/soluciones-empresariales`

---

### **OPCIÓN B: Netlify (MÁS FÁCIL - GRATIS)**

1. Ve a: https://www.netlify.com
2. Sign up con GitHub
3. "Add new site" → "Deploy manually"
4. Arrastra la carpeta completa del proyecto
5. ¡Listo! Tu sitio está publicado
6. URL: `https://nombre-aleatorio.netlify.app`
7. Puedes cambiar el nombre en Settings

---

### **OPCIÓN C: Hosting Tradicional (PAGO)**

**Proveedores recomendados en Colombia:**
- **Hostinger:** ~$15.000/mes
- **GoDaddy:** ~$25.000/mes
- **Colombia Hosting:** ~$18.000/mes

**Pasos:**
1. Compra hosting + dominio (.com.co)
2. Accede al cPanel
3. File Manager → `public_html`
4. Sube todos los archivos
5. Mantén la estructura de carpetas

---

## ✅ PASO 6: VERIFICAR QUE TODO FUNCIONA

### **Checklist de pruebas:**

- [ ] El sitio carga correctamente
- [ ] El logo se ve bien
- [ ] Las imágenes de la galería cargan
- [ ] El video se reproduce (si lo agregaste)
- [ ] Los logos de empresas aliadas se desplazan
- [ ] El formulario de afiliación envía datos
- [ ] El botón de WhatsApp abre correctamente
- [ ] El formulario de contacto funciona
- [ ] El portal del cliente permite registro
- [ ] El portal del cliente permite login
- [ ] Se pueden ver las solicitudes en el portal
- [ ] Las FAQ se abren y cierran
- [ ] El sitio se ve bien en móvil
- [ ] Todos los enlaces funcionan

---

## 🎨 PERSONALIZACIÓN ADICIONAL

### Cambiar colores principales

Edita `css/styles.css` (líneas 9-14):

```css
:root {
    --primary: #2563eb;       /* Azul principal */
    --primary-dark: #1e40af;  /* Azul oscuro */
    --secondary: #10b981;     /* Verde botones */
    --dark: #1f2937;          /* Gris oscuro */
    --light: #f3f4f6;         /* Gris claro */
}
```

### Cambiar estadísticas

Edita `index.html` (líneas 64-83)

### Agregar más servicios

Edita `index.html` (líneas 109-150), duplica un `.service-card`

### Cambiar testimonios

Edita `index.html` (líneas 87-105)

---

## 🆘 SOLUCIÓN DE PROBLEMAS

### ❌ Las imágenes no cargan
**Solución:**
- Verifica nombres exactos (mayúsculas/minúsculas)
- Revisa que estén en las carpetas correctas
- Usa formato correcto (PNG para logo, JPG para fotos)

### ❌ Los formularios no envían
**Solución:**
- Verifica que configuraste los IDs en `js/config.js`
- Abre la consola del navegador (F12) y busca errores
- Verifica conexión a internet

### ❌ El portal no funciona
**Solución:**
- Verifica configuración de Firebase
- Revisa que las reglas de Firestore estén bien
- Confirma que Authentication esté habilitado

### ❌ El sitio no se ve bien en móvil
**Solución:**
- Limpia caché del navegador
- Verifica que `styles.css` esté cargando
- Revisa la sección `@media` en el CSS

---

## 📞 CONTACTO Y SOPORTE

**Soluciones Empresariales**
- **Email:** Sempresariales42@gmail.com
- **WhatsApp:** +57 316 184 2153
- **Ubicación:** Bogotá, Colombia

---

## 🎉 ¡FELICIDADES!

Tu sitio web profesional está listo. Ahora puedes:
- ✅ Recibir solicitudes de afiliación
- ✅ Gestionar clientes
- ✅ Mostrar tus servicios profesionalmente
- ✅ Comunicarte por múltiples canales

**Próximos pasos recomendados:**
1. Configura Google Analytics para estadísticas
2. Agrega un certificado SSL (HTTPS)
3. Optimiza las imágenes para carga rápida
4. Crea contenido para el blog
5. Promociona en redes sociales

---

**¿Necesitas ayuda?** Contacta y te apoyaremos en el proceso. 🚀