# 🎭 Chinchintirapie – Escuela Carnavalera

> **20 años haciendo carnaval en la calle.**

Sitio web oficial de la Escuela Carnavalera Chinchintirapie, una organización comunitaria dedicada a la cultura popular latinoamericana a través de la música, la danza, el teatro callejero y el diseño de vestuario.

---

## 📸 Vista Previa

El sitio incluye un diseño vibrante con tipografías carnavaleras, animaciones dinámicas, paleta cálida (rojos, dorados y crema) y una navegación responsiva con menú hamburguesa para dispositivos móviles.

---

## 🗂️ Estructura del Proyecto

```
web-chinchin/
├── index.html                  # Página principal (Hero, Talleres, Eventos)
├── asset/
│   ├── css/
│   │   ├── styles.css          # Estilos globales (navbar, hero, footer, etc.)
│   │   ├── noticias.css        # Estilos de Hitos Recientes
│   │   ├── cronicas.css        # Estilos de Crónicas
│   │   ├── styleTienda.css     # Estilos de Tienda y Donaciones
│   │   ├── styleHistoria.css   # Estilos de Historia
│   │   ├── styleorganizacion.css # Estilos de Organización
│   │   ├── stylecontacto.css   # Estilos de Contacto
│   │   ├── login.css           # Estilos de Login
│   │   ├── registro.css        # Estilos de Registro
│   │   └── auth.css            # Estilos compartidos de autenticación
│   ├── img/                    # Imágenes (.webp) del sitio
│   ├── js/
│   │   ├── main.js             # Navegación, dropdowns, hamburguesa
│   │   ├── auth-pages.js       # Lógica de login y registro
│   │   ├── mainOrganizacion.js # Interactividad de Organización
│   │   ├── repositorio.js      # Lógica del Repositorio
│   │   ├── cedoc.js            # Lógica del CEDOC
│   │   ├── material-educativo.js # Lógica de Material Educativo
│   │   └── code.js             # Utilidades generales
│   └── video/                  # Videos del sitio
└── components/
    ├── noticias.html            # Hitos Recientes (noticias)
    ├── cronicas.html            # Crónicas editoriales
    ├── historia.html            # Historia de la escuela
    ├── organizacion.html        # Estructura organizacional
    ├── tienda.html              # Tienda conmemorativa y donaciones
    ├── contacto.html            # Formulario de contacto
    ├── repositorio.html         # Repositorio documental
    ├── cedoc.html               # Centro de Documentación (CEDOC)
    ├── material-educativo.html  # Material educativo
    ├── login.html               # Inicio de sesión
    └── registro.html            # Registro de usuario
```

---

## 🚀 Tecnologías

| Tecnología | Uso |
|---|---|
| **HTML5** | Estructura semántica |
| **CSS3** | Diseño visual, animaciones, responsividad |
| **JavaScript (Vanilla)** | Interactividad, navegación, formularios |
| **Bootstrap 5.3** | Carousel en sección de noticias |
| **Google Fonts** | Bangers, Boogaloo, Pacifico, Nunito |

---

## 🎨 Paleta de Colores

| Variable | Color | Uso |
|---|---|---|
| `--rojo` | `#C0392B` | Acentos, CTA, sombras de texto |
| `--naranja` | `#E67E22` | Hovers, degradados |
| `--amarillo` | `#F1C40F` | Títulos, texto destacado |
| `--dorado` | `#D4A017` | Bordes, navbar, botones |
| `--crema` | `#FDF6E3` | Fondo principal |
| `--oscuro` | `#2C1A0E` | Navbar, footer, cards oscuras |

---

## 📱 Responsividad

El sitio es completamente responsivo con breakpoints en:

- **1024px** — Tablet landscape
- **900px** — Tablet portrait
- **768px** — Tablet pequeña
- **640px** — Móvil (menú hamburguesa)
- **480px** — Móvil pequeño

---

## 🏃 Cómo Ejecutar

1. Clona el repositorio:
   ```bash
   git clone https://github.com/brandondic/web-chinchin.git
   ```
2. Abre `index.html` en tu navegador, o usa un servidor local:
   ```bash
   npx serve .
   ```

---

## 📄 Secciones del Sitio

- **Inicio** — Hero animado, tarjetas informativas, talleres, próximos eventos
- **Historia** — Cronología y trayectoria de 20 años
- **Organización** — Estructura interna (Banda, Baile, Figurines)
- **Hitos Recientes** — Grid de noticias con carousel y filtro por categoría
- **Crónicas** — Layout editorial con artículos destacados y selección editorial
- **Repositorio** — Archivo fotográfico y audiovisual
- **CEDOC** — Centro de documentación con ensayos académicos
- **Material Educativo** — Recursos pedagógicos
- **Tienda / Donaciones** — Productos conmemorativos y formulario de aportes
- **Contacto** — Formulario de contacto
- **Login / Registro** — Autenticación de usuarios

---

## 👥 Talleres

| Taller | Descripción |
|---|---|
| 🥁 Percusión Murga | Bombo, redoblante y platillos colectivos |
| 💃 Danza Andina | Tradiciones andinas y caribeñas fusionadas |
| 👗 Diseño de Vestuario | Trajes con materiales reciclados y artesanales |
| 🎭 Teatro Callejero | Performance, zancos, máscara y dramaturgia popular |

---

## 📝 Licencia

© 2024 Chinchintirapie – Escuela Carnavalera · Hecho con 🎭 y ritmo
