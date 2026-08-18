# Clínica Dental Tello — Sitio Web Corporativo

Sitio web oficial de **Clínica Dental Tello**, clínica odontológica del Dr. Daniel Tello ubicada en Los Olivos, Lima, Perú. Construido con Next.js 14 App Router, internacionalización español/inglés y diseño moderno.

---

## Descripción del proyecto

Sitio web corporativo de 7 páginas diseñado para presentar los servicios de la clínica, mostrar el perfil del equipo médico, exhibir un portafolio de casos clínicos reales, permitir agendar citas en línea y facilitar el contacto con pacientes. La identidad visual combina glassmorphism, gradientes, video de fondo y micro-interacciones para transmitir profesionalismo y confianza.

Todo el contenido (textos, estadísticas, datos de contacto, biografía del doctor, servicios) corresponde a información oficial proporcionada por la clínica — no hay datos de ejemplo o inventados.

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

> **Sin Tailwind. Sin librerías de animación externas.** Todas las animaciones y efectos visuales son CSS puro con custom properties y `@keyframes`. Incluso el accordion de preguntas frecuentes usa `<details>/<summary>` nativo del navegador en vez de JavaScript.

> El logo corporativo (`public/logo-horizontal.png`) se usa en el Header y en el Footer (sobre fondo claro con esquinas redondeadas para contrastar con el tema oscuro).

---

## Estructura de páginas

| Ruta | Página | Descripción |
|---|---|---|
| `/es` o `/en` | **Inicio** | Hero con video, estadísticas, marquee de servicios, video de la clínica, servicios destacados |
| `/es/servicios` | **Servicios** | 9 tarjetas de servicios con imagen/placeholder e ícono |
| `/es/casos` | **Casos** | Portafolio de 10 casos clínicos reales con carrusel de fotos antes/después |
| `/es/nosotros` | **Nosotros** | Perfil y formación del Dr. Tello, equipo médico, estadísticas, valores, instalaciones |
| `/es/blog` | **Blog** | 3 artículos sobre salud bucal |
| `/es/citas` | **Agendar cita** | Formulario con validación, sidebar de contacto/horarios, sección de preguntas frecuentes |
| `/es/contacto` | **Contacto** | Datos de contacto reales, redes sociales, foto exterior + mapa real de Google Maps |

---

## Estructura del proyecto

```
clinica-dental-tello/
├── app/
│   ├── globals.css              # Design tokens, keyframes, utilidades globales
│   ├── layout.tsx               # Root layout (fuentes)
│   └── [locale]/
│       ├── layout.tsx           # Header + Footer + WhatsApp button
│       ├── page.tsx             # Inicio (hero video, marquee, video de clínica)
│       ├── page.module.css
│       ├── servicios/
│       ├── casos/               # Portafolio de casos clínicos reales
│       ├── nosotros/            # Doctor, equipo, formación, valores, instalaciones
│       ├── blog/
│       ├── citas/
│       │   ├── page.tsx         # Server wrapper
│       │   └── AppointmentForm.tsx  # Client component: validación + FAQ
│       └── contacto/
├── components/
│   ├── Header/                  # Sticky con glassmorphism al scroll, toggle idioma ES|EN
│   ├── Footer/                  # Grid 3 columnas, dark theme, fondo aurora animado
│   ├── WhatsAppButton/          # Flotante con animación pulse-glow
│   └── ui/
│       ├── ServiceCard.tsx      # Tarjeta con imagen 16:10 + badge ícono
│       ├── BlogCard.tsx         # Tarjeta con imagen + badge categoría
│       ├── StatCard.tsx         # Glassmorphism con gradient text
│       ├── CaseCarousel.tsx     # Carrusel de fotos para cada caso clínico
│       ├── FaqAccordion.tsx     # Accordion nativo (<details>) para preguntas frecuentes
│       └── Reveal.tsx           # Scroll reveal con IntersectionObserver
├── messages/
│   ├── es.json                  # Contenido en español (fuente de verdad)
│   └── en.json                  # Contenido en inglés
├── public/
│   ├── logo-horizontal.png      # Logo corporativo (Header + Footer)
│   ├── videos/                  # hero.mp4, clinica.mp4 (fondo del hero y sección clínica)
│   └── images/
│       ├── brand/                # Logos
│       ├── home/                 # hero.png
│       ├── services/             # 6 servicios con foto (3 nuevos aún sin foto)
│       ├── about/                 # doctor-tello.png
│       ├── blog/                  # 3 artículos
│       ├── clinic/                # fachada, consultorio, recepción, sala de espera, equipos
│       └── casos/                 # 10 carpetas con fotos reales de casos clínicos
├── middleware.ts                # Enrutamiento de locales (es/en)
├── i18n.ts                      # Configuración next-intl
└── next.config.mjs              # Config Next.js con plugin i18n
```

---

## Sistema de diseño

### Paleta de colores

| Variable | Color | Uso |
|---|---|---|
| `--color-primary` | `#0E7C66` (verde petróleo) | Acciones principales, links |
| `--color-secondary` | `#3ECFB2` (esmeralda) | Acentos, badges |
| `--color-accent` | `#FF7A59` (coral) | Detalles de énfasis |
| `--color-text` | `#12312C` | Texto principal |
| `--color-bg` | `#FDFAF4` (crema cálido) | Fondo base |
| `--color-bg-soft` | `#F4EEE2` | Secciones alternadas |
| `--color-bg-dark` / `--color-bg-darker` | verde muy oscuro | Footer, secciones oscuras |
| `.section--blue` | gradiente petróleo + blobs | Secciones de acento (servicios destacados, stats, blog) |

> **Secciones de acento:** la clase global `.section--blue` aplica un fondo con gradiente multicapa (radiales + patrón de puntos sutil) para romper el predominio de fondos claros. Las tarjetas blancas y de glassmorphism contrastan sobre ella. Solo los títulos/subtítulos dentro de `.section-header` se invierten a blanco — el contenido de las tarjetas conserva sus colores. El Footer usa un fondo "aurora" animado (`--aurora-dark`, capas radiales que se desplazan con `@keyframes aurora`).

### Tipografía

- **Títulos:** Plus Jakarta Sans (400 / 500 / 600 / 700)
- **Cuerpo:** Inter (400 / 500)

### Efectos visuales

- Gradientes lineales y radiales en hero, botones, badges e íconos
- Glassmorphism (`backdrop-filter: blur`) en header al scroll, tarjetas de valores y stats
- Videos de fondo en el hero y en la sección "Nuestra clínica" del inicio (`autoPlay muted loop playsInline`)
- Marquee animado con los 9 servicios en la página de inicio
- Grano sutil (`body::after`) sobre toda la página vía SVG de ruido
- Animaciones CSS: `fadeUp`, `fadeIn`, `scaleIn`, `float`, `shimmer`, `pulse-glow`, `aurora`, `marquee`
- Scroll reveal con `IntersectionObserver` (sin librería JS, solo CSS transitions)
- Hover states en todos los elementos interactivos

---

## Internacionalización

El sitio está disponible en **español** (por defecto) e **inglés**:

- `/es/...` → Español
- `/en/...` → English

El cambio de idioma está integrado en el Header como un **toggle tipo pill ES | EN**: el idioma activo se resalta con fondo sólido y el inactivo queda en gris. Cada opción enlaza a la misma ruta en el otro idioma. Los textos se gestionan en `messages/es.json` y `messages/en.json`, con las mismas claves espejadas en ambos archivos.

---

## Contenido oficial

Todo el texto del sitio (estadísticas, biografía del doctor, servicios, horarios, datos de contacto) proviene de un formulario de contenido oficial completado por la clínica, no de datos de ejemplo. Puntos clave:

- **Identidad:** 26+ años de experiencia, +5,000 pacientes atendidos, 7 especialidades clínicas.
- **Dr. Daniel Tello Fernández** — Cirujano Dentista, COP 15480 · RNE 5532. Pregrado en la Universidad Inca Garcilaso de la Vega; especialización en el Instituto GROIS (Brasil) y FACOP (Brasil).
- **Equipo médico:** Dr. Wilber Tello Fernández (Implantólogo), Dr. Miguel Córdova García (Cirujano Dentista General), Dr. Edwin Del Pino Palomino (Cirujano Dental, Implantólogo) — sección "Nuestro Equipo" en `/nosotros`.
- **9 servicios:** los 6 originales (Ortodoncia, Implantes, Limpieza, Blanqueamiento, Odontopediatría, Urgencias) más 3 agregados con la info real de la clínica: Rehabilitación Oral, Estética Dental y Cirugía Dental.
- **FAQ real** (5 preguntas) en la página de Citas: seguros/EPS, financiamiento, duración de consulta, edad mínima de atención, emergencias fuera de horario.
- **Contacto real:** WhatsApp/teléfono `+51 942 661 120`, correo `dgt_21@hotmail.com`, dirección Av. Próceres de Huandoy 7865, Urb. Pro, Los Olivos, Lima. Horarios: Lun–Vie 9am–1pm y 3pm–8pm, Sáb 9am–1pm y 3pm–6pm, domingos/feriados cerrado salvo urgencias por WhatsApp.
- **Redes sociales reales:** Instagram e TikTok (`@dr.daniel.tello`). Facebook no está enlazado — el formulario no confirmó un handle real, así que no se inventó ninguno.

---

## Imágenes y video

Las imágenes y videos reales **ya están subidos** y organizados en `public/images/` y `public/videos/`. El código muestra un placeholder con degradado para cualquier ruta que aún no tenga foto.

| Carpeta / archivo | Estado | Usado en |
|---|---|---|
| `videos/hero.mp4` | ✅ Subido | Hero de inicio |
| `videos/clinica.mp4` | ✅ Subido | Sección "Nuestra clínica" del inicio |
| `images/home/hero.png` | ✅ Subida | Fallback / metadata |
| `images/services/` (6 de 9) | ✅ Subidas | Ortodoncia, Implantes, Limpieza, Blanqueamiento, Odontopediatría, Urgencias |
| `images/services/` (3 nuevas) | ⏳ Pendiente (placeholder) | Rehabilitación Oral, Estética Dental, Cirugía Dental |
| `images/about/doctor-tello.png` | ✅ Subida | Página Nosotros |
| `images/clinic/` | ✅ Subidas (7 fotos) | Fachada, consultorio, recepción, sala de espera, equipos — Nosotros y Contacto |
| `images/blog/` (3) | ✅ Subidas | Página Blog |
| `images/casos/` (10 carpetas) | ✅ Subidas (26 fotos) | Página Casos — antes/después reales, con consentimiento del paciente |
| `public/logo-horizontal.png` | ✅ Subida | Header + Footer |

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

El proyecto está desplegado en **Vercel**, conectado a la rama `master` de este repositorio — cada push a `master` dispara un nuevo build automáticamente.

1. No se requieren variables de entorno para el funcionamiento básico
2. Vercel detecta automáticamente Next.js y configura el build

Para otros proveedores, ejecutar `npm run build` y servir la carpeta `.next/`.

---

## Repositorio

[github.com/Mathifa59/Clinica-Dental-Tello](https://github.com/Mathifa59/Clinica-Dental-Tello)

---

## Pendiente / próximos pasos

- [ ] Fotos para los 3 servicios nuevos: `oral-rehab.jpg`, `aesthetics.jpg`, `surgery.jpg` en `public/images/services/`
- [ ] Confirmar handle real de Facebook si la clínica quiere ese ícono en Footer/Contacto
- [ ] Conectar el formulario de citas a un backend o servicio de email (Resend, EmailJS, etc.) — hoy simula el envío con `setTimeout`, las solicitudes deberían llegar a `dgt_21@hotmail.com`
- [ ] Añadir dominio personalizado en Vercel

---

## Historial de cambios

### 17 jun 2026 — Contenido oficial de la clínica
- Reemplazo de todos los datos de ejemplo por información oficial: estadísticas (26+ años, +5,000 pacientes, 7 especialidades), biografía del Dr. Tello en primera persona, credenciales (COP/RNE) y formación académica.
- Nueva sección **"Nuestro Equipo"** en `/nosotros` con los 3 doctores adicionales de la clínica.
- **3 servicios nuevos** (Rehabilitación Oral, Estética Dental, Cirugía Dental) sumados a servicios, al marquee del inicio y al formulario de citas.
- Nueva sección de **preguntas frecuentes** (componente `FaqAccordion`, HTML nativo sin JS) en la página de Citas.
- Datos de contacto reales en todo el sitio: WhatsApp `+51 942 661 120`, correo, dirección y horarios reales.
- Redes sociales reales (Instagram, TikTok); se retiró el enlace de Facebook por no tener handle confirmado.

### 16 jun 2026 (dispositivo B) — Rediseño visual completo
- Nueva paleta: verde petróleo / esmeralda / coral sobre fondo crema (reemplaza el azul índigo original).
- Video de fondo en el hero y en la sección "Nuestra clínica" (reemplaza fotos estáticas).
- Marquee animado de servicios en el inicio.
- Nueva página **Casos** con portafolio de 10 casos clínicos reales (26 fotos).
- Fotos reales de instalaciones (fachada, consultorio, recepción, sala de espera, equipos).
- Fondo "aurora" animado en el Footer.

### 16 jun 2026 (dispositivo A) — Imágenes, logo e idioma
- Imágenes reales organizadas en `public/images/` (hero, servicios, doctor, blog, exterior).
- Logo corporativo integrado en Header y Footer.
- Selector de idioma convertido a toggle ES | EN estilo pill.
- Secciones con fondo de acento (`.section--blue`) para dar contraste visual.
- Mapa real de Google Maps embebido en Contacto.
- Fix del ícono de servicio que se veía recortado por el borde de la foto.

---

*Desarrollado con Next.js 14 · CSS Modules · next-intl*
