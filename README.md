# Clínica Dental Tello — Sitio Web Corporativo

Sitio web oficial de **Clínica Dental Tello**, clínica odontológica del **Dr. Daniel Tello Fernández** (COP 15480 · RNE 5532) ubicada en Los Olivos, Lima, Perú. Construido con Next.js 14 App Router, internacionalización español/inglés y diseño moderno sobre paleta azul/petróleo.

---

## Descripción del proyecto

Sitio web corporativo de 5 páginas diseñado para presentar los servicios de la clínica, mostrar el perfil del Dr. Tello y su equipo, exhibir un portafolio de casos clínicos reales, y permitir agendar citas / contactar a la clínica desde una sola página. La identidad visual combina glassmorphism, gradientes, video de fondo, fondo "aurora" animado y micro-interacciones.

**Todo el contenido es real** (estadísticas, biografía del doctor, formación académica, equipo médico, servicios, horarios, datos de contacto) — proviene de un formulario oficial completado por la clínica, no hay texto de ejemplo ni inventado.

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

> **Sin Tailwind. Sin librerías de animación externas.** Todas las animaciones y efectos visuales son CSS puro con custom properties y `@keyframes`. El acordeón de preguntas frecuentes usa `<details>/<summary>` nativo del navegador, sin JavaScript.

---

## Estructura de páginas

| Ruta | Página | Descripción |
|---|---|---|
| `/es` o `/en` | **Inicio** | Hero con video vertical (entrada al consultorio), estadísticas, marquee animado con los 6 servicios, video de "Nuestra clínica", 3 servicios destacados |
| `/es/servicios` | **Servicios** | 6 tarjetas de servicio (Ortodoncia, Implantes, Urgencias, Rehabilitación Oral, Estética Dental, Cirugía Dental) |
| `/es/casos` | **Casos** | Portafolio de 9 categorías de casos clínicos reales, cada una con carrusel de fotos (antes/después o proceso), con swipe táctil en móvil |
| `/es/nosotros` | **Nosotros** | Perfil, credenciales y formación del Dr. Tello (con estadísticas integradas en la misma columna), equipo médico (3 doctores, sección con fondo oscuro), valores, galería de instalaciones |
| `/es/citas` | **Citas** | Formulario de reserva + FAQ (5 preguntas) + bloque de contacto completo (dirección, horario, redes, teléfono/WhatsApp) + mapa real embebido de Google Maps. Fusiona lo que antes eran dos páginas separadas (Citas y Contacto) alternando franjas oscura/blanca/azul/clara |

> No existen página de Blog ni ruta `/contacto` independiente — se retiraron para simplificar la navegación.

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
│       ├── servicios/
│       ├── casos/               # Portafolio de casos clínicos reales
│       ├── nosotros/            # Doctor, equipo, formación, valores, instalaciones
│       └── citas/
│           ├── page.tsx         # Server wrapper
│           └── AppointmentForm.tsx  # Client component: formulario + FAQ + contacto + mapa
├── components/
│   ├── Header/                  # Sticky con glassmorphism al scroll, toggle idioma ES|EN
│   ├── Footer/                  # Grid 3 columnas, dark theme, fondo aurora animado
│   ├── WhatsAppButton/          # Flotante con animación pulse-glow
│   └── ui/
│       ├── ServiceCard.tsx      # Tarjeta con imagen 16:10 + badge ícono
│       ├── StatCard.tsx         # Glassmorphism con gradient text (variante onDark)
│       ├── CaseCarousel.tsx     # Carrusel táctil (swipe) para cada caso clínico
│       ├── FaqAccordion.tsx     # Accordion nativo (<details>) para preguntas frecuentes
│       └── Reveal.tsx           # Scroll reveal con IntersectionObserver
├── messages/
│   ├── es.json                  # Contenido en español (fuente de verdad)
│   └── en.json                  # Contenido en inglés
├── public/
│   ├── videos/                  # hero.mp4 (vertical, entrada al consultorio), clinica.mp4
│   └── images/
│       ├── brand/                # Logo usado en el Header
│       ├── services/              # 3 de 6 servicios con foto (Ortodoncia, Implantes,
│       │                          #  Urgencias) — faltan Rehabilitación Oral, Estética
│       │                          #  Dental y Cirugía (por eso están destacados en
│       │                          #  Inicio, a la espera de sus fotos)
│       ├── about/                 # doctor-tello.png
│       ├── clinic/                # fachada, consultorio, recepción, sala de espera, equipos
│       └── casos/                 # 9 carpetas con fotos reales de casos clínicos
├── middleware.ts                # Enrutamiento de locales (es/en)
├── i18n.ts                      # Configuración next-intl
└── next.config.mjs              # Config Next.js con plugin i18n
```

---

## Sistema de diseño

### Paleta de colores — Azul/Petróleo (Propuesta #3, aprobada por el cliente)

| Variable | Color | Uso |
|---|---|---|
| `--color-primary` | `#197D9F` (azul petróleo) | Acciones principales, links |
| `--color-secondary` | `#009F99` (teal) | Acentos, badges |
| `--color-accent` | `#4DC7C1` (turquesa claro) | Detalles de énfasis, marquee |
| `--color-text` | `#102E38` | Texto principal |
| `--color-bg` | `#FAFCFC` | Fondo base |
| `--color-bg-soft` | `#EAF4F4` | Secciones alternadas |
| `--color-bg-dark` / `--color-bg-darker` | `#072F3B` / `#041E26` | Hero, Footer, secciones oscuras |

> **Fondo "aurora":** las secciones oscuras (`.section--dark`, hero de Inicio, page-hero de páginas internas, Footer) usan `--aurora-dark`, cuatro capas de radiales azul/teal que se desplazan lentamente con `@keyframes aurora`, con `h2`/`h3`/`p` invertidos automáticamente a texto claro. `.section--blue` es la variante más sutil para romper franjas blancas consecutivas (usada en Citas).

> El logo aún no fue actualizado por la agencia a la nueva paleta — sigue pendiente.

### Tipografía

- **Títulos:** Plus Jakarta Sans (400 / 500 / 600 / 700)
- **Cuerpo:** Inter (400 / 500)

### Efectos visuales

- Gradientes lineales y radiales en hero, botones, badges e íconos
- Glassmorphism (`backdrop-filter: blur`) en header al scroll, tarjetas de valores/equipo/stats
- Videos de fondo verticales en el hero y en "Nuestra clínica" del inicio (`autoPlay muted loop playsInline`, sin controles nativos ni picture-in-picture)
- Marquee animado con los 6 servicios en la página de inicio
- Grano sutil (`body::after`) sobre toda la página vía SVG de ruido
- Animaciones CSS: `fadeUp`, `fadeIn`, `scaleIn`, `float`, `shimmer`, `pulse-glow`, `aurora`, `marquee`
- Scroll reveal con `IntersectionObserver` (sin librería JS, solo CSS transitions)
- Carrusel de Casos con swipe táctil y flechas siempre visibles en pantallas táctiles

---

## Internacionalización

El sitio está disponible en **español** (por defecto) e **inglés**:

- `/es/...` → Español
- `/en/...` → English

El cambio de idioma está integrado en el Header como un toggle. Los textos se gestionan en `messages/es.json` y `messages/en.json`, con las mismas claves espejadas en ambos archivos.

---

## Contenido oficial

Datos reales actualmente en el sitio:

- **26+ años** de experiencia, **+5,000 pacientes**, **7 especialidades**
- Dirección: Av. Próceres de Huandoy 7865, Urb. Pro, Los Olivos, Lima
- Teléfono/WhatsApp: +51 942 661 120 · Correo: dgt_21@hotmail.com
- Horario: Lun–Vie 9am–1pm y 3pm–8pm · Sáb 9am–1pm y 3pm–6pm · Dom y feriados cerrado (urgencias por WhatsApp)
- Formación del Dr. Tello: pregrado en Universidad Inca Garcilaso de la Vega; especialización en Implantología (Instituto GROIS, Río Branco, Brasil) y en Rehabilitación Oral y Estética (FACOP, Brasil)
- Equipo: Dr. Wilber Tello Fernández (Implantólogo), Dr. Miguel Córdova García (Cirujano Dentista General), Dr. Edwin Del Pino Palomino (Cirujano Dental, Implantólogo)

---

## Casos clínicos

La página `/casos` muestra 9 categorías curadas a partir de **268 fotos clínicas reales** revisadas una por una (de una carpeta original de 1.5GB), seleccionando las que mejor documentan cada tratamiento sin mostrar contenido innecesariamente gráfico. Los nombres de archivo y carpetas no contienen ningún dato identificable de paciente; las fotos que muestran parte del rostro se incluyeron solo tras confirmar autorización del paciente con el Dr. Tello.

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

El proyecto está listo para desplegarse en **Vercel** (recomendado para Next.js). No se requieren variables de entorno para el funcionamiento básico.

---

## Repositorio

[github.com/Mathifa59/Clinica-Dental-Tello](https://github.com/Mathifa59/Clinica-Dental-Tello)

---

## Pendiente / próximos pasos

- [ ] Fotos reales para Rehabilitación Oral, Estética Dental y Cirugía Dental (`public/images/services/oral-rehab.jpg`, `aesthetics.jpg`, `surgery.jpg`) — ya están destacadas en Inicio con placeholder a la espera
- [ ] Actualizar el logo a la nueva paleta azul/petróleo (a cargo de la agencia)
- [ ] Header y Footer usan actualmente dos archivos de logo distintos (`/images/brand/logo-horizontal.png` y `/logo-horizontal.png`) — conviene unificar a uno solo
- [ ] `public/images/` tiene archivos sueltos duplicados en la raíz (reaparecieron al fusionar una rama anterior) — pendiente una limpieza como la que se hizo antes
- [ ] Conectar el formulario de citas a un backend o servicio de email real (Resend, EmailJS, etc.)
- [ ] Añadir dominio personalizado en Vercel

---

*Desarrollado con Next.js 14 · CSS Modules · next-intl*
