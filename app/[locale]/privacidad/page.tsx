import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';
import styles from './page.module.css';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const isEn = params.locale === 'en';
  return {
    title: isEn ? 'Privacy Policy' : 'Política de Privacidad',
    description: isEn
      ? 'How Dental Tello collects, uses and protects your personal data.'
      : 'Cómo Dental Tello recopila, utiliza y protege tus datos personales.',
    robots: { index: false, follow: true },
    ...buildAlternates(params.locale, '/privacidad'),
  };
}

export default function PrivacyPage({ params }: { params: { locale: string } }) {
  const isEn = params.locale === 'en';

  if (isEn) {
    return (
      <>
        <div className="page-hero">
          <div className="container">
            <h1>Privacy Policy</h1>
            <p>How we collect, use and protect your personal data.</p>
          </div>
        </div>
        <section className="section">
          <div className="container">
            <div className={styles.content}>
              <p className={styles.updated}>Last updated: August 2026</p>

              <div>
                <h2>1. Data controller</h2>
                <p>
                  The controller responsible for the personal data collected through this website is
                  <strong> Daniel Tello Fernández</strong> (trading as Dental Tello), RUC 10100687751,
                  with address at Av. Próceres de Huandoy 7865, Urb. Pro, Los Olivos, Lima, Peru.
                </p>
              </div>

              <div>
                <h2>2. What data we collect</h2>
                <p>Through our appointment request form and Complaints Book, we collect:</p>
                <ul>
                  <li>Full name</li>
                  <li>Phone number</li>
                  <li>Email address (Complaints Book only)</li>
                  <li>National ID / Foreign ID (Complaints Book only)</li>
                  <li>Preferred appointment date and requested service</li>
                  <li>Any additional message you choose to include</li>
                </ul>
              </div>

              <div>
                <h2>3. Purpose of processing</h2>
                <p>
                  We use this information exclusively to: manage and confirm appointment requests, contact
                  you regarding your dental care, and process complaints or claims submitted through our
                  Complaints Book, in accordance with Peruvian consumer protection regulations.
                </p>
              </div>

              <div>
                <h2>4. Legal basis</h2>
                <p>
                  Processing is based on your consent, given when you voluntarily submit a form on this
                  website, in accordance with Law No. 29733 (Personal Data Protection Law) and its
                  regulations approved by Supreme Decree No. 016-2024-JUS.
                </p>
              </div>

              <div>
                <h2>5. Data sharing with third parties</h2>
                <p>
                  We do not sell or rent your personal data. We share the minimum necessary data with the
                  following service providers (data processors), solely to operate this website:
                </p>
                <ul>
                  <li><strong>Vercel Inc.</strong> — website hosting</li>
                  <li><strong>Resend</strong> — email delivery for appointment requests and complaint confirmations</li>
                </ul>
              </div>

              <div>
                <h2>6. Data retention</h2>
                <p>
                  We retain your data only for as long as necessary to fulfill the purposes described above,
                  or as required by applicable law (e.g., complaint records under consumer protection
                  regulations).
                </p>
              </div>

              <div>
                <h2>7. Your rights</h2>
                <p>
                  You may exercise your rights of Access, Rectification, Cancellation and Opposition (ARCO
                  rights) over your personal data at any time, free of charge, by writing to
                  {' '}<strong>dgt_21@hotmail.com</strong>.
                </p>
              </div>

              <div>
                <h2>8. Security</h2>
                <p>
                  We apply reasonable technical and organizational measures to protect your personal data
                  against unauthorized access, loss or alteration.
                </p>
              </div>

              <div>
                <h2>9. Changes to this policy</h2>
                <p>
                  We may update this policy from time to time. Any changes will be published on this page
                  with an updated revision date.
                </p>
              </div>

              <div>
                <h2>10. Contact</h2>
                <p>
                  For any questions about this policy, contact us at <strong>dgt_21@hotmail.com</strong> or
                  {' '}<strong>+51 942 661 120</strong>.
                </p>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <h1>Política de Privacidad</h1>
          <p>Cómo recopilamos, usamos y protegemos tus datos personales.</p>
        </div>
      </div>
      <section className="section">
        <div className="container">
          <div className={styles.content}>
            <p className={styles.updated}>Última actualización: agosto de 2026</p>

            <div>
              <h2>1. Responsable del tratamiento</h2>
              <p>
                El responsable del tratamiento de los datos personales recopilados a través de este sitio
                web es <strong>Daniel Tello Fernández</strong> (con nombre comercial Dental Tello), RUC
                10100687751, con domicilio en Av. Próceres de Huandoy 7865, Urb. Pro, Los Olivos, Lima, Perú.
              </p>
            </div>

            <div>
              <h2>2. Qué datos recopilamos</h2>
              <p>A través de nuestro formulario de solicitud de citas y del Libro de Reclamaciones, recopilamos:</p>
              <ul>
                <li>Nombre completo</li>
                <li>Número de teléfono</li>
                <li>Correo electrónico (solo Libro de Reclamaciones)</li>
                <li>DNI / Carné de Extranjería (solo Libro de Reclamaciones)</li>
                <li>Fecha preferida de cita y servicio solicitado</li>
                <li>Cualquier mensaje adicional que decidas incluir</li>
              </ul>
            </div>

            <div>
              <h2>3. Finalidad del tratamiento</h2>
              <p>
                Utilizamos esta información exclusivamente para: gestionar y confirmar solicitudes de citas,
                contactarte respecto a tu atención odontológica, y procesar reclamos o quejas presentados a
                través de nuestro Libro de Reclamaciones, conforme a la normativa peruana de protección al
                consumidor.
              </p>
            </div>

            <div>
              <h2>4. Base legal</h2>
              <p>
                El tratamiento se basa en tu consentimiento, otorgado al enviar voluntariamente un
                formulario en este sitio web, de conformidad con la Ley N.º 29733, Ley de Protección de
                Datos Personales, y su Reglamento aprobado mediante el Decreto Supremo N.º 016-2024-JUS.
              </p>
            </div>

            <div>
              <h2>5. Compartición de datos con terceros</h2>
              <p>
                No vendemos ni alquilamos tus datos personales. Compartimos el mínimo necesario con los
                siguientes proveedores de servicios (encargados de tratamiento), únicamente para operar
                este sitio web:
              </p>
              <ul>
                <li><strong>Vercel Inc.</strong> — alojamiento (hosting) del sitio web</li>
                <li><strong>Resend</strong> — envío de correos para solicitudes de citas y confirmaciones de reclamos</li>
              </ul>
            </div>

            <div>
              <h2>6. Plazo de conservación</h2>
              <p>
                Conservamos tus datos solo durante el tiempo necesario para cumplir con las finalidades
                descritas, o según lo exija la normativa aplicable (por ejemplo, registros de reclamos bajo
                la normativa de protección al consumidor).
              </p>
            </div>

            <div>
              <h2>7. Tus derechos</h2>
              <p>
                Puedes ejercer tus derechos de Acceso, Rectificación, Cancelación y Oposición (derechos
                ARCO) sobre tus datos personales en cualquier momento y de forma gratuita, escribiendo a
                {' '}<strong>dgt_21@hotmail.com</strong>.
              </p>
            </div>

            <div>
              <h2>8. Seguridad</h2>
              <p>
                Aplicamos medidas técnicas y organizativas razonables para proteger tus datos personales
                frente a accesos no autorizados, pérdida o alteración.
              </p>
            </div>

            <div>
              <h2>9. Cambios a esta política</h2>
              <p>
                Podemos actualizar esta política ocasionalmente. Cualquier cambio será publicado en esta
                misma página con la fecha de revisión actualizada.
              </p>
            </div>

            <div>
              <h2>10. Contacto</h2>
              <p>
                Ante cualquier duda sobre esta política, contáctanos al correo <strong>dgt_21@hotmail.com</strong>
                {' '}o al <strong>+51 942 661 120</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
