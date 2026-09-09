'use server';

import { Resend } from 'resend';
import { renderEmail, dataTable, sectionTitle, calloutBox, referenceBadge, emailButton } from './email-template';

const resend = new Resend(process.env.RESEND_API_KEY);
const TO_EMAIL = process.env.RESEND_TO_EMAIL || 'dgt_21@hotmail.com';
// Dominio verificado en Resend — remitente de marca.
const FROM_EMAIL = 'Dental Tello <notificaciones@dentaltello.com>';

type ActionResult = { success: true } | { success: false; error: string };

type AppointmentInput = {
  name: string;
  phone: string;
  service: string;
  date: string;
  message?: string;
  hpField?: string; // honeypot — un bot que autocompleta todo lo llena, una persona nunca lo ve
};

/** Re-valida en el servidor lo que el formulario ya valida en el navegador —
 * cualquiera puede llamar a un server action directamente, sin pasar por el <form>. */
function validateAppointment(data: AppointmentInput): string | null {
  if (!data.name.trim() || data.name.length > 120) return 'invalid_name';
  if (!/^9\d{2}-\d{3}-\d{3}$/.test(data.phone.trim())) return 'invalid_phone';
  if (!data.service.trim() || data.service.length > 120) return 'invalid_service';
  if (!data.date.trim()) return 'invalid_date';
  if (data.message && data.message.length > 500) return 'invalid_message';
  return null;
}

export async function submitAppointment(data: AppointmentInput): Promise<ActionResult> {
  if (data.hpField) return { success: true }; // honeypot activado — se descarta en silencio
  if (validateAppointment(data)) return { success: false, error: 'validation' };

  try {
    const rows = dataTable([
      ['Nombre', escapeHtml(data.name)],
      ['Teléfono', `<a href="tel:${escapeHtml(data.phone)}" style="color:#197D9F;text-decoration:none;font-weight:600;">${escapeHtml(data.phone)}</a>`],
      ['Servicio', escapeHtml(data.service)],
      ['Fecha preferida', escapeHtml(data.date)],
      ['Mensaje', data.message ? escapeHtml(data.message).replace(/\n/g, '<br>') : '—'],
    ]);

    const html = renderEmail({
      preheader: `Nueva solicitud de cita de ${data.name}`,
      eyebrow: 'Nueva solicitud de cita',
      title: `${data.name} quiere agendar una cita`,
      intro: 'Un paciente completó el formulario de citas en dentaltello.com. Estos son los detalles:',
      bodyHtml: `${rows}${emailButton(`tel:${data.phone}`, 'Llamar al paciente')}`,
    });

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      subject: `Nueva solicitud de cita — ${data.name}`,
      html,
    });
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch {
    return { success: false, error: 'unknown' };
  }
}

type ComplaintInput = {
  // Datos del consumidor
  consumerName: string;
  consumerDoc: string;
  consumerAddress: string;
  consumerEmail: string;
  consumerPhone: string;
  isMinor: boolean;
  guardianName?: string;
  // Datos del bien contratado
  goodType: 'producto' | 'servicio';
  goodDescription: string;
  claimedAmount?: string;
  // Detalle
  complaintType: 'reclamo' | 'queja';
  detail: string;
  request: string;
  hpField?: string; // honeypot — un bot que autocompleta todo lo llena, una persona nunca lo ve
};

function validateComplaint(data: ComplaintInput): string | null {
  if (!data.consumerName.trim() || data.consumerName.length > 150) return 'invalid_name';
  if (!data.consumerDoc.trim() || data.consumerDoc.length > 30) return 'invalid_doc';
  if (!data.consumerAddress.trim() || data.consumerAddress.length > 300) return 'invalid_address';
  if (!/^\S+@\S+\.\S+$/.test(data.consumerEmail.trim())) return 'invalid_email';
  if (!data.consumerPhone.trim() || data.consumerPhone.length > 30) return 'invalid_phone';
  if (data.isMinor && !data.guardianName?.trim()) return 'invalid_guardian';
  if (!data.goodDescription.trim() || data.goodDescription.length > 1000) return 'invalid_good';
  if (!data.detail.trim() || data.detail.length > 3000) return 'invalid_detail';
  if (!data.request.trim() || data.request.length > 1000) return 'invalid_request';
  return null;
}

function generateReference() {
  const now = new Date();
  const ymd = now.toISOString().slice(0, 10).replace(/-/g, '');
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `DT-${ymd}-${rand}`;
}

function complaintSummaryHtml(data: ComplaintInput) {
  const consumerRows: [string, string][] = [
    ['Nombre', escapeHtml(data.consumerName)],
    ['Documento', escapeHtml(data.consumerDoc)],
    ['Domicilio', escapeHtml(data.consumerAddress)],
    ['Correo', escapeHtml(data.consumerEmail)],
    ['Teléfono', escapeHtml(data.consumerPhone)],
  ];
  if (data.isMinor) {
    consumerRows.push(['Padre/madre/apoderado', escapeHtml(data.guardianName || '—')]);
  }

  const goodRows: [string, string][] = [
    ['Tipo', data.goodType === 'producto' ? 'Producto' : 'Servicio'],
    ['Descripción', escapeHtml(data.goodDescription)],
    ['Monto reclamado', data.claimedAmount ? escapeHtml(data.claimedAmount) : '—'],
  ];

  const detailRows: [string, string][] = [
    ['Tipo', data.complaintType === 'reclamo' ? 'Reclamo' : 'Queja'],
    ['Detalle', escapeHtml(data.detail).replace(/\n/g, '<br>')],
    ['Pedido del consumidor', escapeHtml(data.request).replace(/\n/g, '<br>')],
  ];

  return `
    ${sectionTitle('Datos del consumidor')}
    ${dataTable(consumerRows)}
    ${sectionTitle('Bien contratado')}
    ${dataTable(goodRows)}
    ${sectionTitle('Detalle')}
    ${dataTable(detailRows)}
  `;
}

export async function submitComplaint(data: ComplaintInput): Promise<ActionResult & { reference?: string }> {
  if (data.hpField) return { success: true }; // honeypot activado — se descarta en silencio
  if (validateComplaint(data)) return { success: false, error: 'validation' };

  const reference = generateReference();
  const label = data.complaintType === 'reclamo' ? 'reclamo' : 'queja';
  const summaryHtml = complaintSummaryHtml(data);

  try {
    const clinicHtml = renderEmail({
      preheader: `Nuevo ${label} registrado — Ref. ${reference}`,
      eyebrow: 'Libro de reclamaciones',
      title: `Nuevo ${label} — Ref. ${reference}`,
      intro: `Se registró un ${label} a través del Libro de Reclamaciones Virtual del sitio web.`,
      bodyHtml: summaryHtml,
    });

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: data.consumerEmail,
      subject: `[Libro de Reclamaciones] ${reference} — ${data.consumerName}`,
      html: clinicHtml,
    });
    if (error) return { success: false, error: error.message };

    // Copia de confirmación al consumidor (no bloquea el resultado si falla)
    try {
      const consumerHtml = renderEmail({
        preheader: `Hemos recibido tu ${label} — Ref. ${reference}`,
        eyebrow: 'Confirmación de recepción',
        title: `Hemos recibido tu ${label}`,
        bodyHtml: `
          ${calloutBox(`
            <p style="margin:0 0 10px;">Tu código de referencia es:</p>
            ${referenceBadge(reference)}
            <p style="margin:14px 0 0;">Nos pondremos en contacto contigo en un plazo máximo de <strong>30 días calendario</strong>, conforme a la normativa de protección al consumidor.</p>
          `)}
          ${summaryHtml}
        `,
      });

      await resend.emails.send({
        from: FROM_EMAIL,
        to: data.consumerEmail,
        subject: `Hemos recibido tu ${label} — Ref. ${reference}`,
        html: consumerHtml,
      });
    } catch {
      // no crítico
    }

    return { success: true, reference };
  } catch {
    return { success: false, error: 'unknown' };
  }
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
