# Carpeta de Imágenes — Dental Tello

Estado de los recursos del sitio. Los archivos ya organizados se toman automáticamente por el código.

---

## ✅ Ya cargados

| Archivo | Dónde aparece |
|---|---|
| `brand/logo-horizontal.png` | Logo del Header (fondos claros) |
| `brand/logo-horizontal-white.png` | Logo del Footer (fondo oscuro "aurora") |
| `brand/logo.png` | Logo cuadrado (referencia — tiene el damero de fondo pintado, pedir versión con transparencia real) |
| `about/doctor-tello.png` | Foto del Dr. Tello en la página Nosotros |
| `clinic/exterior.jpg` | Fachada en la página Citas (bloque de contacto) |
| `clinic/consultorio.jpg` | Foto del consultorio en la página Citas |
| `clinic/equipo-01.jpg` … `equipo-06.jpg` | Galería "Nuestro equipo en acción" en Nosotros (reemplazó la sección de Valores + las fotos de instalaciones anteriores) |
| `services/orthodontics.jpg`, `implants.jpg`, `emergency.jpg`, `oral-rehab.jpg`, `aesthetics.jpg`, `surgery.jpg`, `endodontics.jpg` | Las 7 tarjetas de servicio (Servicios + destacados en Inicio) |
| `casos/*/` | 9 categorías de casos clínicos reales (página Casos) — ver `casos-review` en el historial de commits para el detalle de cada una |
| `hero-patient.jpg` | Foto de fondo del hero en Inicio (dentista + paciente) |
| `../videos/clinica.mp4` | Video de la sección "Nuestra clínica" en Inicio |
| `../og-image.jpg` | Tarjeta de Open Graph (logo + degradado de marca) al compartir el link del sitio |

---

## 💡 Mejoras sugeridas

- **Logo con transparencia real**: el `brand/logo.png` cuadrado tiene el patrón de damero pintado en los píxeles (no es transparencia). Pedir a la agencia el PNG original con canal alfa.
- **Logo desactualizado a la paleta nueva** (azul/petróleo) — pendiente de la agencia.

## Formatos aceptados
`.jpg` · `.jpeg` · `.png` · `.webp` (videos en `public/videos/`)

> AVIF no se genera actualmente: está desactivado en `next.config.mjs` como mitigación de una vulnerabilidad de seguridad conocida en Next.js (ver el README, sección "SEO, seguridad y legal").
