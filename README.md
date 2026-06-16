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

---

## Estructura de páginas

| Ruta | Página | Descripción |
|---|---|---|
| `/es` o `/en` | **Inicio** | Hero con foto, estadísticas, sección de clínica, 3 servicios destacados |
| `/es/servicios` | **Servicios** | 6 tarjetas de servicios con imagen y descripción |
| `/es/nosotros` | **Nosotros** | Perfil del Dr. Tello, estadísticas, valores de la clínica |
| `/es/blog` | **Blog** | 3 artículos sobre salud bucal |
| `/es/citas` | **Agendar cita** | Formulario con validación, sidebar con horarios e imagen |
| `/es/contacto` | **Contacto** | Datos de contacto, redes sociales, foto exterior + mapa |

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
│   └── images/                  # Carpeta lista para subir fotos
│       ├── home/
│       ├── services/
│       ├── about/
│       ├── blog/
│       └── clinic/
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

El cambio de idioma está integrado en el Header. Los textos se gestionan en `messages/es.json` y `messages/en.json`.

---

## Imágenes

Las imágenes están **pre-cableadas** en el código pero no incluidas en el repositorio. El sitio muestra placeholders con degradado hasta que se suba cada foto.

Consulta [`public/images/LEEME.md`](public/images/LEEME.md) para ver la lista completa de archivos esperados, rutas y dimensiones recomendadas.

**Resumen de fotos a subir:**

| Carpeta | Archivos |
|---|---|
| `public/images/home/` | `hero.jpg`, `clinica-interior.jpg` |
| `public/images/services/` | `orthodontics.jpg`, `implants.jpg`, `cleaning.jpg`, `whitening.jpg`, `pediatric.jpg`, `emergency.jpg` |
| `public/images/about/` | `doctor-tello.jpg` |
| `public/images/blog/` | `frecuencia-visitas.jpg`, `implantes-dentales.jpg`, `estres-salud-bucal.jpg` |
| `public/images/clinic/` | `consultorio.jpg`, `exterior.jpg` |

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

- [ ] Subir las fotos reales a `public/images/`
- [ ] Actualizar número de WhatsApp real en `components/WhatsAppButton/WhatsAppButton.tsx` y `components/Footer/Footer.tsx`
- [ ] Actualizar dirección, teléfono y correo reales en `messages/es.json` y `messages/en.json`
- [ ] Conectar formulario de citas a un backend o servicio de email (Resend, EmailJS, etc.)
- [ ] Integrar mapa real de Google Maps o OpenStreetMap en la página de Contacto
- [ ] Añadir dominio personalizado en Vercel

---

*Desarrollado con Next.js 14 · CSS Modules · next-intl*
