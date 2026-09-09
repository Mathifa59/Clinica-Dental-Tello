const SITE_URL = 'https://www.dentaltello.com';

/** Datos estructurados (schema.org) para la clínica — ayuda a Google a mostrar el
 * negocio como ficha local (nombre, dirección, teléfono, horario) en vez de solo un link. */
export const dentistSchema = {
  '@context': 'https://schema.org',
  '@type': 'Dentist',
  name: 'Clínica Dental Tello',
  alternateName: 'Dental Tello',
  url: SITE_URL,
  logo: `${SITE_URL}/images/brand/logo-horizontal.png`,
  image: `${SITE_URL}/og-image.jpg`,
  telephone: '+51942661120',
  email: 'dgt_21@hotmail.com',
  priceRange: 'S/',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Av. Próceres de Huandoy 7865, Urb. Pro',
    addressLocality: 'Los Olivos',
    addressRegion: 'Lima',
    addressCountry: 'PE',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '13:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '15:00',
      closes: '20:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday'],
      opens: '09:00',
      closes: '13:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday'],
      opens: '15:00',
      closes: '18:00',
    },
  ],
  sameAs: [
    'https://instagram.com/dr.daniel.tello',
    'https://www.tiktok.com/@dr.daniel.tello',
    'https://wa.me/51942661120',
  ],
} as const;
