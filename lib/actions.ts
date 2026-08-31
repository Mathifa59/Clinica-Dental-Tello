'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const TO_EMAIL = process.env.RESEND_TO_EMAIL || 'dgt_21@hotmail.com';
// TODO: cuando se verifique dentaltello.com en Resend, cambiar a algo como
// 'Dental Tello <citas@dentaltello.com>'
const FROM_EMAIL = 'Dental Tello <onboarding@resend.dev>';

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
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      subject: `Nueva solicitud de cita — ${data.name}`,
      html: `
        <h2>Nueva solicitud de cita</h2>
        <p><strong>Nombre:</strong> ${escapeHtml(data.name)}</p>
        <p><strong>Teléfono:</strong> ${escapeHtml(data.phone)}</p>
        <p><strong>Servicio:</strong> ${escapeHtml(data.service)}</p>
        <p><strong>Fecha preferida:</strong> ${escapeHtml(data.date)}</p>
        <p><strong>Mensaje:</strong> ${data.message ? escapeHtml(data.message) : '—'}</p>
      `,
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

export async function submitComplaint(data: ComplaintInput): Promise<ActionResult & { reference?: string }> {
  const reference = generateReference();
  const dateStr = new Date().toLocaleDateString('es-PE', { year: 'numeric', month: 'long', day: 'numeric' });

  const summaryHtml = `
    <h2>Libro de Reclamaciones — ${data.complaintType === 'reclamo' ? 'Reclamo' : 'Queja'}</h2>
    <p><strong>Referencia:</strong> ${reference}</p>
    <p><strong>Fecha:</strong> ${dateStr}</p>
    <h3>Datos del consumidor</h3>
    <p><strong>Nombre:</strong> ${escapeHtml(data.consumerName)}</p>
    <p><strong>Documento:</strong> ${escapeHtml(data.consumerDoc)}</p>
    <p><strong>Domicilio:</strong> ${escapeHtml(data.consumerAddress)}</p>
    <p><strong>Correo:</strong> ${escapeHtml(data.consumerEmail)}</p>
    <p><strong>Teléfono:</strong> ${escapeHtml(data.consumerPhone)}</p>
    ${data.isMinor ? `<p><strong>Padre/madre/apoderado:</strong> ${escapeHtml(data.guardianName || '—')}</p>` : ''}
    <h3>Bien contratado</h3>
    <p><strong>Tipo:</strong> ${data.goodType === 'producto' ? 'Producto' : 'Servicio'}</p>
    <p><strong>Descripción:</strong> ${escapeHtml(data.goodDescription)}</p>
    <p><strong>Monto reclamado:</strong> ${data.claimedAmount ? escapeHtml(data.claimedAmount) : '—'}</p>
    <h3>Detalle</h3>
    <p><strong>Tipo:</strong> ${data.complaintType === 'reclamo' ? 'Reclamo' : 'Queja'}</p>
    <p><strong>Detalle:</strong> ${escapeHtml(data.detail)}</p>
    <p><strong>Pedido del consumidor:</strong> ${escapeHtml(data.request)}</p>
  `;

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: data.consumerEmail,
      subject: `[Libro de Reclamaciones] ${reference} — ${data.consumerName}`,
      html: summaryHtml,
    });
    if (error) return { success: false, error: error.message };

    // Copia de confirmación al consumidor (no bloquea el resultado si falla)
    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: data.consumerEmail,
        subject: `Hemos recibido tu ${data.complaintType} — Ref. ${reference}`,
        html: `
          <p>Hemos recibido tu ${data.complaintType === 'reclamo' ? 'reclamo' : 'queja'} con el código de referencia <strong>${reference}</strong>.</p>
          <p>Nos pondremos en contacto contigo en un plazo máximo de 30 días calendario, conforme a la normativa de protección al consumidor.</p>
          <hr />
          ${summaryHtml}
        `,
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
