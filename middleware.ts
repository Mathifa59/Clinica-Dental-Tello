import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['es', 'en'],
  defaultLocale: 'es',
  localePrefix: 'always',
  // El negocio es 100% para el mercado peruano — el sitio debe entrar
  // siempre en español, sin importar el idioma del navegador del
  // visitante. Sin esto, next-intl redirige automáticamente a /en si
  // el navegador reporta inglés (Accept-Language), que era el bug.
  localeDetection: false,
});

export const config = {
  matcher: ['/((?!_next|_vercel|.*\\..*).*)'],
};
