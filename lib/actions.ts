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
};

export async function submitAppointment(data: AppointmentInput): Promise<ActionResult> {
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
};

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
