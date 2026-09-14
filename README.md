# Clínica Dental Tello — Sitio Web Corporativo

Sitio web oficial de **Clínica Dental Tello**, clínica odontológica del **Dr. Daniel Tello Fernández** (COP 15480 · RNE 5532) ubicada en Los Olivos, Lima, Perú. Construido con Next.js 14 App Router, internacionalización español/inglés y diseño moderno sobre paleta azul/petróleo.

---

## Descripción del proyecto

Sitio web corporativo diseñado para presentar los servicios de la clínica, mostrar el perfil del Dr. Tello y su equipo, exhibir un portafolio de casos clínicos reales, y permitir agendar citas / contactar a la clínica desde una sola página. La identidad visual combina glassmorphism, gradientes, video de fondo, fondo "aurora" animado y micro-interacciones.

**Todo el contenido es real** (estadísticas, biografía del doctor, formación académica, equipo médico, servicios, horarios, datos de contacto) — proviene de un formulario oficial completado por la clínica, no hay texto de ejemplo ni inventado.

---

## Stack tecnológico

| Tecnología | Versión | Uso |
|---|---|---|
| Next.js | 14.2.35 | Framework principal — App Router |
| TypeScript | 5.x | Tipado estático |
| next-intl | 3.15.3 | Internacionalización ES / EN |
| CSS Modules | — | Estilos encapsulados por componente |
| next/image | built-in | Optimización automática de imágenes (AVIF desactivado, ver [SEO, seguridad y legal](#seo-seguridad-y-legal)) |
| next/font | built-in | Fraunces (títulos) + Figtree (cuerpo), Google Fonts |
| Resend | ^6.x | Envío de correos desde los formularios (citas, libro de reclamaciones) |

> **Sin Tailwind. Sin librerías de animación externas.** Todas las animaciones y efectos visuales son CSS puro con custom properties y `@keyframes`. El acordeón de preguntas frecuentes usa `<details>/<summary>` nativo del navegador, sin JavaScript.

---

## Estructura de páginas

| Ruta | Página | Descripción |
|---|---|---|
| `/es` o `/en` | **Inicio** | Hero a pantalla completa con foto de fondo (paciente + dentista) y degradado oscuro, estadísticas, marquee animado con los 7 servicios, video de "Nuestra clínica", 3 servicios destacados |
| `/es/servicios` | **Servicios** | 7 tarjetas de servicio (Ortodoncia, Implantes, Urgencias, Rehabilitación Oral, Estética Dental, Cirugía Dental, Endodoncia) |
| `/es/casos` | **Casos** | Portafolio de 9 categorías de casos clínicos reales, cada una con carrusel de fotos (antes/después o proceso), con swipe táctil en móvil |
| `/es/nosotros` | **Nosotros** | Perfil, credenciales y formación del Dr. Tello (con estadísticas integradas en la misma columna), equipo médico (3 doctores, sección con fondo oscuro), galería de fotos reales del equipo/instalaciones |
| `/es/citas` | **Citas** | Formulario de reserva (con validación en servidor y anti-spam) + FAQ (5 preguntas) + bloque de contacto completo (dirección, horario, redes, teléfono/WhatsApp) + mapa real embebido de Google Maps |
| `/es/privacidad` | **Política de Privacidad** | Cumple la Ley N.º 29733 (Perú): responsable, datos recopilados, finalidad, base legal, terceros, plazo de conservación, derechos, contacto |
| `/es/libro-de-reclamaciones` | **Libro de Reclamaciones Virtual** | Formulario oficial de reclamos/quejas exigido por Indecopi, envía notificación por correo a la clínica y copia de confirmación con código de referencia al consumidor |

> No existen página de Blog ni ruta `/contacto` independiente — se retiraron para simplificar la navegación. La sección "Valores" de Nosotros también se retiró en favor de más fotos reales del equipo.

---

## Estructura del proyecto

```
clinica-dental-tello/
├── app/
│   ├── globals.css              # Design tokens, keyframes, utilidades globales
│   ├── layout.tsx               # Root layout (fuentes, JSON-LD, metadataBase, OG/Twitter)
│   ├── sitemap.ts                # sitemap.xml generado (ambos locales)
│   ├── robots.ts                 # robots.txt
│   └── [locale]/
│       ├── layout.tsx           # Header + Footer + WhatsApp button
│       ├── not-found.tsx        # 404 propia, con CTAs a Inicio/Servicios/Citas
│       ├── [...rest]/           # Catch-all → notFound() + noindex
│       ├── page.tsx             # Inicio (hero foto de fondo, marquee, video de clínica)
│       ├── servicios/
│       ├── casos/               # Portafolio de casos clínicos reales
│       ├── nosotros/            # Doctor, equipo, formación, galería de fotos reales
│       ├── privacidad/          # Política de Privacidad (ES/EN)
│       ├── libro-de-reclamaciones/
│       │   ├── page.tsx
│       │   └── ComplaintBookForm.tsx  # Client component: formulario + validación + honeypot
│       └── citas/
│           ├── page.tsx         # Server wrapper (metadata)
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
├── lib/
│   ├── actions.ts                # Server actions: submitAppointment / submitComplaint (Resend)
│   ├── email-template.ts         # Plantilla HTML compartida para los correos
│   ├── schema.ts                  # JSON-LD (Schema.org Dentist) para SEO local
│   └── seo.ts                     # Canonical/hreflang + imagen de Open Graph compartida
├── messages/
│   ├── es.json                  # Contenido en español (fuente de verdad)
│   └── en.json                  # Contenido en inglés
├── public/
│   ├── og-image.jpg              # Tarjeta de Open Graph (logo + degradado de marca)
│   ├── videos/                  # clinica.mp4 (sección "Nuestra clínica")
│   └── images/
│       ├── brand/                # Logo (Header, Footer, JSON-LD)
│       ├── hero-patient.jpg      # Foto de fondo del hero de Inicio
│       ├── services/              # Los 7 servicios con foto real
│       ├── about/                 # doctor-tello.png
│       ├── clinic/                # fachada, consultorio, equipo (fotos reales de Nosotros)
│       └── casos/                 # 9 carpetas con fotos reales de casos clínicos
├── middleware.ts                # Enrutamiento de locales (es/en)
├── i18n.ts                      # Configuración next-intl
└── next.config.mjs              # Config Next.js: plugin i18n, headers de seguridad, imágenes
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

> **Logo oficial:** `public/images/brand/logo-horizontal.png` — versión rebrandeada, sin fondo, en la paleta azul/petróleo. Usado en Header y Footer directamente sobre cualquier fondo (claro u oscuro) gracias a la transparencia. El material fuente entregado por la agencia vive en `public/images/logo/` a la espera de variantes adicionales (versión vertical, modo oscuro, etc.).
>
> **Favicon:** `app/icon.png` (512×512, transparente), `app/apple-icon.png` (180×180, fondo sólido) y `app/favicon.ico` (16/32/48px) — generados a partir del ícono oficial (diente + implante, sin texto) mediante la convención de archivos de Next.js. No usar la propiedad `icons` de `metadata` en `layout.tsx`: duplicaría las etiquetas `<link rel="icon">`.

### Tipografía

- **Títulos:** Fraunces (serif variable, con itálica para el acento de gradiente)
- **Cuerpo:** Figtree (400 / 500 / 600)

### Efectos visuales

- Gradientes lineales y radiales en hero, botones, badges e íconos
- Hero de Inicio: foto de fondo a pantalla completa (`next/image` con `fill`) + degradado oscuro superpuesto (más opaco a la izquierda, donde va el texto) para legibilidad
- Glassmorphism (`backdrop-filter: blur`) en header al scroll, tarjetas de stats
- Video de fondo en "Nuestra clínica" del inicio (`autoPlay muted loop playsInline`, sin controles nativos ni picture-in-picture)
- Marquee animado con los 7 servicios en la página de inicio
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

## SEO, seguridad y legal

- **Metadata por página:** cada ruta tiene `title`/`description` propios (no genéricos) y canonical + hreflang ES/EN vía `lib/seo.ts`.
- **Open Graph / redes sociales:** tarjeta de imagen propia (`public/og-image.jpg`, 1200×630) con logo y degradado de marca — se ve al compartir el link en WhatsApp, Facebook, etc. Metadata completa (`og:image:width/height/alt`, `og:type`, `og:site_name`, `twitter:card`).
- **SEO local:** datos estructurados JSON-LD (`Schema.org` tipo `Dentist`) en `lib/schema.ts` — nombre, dirección, teléfono, horario y redes, para que Google pueda mostrar la clínica como negocio local.
- **Indexación:** `app/sitemap.ts` y `app/robots.ts` (generados por Next.js, no archivos estáticos), conectado a Google Search Console.
- **Seguridad:** headers (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`) en `next.config.mjs`. AVIF desactivado en `next/image` (`images.formats: ['image/webp']`) como mitigación de una vulnerabilidad de RCE conocida en Next.js — ver la sección de pendientes.
- **Formularios (citas y libro de reclamaciones):** validan en el navegador *y* se revalidan en el servidor (`lib/actions.ts`), y tienen un campo honeypot invisible contra bots de spam.
- **Legal:** Política de Privacidad (`/privacidad`, conforme a la Ley N.º 29733) y Libro de Reclamaciones Virtual (`/libro-de-reclamaciones`, exigido por Indecopi) con envío real de correos vía Resend.
- **Cookies:** el sitio no usa ningún tracker (GA4, Meta Pixel, etc.) por ahora, así que no hace falta banner de consentimiento — el día que se agregue analítica, sí será obligatorio.

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

Desplegado en **Vercel**, disponible en [dentaltello.com](https://www.dentaltello.com). Variables de entorno requeridas (configuradas en Vercel, no en el repo):

| Variable | Uso |
|---|---|
| `RESEND_API_KEY` | Envío de correos desde los formularios de citas y libro de reclamaciones |
| `RESEND_TO_EMAIL` | Correo de destino de la clínica (por defecto `dgt_21@hotmail.com` si no se define) |

---

## Repositorio

[github.com/Mathifa59/Clinica-Dental-Tello](https://github.com/Mathifa59/Clinica-Dental-Tello)

---

## Pendiente / próximos pasos

- [ ] Variantes adicionales del logo (versión vertical, modo oscuro) cuando la agencia las entregue — el material fuente va a `public/images/logo/`
- [ ] Migrar a Next.js 15/16: la rama 14.x ya está en fin de soporte (14.2.35 es el último parche) y `npm audit` reporta CVEs críticas sin corregir que solo se resuelven con el salto de versión mayor. Requiere actualizar `params`/`cookies()`/`headers()` a la API async de Next 15 en cada página — se aplazó a propósito por el alcance del cambio, no por descuido. Dos de las vulnerabilidades más graves ya están mitigadas sin necesidad del upgrade (ver [SEO, seguridad y legal](#seo-seguridad-y-legal)).
- [ ] Content-Security-Policy: se dejó fuera de los headers de seguridad a propósito (hay un iframe de Google Maps y scripts de Next que requieren configurarlo con cuidado para no romper la página)
- [ ] Términos y Condiciones: no aplica por ahora — el formulario de citas es una solicitud, no una compra/pago online

---

*Desarrollado con Next.js 14 · CSS Modules · next-intl*
