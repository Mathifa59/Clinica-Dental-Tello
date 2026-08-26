# Carpeta de Imágenes — Dental Tello

Estado de los recursos del sitio. Los archivos ya organizados se toman automáticamente por el código.

---

## ✅ Ya cargados

| Archivo | Dónde aparece |
|---|---|
| `brand/logo-horizontal.png` | Logo del Header |
| `brand/logo.png` | Logo cuadrado (referencia — tiene el damero de fondo pintado, pedir versión con transparencia real) |
| `about/doctor-tello.png` | Foto del Dr. Tello en la página Nosotros |
| `clinic/exterior.jpg` | Fachada en la página Citas (bloque de contacto) |
| `clinic/exterior-amplio.jpg`, `recepcion.jpg`, `sala-espera.jpg`, `equipos.jpg` | Galería "Nuestras instalaciones" en Nosotros |
| `services/orthodontics.jpg` | Tarjeta Ortodoncia |
| `services/implants.jpg` | Tarjeta Implantes Dentales |
| `services/emergency.jpg` | Tarjeta Urgencias Dentales |
| `casos/*/` | 9 categorías de casos clínicos reales (página Casos) — ver `casos-review` en el historial de commits para el detalle de cada una |
| `../videos/hero.mp4` | Video vertical del hero en Inicio (entrada al consultorio) |
| `../videos/clinica.mp4` | Video de la sección "Nuestra clínica" en Inicio |

---

## ⬜ Pendientes

| Archivo | Dónde aparecería |
|---|---|
| `services/oral-rehab.jpg` | Rehabilitación Oral — destacado en Inicio, hoy con placeholder |
| `services/aesthetics.jpg` | Estética Dental — destacado en Inicio, hoy con placeholder |
| `services/surgery.jpg` | Cirugía Dental — destacado en Inicio, hoy con placeholder |

## 💡 Mejoras sugeridas

- **Logo con transparencia real**: el `brand/logo.png` cuadrado tiene el patrón de damero pintado en los píxeles (no es transparencia). Pedir a la agencia el PNG original con canal alfa.
- **Logo desactualizado a la paleta nueva** (azul/petróleo) — pendiente de la agencia.
- **Inconsistencia de logo**: el Header usa `brand/logo-horizontal.png` y el Footer usa `public/logo-horizontal.png` (fuera de esta carpeta) — son archivos distintos, valdría la pena unificar a uno solo.

## Formatos aceptados
`.jpg` · `.jpeg` · `.png` · `.webp` · `.avif` · `.mp4` (videos en `public/videos/`)
