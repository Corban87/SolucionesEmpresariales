# Soluciones Empresariales - Sitio Web de Afiliación a EPS

## 📁 Estructura del Proyecto

```
soluciones-empresariales/
│
├── index.html                    # Página principal
├── README.md                     # Este archivo
│
├── css/
│   └── styles.css               # Todos los estilos
│
├── js/
│   ├── config.js                # Configuración de servicios
│   ├── forms.js                 # Manejo de formularios
│   └── portal.js                # Portal del cliente
│
└── images/
    ├── logo-empresa.png         # Logo principal
    ├── galeria-1.jpg            # Imagen de galería 1
    ├── galeria-2.jpg            # Imagen de galería 2
    ├── galeria-3.jpg            # Imagen de galería 3
    ├── galeria-4.jpg            # Imagen de galería 4
    ├── galeria-5.jpg            # Imagen de galería 5
    ├── galeria-6.jpg            # Imagen de galería 6
    └── partners/
        ├── partner-sanitas.png
        ├── partner-sura.png
        ├── partner-nueva-eps.png
        ├── partner-salud-total.png
        ├── partner-compensar.png
        ├── partner-coomeva.png
        ├── partner-famisanar.png
        └── partner-aliansalud.png
```

## 🚀 Instalación

### 1. Crea la estructura de carpetas

```bash
mkdir soluciones-empresariales
cd soluciones-empresariales
mkdir css js images
mkdir images/partners
```

### 2. Copia los archivos

- `index.html` en la raíz
- `styles.css` en la carpeta `css/`
- `config.js`, `forms.js`, `portal.js` en la carpeta `js/`
- Tus imágenes en la carpeta `images/`
- Logos de empresas aliadas en `images/partners/`

### 3. Actualiza el `index.html`

Agrega las referencias a los scripts antes del cierre de `</body>`:

```html
<!-- Scripts -->
<script src="js/config.js"></script>
<script src="js/forms.js"></script>
<script src="js/portal.js"></script>
```

## ⚙️ Configuración de Servicios

### 1. EmailJS (Envío de emails)

Edita `js/config.js`:

```javascript
const EMAILJS_PUBLIC_KEY = 'tu_public_key';
const EMAILJS_SERVICE_ID = 'tu_service_id';
const EMAILJS_TEMPLATE_ID = 'tu_template_id';
```

**Pasos:**
1. Ve a https://www.emailjs.com
2. Regístrate y crea un servicio de email
3. Crea una plantilla de email
4. Copia los IDs y reemplázalos en el código

### 2. Formspree (Formulario de contacto)

Edita `index.html`, línea del formulario de contacto:

```html
<form action="https://formspree.io/f/TU_FORMSPREE_ID" method="POST">
```

**Pasos:**
1. Ve a https://formspree.io
2. Crea un nuevo formulario
3. Copia el ID y reemplázalo

### 3. Firebase (Base de datos)

Edita `js/config.js`:

```javascript
const firebaseConfig = {
    apiKey: "tu_api_key",
    authDomain: "tu_proyecto.firebaseapp.com",
    projectId: "tu_proyecto",
    storageBucket: "tu_proyecto.appspot.com",
    messagingSenderId: "123456789",
    appId: "tu_app_id"
};
```

**Pasos:**
1. Ve a https://console.firebase.google.com
2. Crea un nuevo proyecto
3. Habilita Firestore Database
4. Habilita Authentication (Email/Password)
5. Copia la configuración del proyecto

### 4. Video de YouTube

Edita `index.html`, sección de video:

```html
<iframe src="https://www.youtube.com/embed/TU_VIDEO_ID"
```

Reemplaza `TU_VIDEO_ID` con el ID de tu video de YouTube.

## 🖼️ Imágenes Requeridas

### Logo Principal
- **Nombre:** `logo-empresa.png`
- **Ubicación:** `images/`
- **Tamaño:** 300x300px (mínimo)
- **Formato:** PNG con fondo transparente

### Galería (6 imágenes)
- **Nombres:** `galeria-1.jpg` a `galeria-6.jpg`
- **Ubicación:** `images/`
- **Tamaño:** 1200x900px recomendado
- **Formato:** JPG o PNG

### Logos de Empresas Aliadas (8 logos)
- **Ubicación:** `images/partners/`
- **Tamaño:** 400x200px recomendado
- **Formato:** PNG con fondo transparente
- **Archivos:**
  - `partner-sanitas.png`
  - `partner-sura.png`
  - `partner-nueva-eps.png`
  - `partner-salud-total.png`
  - `partner-compensar.png`
  - `partner-coomeva.png`
  - `partner-famisanar.png`
  - `partner-aliansalud.png`

## 🌐 Publicación

### Opción 1: GitHub Pages (GRATIS)

```bash
# Inicializar repositorio
git init
git add .
git commit -m "Primera versión"

# Crear repositorio en GitHub y subir
git remote add origin https://github.com/tu-usuario/tu-repo.git
git branch -M main
git push -u origin main

# Habilitar GitHub Pages en Settings → Pages
```

Tu sitio estará en: `https://tu-usuario.github.io/tu-repo`

### Opción 2: Netlify (GRATIS)

1. Ve a https://www.netlify.com
2. Arrastra la carpeta del proyecto
3. ¡Listo! Tu sitio está publicado

### Opción 3: Hosting tradicional

1. Sube todos los archivos por FTP
2. Asegúrate de mantener la estructura de carpetas
3. El archivo `index.html` debe estar en la raíz

## 🎨 Personalización

### Cambiar Colores

Edita `css/styles.css`, sección de variables:

```css
:root {
    --primary: #2563eb;      /* Color principal */
    --primary-dark: #1e40af; /* Color principal oscuro */
    --secondary: #10b981;    /* Color secundario */
    --dark: #1f2937;         /* Color oscuro */
    --light: #f3f4f6;        /* Color claro */
}
```

### Cambiar Datos de Contacto

Edita `js/config.js`:

```javascript
const WHATSAPP_NUMBER = "573161842153";
const COMPANY_EMAIL = "Sempresariales42@gmail.com";
```

Y actualiza el HTML en la sección de contacto.

## ✨ Funcionalidades Implementadas

- ✅ Formulario de afiliación con múltiples integraciones
- ✅ Portal del cliente con autenticación
- ✅ Envío por WhatsApp Business
- ✅ Envío por EmailJS
- ✅ Formulario de contacto con Formspree
- ✅ Guardado en Firebase Firestore
- ✅ Backup en localStorage
- ✅ Galería de imágenes dinámica
- ✅ Sección de video
- ✅ Banner de empresas aliadas con scroll automático
- ✅ Diseño responsive (móvil, tablet, desktop)
- ✅ FAQ interactivo
- ✅ Blog de noticias
- ✅ Testimonios de clientes

## 🔧 Solución de Problemas

### Las imágenes no se cargan
- Verifica que los archivos estén en las carpetas correctas
- Revisa que los nombres coincidan exactamente (mayúsculas/minúsculas)
- Asegúrate de usar el formato correcto (PNG, JPG)

### Los formularios no funcionan
- Verifica que hayas configurado los IDs en `js/config.js`
- Revisa la consola del navegador para ver errores
- Asegúrate de tener conexión a internet

### El video no se muestra
- Reemplaza `VIDEO_ID` con tu ID real de YouTube
- Verifica que el video sea público
- Revisa que la URL sea correcta

## 📞 Datos de Contacto de la Empresa

- **Empresa:** Soluciones Empresariales
- **Email:** Sempresariales42@gmail.com
- **WhatsApp:** +57 316 184 2153
- **Dirección:** Calle 100 #19-50, Bogotá

## 📝 Licencia

Este proyecto es propiedad de Soluciones Empresariales.

## 🤝 Soporte

Para soporte técnico, contacta a través de:
- Email: Sempresariales42@gmail.com
- WhatsApp: +57 316 184 2153