# Clínica Dental Tello — Sitio Web Corporativo

Sitio web oficial de **Clínica Dental Tello**, clínica odontológica ubicada en Lima, Perú. Construido con Next.js 14 App Router, internacionalización español/inglés y diseño moderno.

---

## Descripción del proyecto

Sitio web corporativo de 6 páginas diseñado para presentar los servicios de la clínica, mostrar el perfil del equipo médico, permitir agendar citas en línea y facilitar el contacto con pacientes. La identidad visual combina glassmorphism, gradientes y micro-interacciones para transmitir profesionalismo y confianza.

---

## Stack tecnológico

| Tecnología | Versión | Uso |
|---|---|---|
| Next.js | 14.2.5 | Framework principal — App Router |
| TypeScript | 5.x | Tipado estático |
| next-intl | 3.15.3 | Internacionalización ES / EN |
| CSS Modules | — | Estilos encapsulados por componente |
| next/image | built-in | Optimización automática de imágenes |
| next/font | built-in | Plus Jakarta Sans + Inter (Google Fonts) |

> **Sin Tailwind. Sin librerías de animación externas.** Todas las animaciones y efectos visuales son CSS puro con custom properties y `@keyframes`.

> El logo corporativo (`public/logo-horizontal.png`) se usa en el Header y en el Footer (sobre fondo claro con esquinas redondeadas para contrastar con el tema oscuro).

---

## Estructura de páginas

| Ruta | Página | Descripción |
|---|---|---|
| `/es` o `/en` | **Inicio** | Hero con foto, estadísticas, sección de clínica, 3 servicios destacados |
| `/es/servicios` | **Servicios** | 6 tarjetas de servicios con imagen y descripción |
| `/es/nosotros` | **Nosotros** | Perfil del Dr. Tello, estadísticas, valores de la clínica |
| `/es/blog` | **Blog** | 3 artículos sobre salud bucal |
| `/es/citas` | **Agendar cita** | Formulario con validación, sidebar con horarios e imagen |
| `/es/contacto` | **Contacto** | Datos de contacto, redes sociales, foto exterior + mapa real de Google Maps |

---

## Estructura del proyecto

```
clinica-dental-tello/
├── app/
│   ├── globals.css              # Design tokens, keyframes, utilidades globales
│   ├── layout.tsx               # Root layout (fuentes)
│   └── [locale]/
│       ├── layout.tsx           # Header + Footer + WhatsApp button
│       ├── page.tsx             # Inicio
│       ├── page.module.css
│       ├── servicios/
│       ├── nosotros/
│       ├── blog/
│       ├── citas/
│       │   ├── page.tsx         # Server wrapper
│       │   └── AppointmentForm.tsx  # Client component con validación
│       └── contacto/
├── components/
│   ├── Header/                  # Sticky con glassmorphism al scroll
│   ├── Footer/                  # Grid 3 columnas, dark theme
│   ├── WhatsAppButton/          # Flotante con animación pulse-glow
│   └── ui/
│       ├── ServiceCard.tsx      # Tarjeta con imagen 16:10 + badge ícono
│       ├── BlogCard.tsx         # Tarjeta con imagen + badge categoría
│       ├── StatCard.tsx         # Glassmorphism con gradient text
│       └── Reveal.tsx           # Scroll reveal con IntersectionObserver
├── messages/
│   ├── es.json                  # Contenido en español
│   └── en.json                  # Contenido en inglés
├── public/
│   ├── logo-horizontal.png      # Logo corporativo (Header + Footer)
│   └── images/                  # Fotos del sitio (organizadas por sección)
│       ├── home/                # hero.png (+ clinica-interior pendiente)
│       ├── services/            # 6 servicios
│       ├── about/               # doctor-tello.png
│       ├── blog/                # 3 artículos
│       └── clinic/              # exterior.png
├── middleware.ts                # Enrutamiento de locales (es/en)
├── i18n.ts                      # Configuración next-intl
└── next.config.mjs              # Config Next.js con plugin i18n
```

---

## Sistema de diseño

### Paleta de colores

| Variable | Color | Uso |
|---|---|---|
| `--color-primary` | `#4554A1` (azul índigo) | Acciones principales, links |
| `--color-secondary` | `#5BBDB1` (verde-azul) | Acentos, éxitos, WhatsApp badge |
| `--color-text` | `#1A1F36` | Texto principal |
| `--color-bg` | `#FFFFFF` | Fondo base |
| `--color-bg-soft` | `#F7F8FC` | Secciones alternadas |
| `.section--blue` | gradiente índigo + blobs | Secciones de acento (servicios destacados, stats, blog) |

> **Secciones azules:** la clase global `.section--blue` aplica un fondo con gradiente multicapa (radiales turquesa/índigo + patrón de puntos sutil) para romper el predominio del blanco. Las tarjetas blancas y de glassmorphism contrastan sobre ella. Solo los títulos/subtítulos dentro de `.section-header` se invierten a blanco — el contenido de las tarjetas conserva sus colores.

### Tipografía

- **Títulos:** Plus Jakarta Sans (400 / 500 / 600 / 700)
- **Cuerpo:** Inter (400 / 500)

### Efectos visuales

- Gradientes lineales y radiales en hero, botones, badges e íconos
- Glassmorphism (`backdrop-filter: blur`) en header al scroll y tarjetas de valores
- Animaciones CSS: `fadeUp`, `fadeIn`, `scaleIn`, `float`, `blobFloat`, `shimmer`, `pulse-glow`
- Scroll reveal con `IntersectionObserver` (sin librería JS, solo CSS transitions)
- Hover states en todos los elementos interactivos

---

## Internacionalización

El sitio está disponible en **español** (por defecto) e **inglés**:

- `/es/...` → Español
- `/en/...` → English

El cambio de idioma está integrado en el Header como un **toggle tipo pill ES | EN**: el idioma activo se resalta con fondo azul y el inactivo queda en gris. Cada opción enlaza a la misma ruta en el otro idioma. Los textos se gestionan en `messages/es.json` y `messages/en.json`.

---

## Imágenes

Las imágenes reales **ya están subidas** y organizadas en sus carpetas dentro de `public/images/`. El código sigue mostrando un placeholder con degradado para cualquier ruta que aún no tenga foto.

| Carpeta / archivo | Estado | Usado en |
|---|---|---|
| `home/hero.png` | ✅ Subida | Hero de inicio |
| `home/clinica-interior.jpg` | ⏳ Pendiente (placeholder) | Sección "Nuestra clínica" del inicio |
| `services/orthodontics.jpg` … `emergency.jpg` (6) | ✅ Subidas | Servicios e inicio |
| `about/doctor-tello.png` | ✅ Subida | Página Nosotros |
| `blog/frecuencia-visitas.jpg`, `implantes-dentales.jpg`, `estres-salud-bucal.jpg` | ✅ Subidas | Página Blog |
| `clinic/exterior.png` | ✅ Subida | Página Contacto |
| `public/logo-horizontal.png` | ✅ Subida | Header + Footer |

> Para reemplazar el placeholder del interior de la clínica, sube la foto a `public/images/home/clinica-interior.jpg` y actualiza la constante `CLINIC_IMAGE` en [`app/[locale]/page.tsx`](app/[locale]/page.tsx).

Consulta [`public/images/LEEME.md`](public/images/LEEME.md) para dimensiones recomendadas.

---

## Instalación y desarrollo

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
# → http://localhost:3000 (redirige automáticamente a /es)

# Verificar build de producción
npm run build
```

Requiere **Node.js 18+**.

---

## Despliegue

El proyecto está listo para desplegarse en **Vercel** (recomendado para Next.js):

1. Importar el repositorio en [vercel.com](https://vercel.com)
2. No se requieren variables de entorno para el funcionamiento básico
3. Vercel detecta automáticamente Next.js y configura el build

Para otros proveedores, ejecutar `npm run build` y servir la carpeta `.next/`.

---

## Repositorio

[github.com/Mathifa59/Clinica-Dental-Tello](https://github.com/Mathifa59/Clinica-Dental-Tello)

---

## Pendiente / próximos pasos

- [x] Subir las fotos reales a `public/images/` *(hero, servicios, doctor, blog, exterior y logo)*
- [x] Integrar el logo corporativo en Header y Footer
- [x] Convertir el selector de idioma en un toggle ES | EN
- [x] Añadir secciones con fondo azul para dar contraste visual
- [x] Actualizar la dirección real a **Av. Próceres De Huandoy 7865, Ur Pro, Los Olivos** en `messages/es.json`, `messages/en.json` (contacto + footer)
- [x] Integrar mapa real de Google Maps en la página de Contacto
- [ ] Subir la foto del interior de la clínica (`public/images/home/clinica-interior.jpg`)
- [ ] Actualizar número de WhatsApp real en `components/WhatsAppButton/WhatsAppButton.tsx`, `components/Footer/Footer.tsx` y la página de Contacto (actualmente `51999999999`)
- [ ] Actualizar teléfono y correo reales en `messages/es.json` y `messages/en.json`
- [ ] Conectar formulario de citas a un backend o servicio de email (Resend, EmailJS, etc.)
- [ ] Añadir dominio personalizado en Vercel

---

## Cambios recientes (16 jun 2026)

- **Imágenes reales** organizadas en `public/images/` (hero, 6 servicios, Dr. Tello, 3 del blog, exterior).
- **Logo corporativo** (`logo-horizontal.png`) integrado en Header y Footer.
- **Toggle de idioma ES | EN** estilo pill en el Header (antes era un botón único).
- **Secciones azules** (`.section--blue`) con gradiente multicapa y patrón de puntos para dar contraste; aplicadas a servicios destacados (inicio), estadísticas (nosotros) y artículos (blog).
- **Dirección actualizada** a la ubicación real en Los Olivos + **mapa de Google Maps** embebido en Contacto.
- **Fix de las tarjetas de servicio:** el badge de ícono ya no se recorta — la imagen se recorta en un contenedor interno (`imageClip`) mientras el badge puede sobresalir hacia el cuerpo de la tarjeta.

---

*Desarrollado con Next.js 14 · CSS Modules · next-intl*
