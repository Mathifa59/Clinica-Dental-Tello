// Plantilla de correo compartida — estilos inline y tablas porque los
// clientes de correo (Gmail, Outlook, etc.) no soportan CSS moderno
// (custom properties, flexbox, grid...) de forma confiable.

const BRAND = {
  primary: '#197D9F',
  primaryDark: '#125D78',
  secondary: '#009F99',
  bgSoft: '#EAF4F4',
  bgSofter: '#F5FAFA',
  border: '#DCEBEB',
  text: '#102E38',
  textMuted: '#57737A',
  textFaint: '#8FA5AA',
};

const FONT = 'Arial, Helvetica, sans-serif';
// Versión blanca del logo: el header del correo usa el degradado azul/petróleo
// de fondo, y el logo a color (turquesa) se volvía casi invisible sobre él.
const LOGO_URL = 'https://www.dentaltello.com/images/brand/logo-horizontal-white.png';
const SITE_URL = 'https://www.dentaltello.com';

export function emailLink(href: string, text: string) {
  return `<a href="${href}" style="color:${BRAND.primary};text-decoration:none;font-weight:600;">${text}</a>`;
}

export function emailButton(href: string, text: string) {
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:4px 0 0;">
      <tr>
        <td style="border-radius:999px;background-color:${BRAND.primary};">
          <a href="${href}" style="display:inline-block;padding:12px 28px;font-size:14px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:999px;font-family:${FONT};">${text}</a>
        </td>
      </tr>
    </table>`;
}

export function sectionTitle(text: string) {
  return `<p style="margin:24px 0 8px;font-size:12px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;color:${BRAND.primaryDark};font-family:${FONT};">${text}</p>`;
}

export function dataTable(rows: [string, string][]) {
  const body = rows
    .map(([label, value], i) => {
      const bg = i % 2 === 0 ? '#ffffff' : BRAND.bgSofter;
      return `
        <tr>
          <td style="padding:12px 16px;background-color:${bg};font-size:13px;color:${BRAND.textMuted};font-weight:600;width:38%;border-bottom:1px solid #EEF5F5;vertical-align:top;font-family:${FONT};">${label}</td>
          <td style="padding:12px 16px;background-color:${bg};font-size:13px;color:${BRAND.text};border-bottom:1px solid #EEF5F5;vertical-align:top;font-family:${FONT};">${value}</td>
        </tr>`;
    })
    .join('');
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${BRAND.border};border-radius:12px;overflow:hidden;border-collapse:separate;">${body}</table>`;
}

export function calloutBox(html: string) {
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${BRAND.bgSoft};border-radius:12px;margin:0 0 20px;">
      <tr>
        <td style="padding:18px 20px;font-size:13px;line-height:1.6;color:${BRAND.text};font-family:${FONT};">${html}</td>
      </tr>
    </table>`;
}

export function referenceBadge(reference: string) {
  return `<span style="display:inline-block;background-color:${BRAND.primary};color:#ffffff;font-weight:700;font-size:15px;letter-spacing:0.03em;padding:8px 16px;border-radius:999px;font-family:${FONT};">${reference}</span>`;
}

export function renderEmail(opts: {
  preheader: string;
  eyebrow: string;
  title: string;
  intro?: string;
  bodyHtml: string;
}) {
  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${opts.title}</title>
</head>
<body style="margin:0;padding:0;background-color:${BRAND.bgSoft};font-family:${FONT};">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${opts.preheader}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${BRAND.bgSoft};padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:16px;overflow:hidden;">
          <tr>
            <td style="background-color:${BRAND.primary};background-image:linear-gradient(135deg, ${BRAND.primary} 0%, ${BRAND.secondary} 100%);padding:28px 32px;text-align:center;">
              <img src="${LOGO_URL}" alt="Dental Tello" width="180" style="display:block;margin:0 auto;height:auto;border:0;" />
            </td>
          </tr>
          <tr>
            <td style="padding:32px 32px 0;">
              <span style="display:inline-block;background-color:${BRAND.bgSoft};color:${BRAND.primaryDark};font-size:11px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;padding:6px 14px;border-radius:999px;font-family:${FONT};">${opts.eyebrow}</span>
            </td>
          </tr>
          <tr>
            <td style="padding:14px 32px 0;">
              <h1 style="margin:0;font-size:21px;line-height:1.35;color:${BRAND.text};font-family:${FONT};">${opts.title}</h1>
            </td>
          </tr>
          ${opts.intro ? `
          <tr>
            <td style="padding:10px 32px 22px;color:${BRAND.textMuted};font-size:14px;line-height:1.6;font-family:${FONT};">${opts.intro}</td>
          </tr>` : '<tr><td style="padding-top:20px;"></td></tr>'}
          <tr>
            <td style="padding:0 32px 32px;">${opts.bodyHtml}</td>
          </tr>
          <tr>
            <td style="background-color:${BRAND.bgSofter};padding:22px 32px;text-align:center;border-top:1px solid ${BRAND.border};">
              <p style="margin:0 0 4px;font-size:13px;color:${BRAND.textMuted};font-family:${FONT};font-weight:600;">Clínica Dental Tello</p>
              <p style="margin:0 0 4px;font-size:12px;color:${BRAND.textFaint};font-family:${FONT};">Av. Próceres De Huandoy 7865, Ur Pro, Los Olivos, Lima</p>
              <p style="margin:0;font-size:12px;color:${BRAND.textFaint};font-family:${FONT};">Correo automático generado desde <a href="${SITE_URL}" style="color:${BRAND.textFaint};">dentaltello.com</a></p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
