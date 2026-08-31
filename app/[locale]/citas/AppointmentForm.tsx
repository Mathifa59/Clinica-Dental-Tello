'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import FaqAccordion from '@/components/ui/FaqAccordion';
import Reveal from '@/components/ui/Reveal';
import { submitAppointment } from '@/lib/actions';
import styles from './page.module.css';

const CLINIC_IMAGE = '/images/clinic/consultorio.jpg';

type FormState = {
  name: string;
  phone: string;
  service: string;
  date: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;
type Status = 'idle' | 'loading' | 'success' | 'error';

const SERVICE_KEYS = ['orthodontics', 'implants', 'emergency', 'oralRehab', 'aesthetics', 'surgery', 'endodontics'] as const;

const EXTERIOR_IMAGE = '/images/clinic/exterior-amplio.jpg';

function getTodayString() {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

function validatePhone(phone: string) {
  return /^9\d{2}-\d{3}-\d{3}$/.test(phone);
}

const FAQ_KEYS = ['q1', 'q2', 'q3', 'q4', 'q5'] as const;

export default function AppointmentForm() {
  const t = useTranslations('appointments');
  const tForm = useTranslations('appointments.form');
  const tContact = useTranslations('contact');
  const faqItems = FAQ_KEYS.map((key) => ({
    question: t(`faq.${key}.question` as Parameters<typeof t>[0]),
    answer: t(`faq.${key}.answer` as Parameters<typeof t>[0]),
  }));

  const [form, setForm] = useState<FormState>({
    name: '',
    phone: '',
    service: '',
    date: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>('idle');

  const validate = (): FormErrors => {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = tForm('errors.name_required');
    if (!form.phone.trim()) e.phone = tForm('errors.phone_required');
    else if (!validatePhone(form.phone.trim())) e.phone = tForm('errors.phone_invalid');
    if (!form.service) e.service = tForm('errors.service_required');
    if (!form.date) e.date = tForm('errors.date_required');
    else if (form.date < getTodayString()) e.date = tForm('errors.date_past');
    return e;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setStatus('loading');
    const serviceLabel = tForm(`services.${form.service}` as Parameters<typeof tForm>[0]);
    const result = await submitAppointment({
      name: form.name,
      phone: form.phone,
      service: serviceLabel,
      date: form.date,
      message: form.message,
    });
    setStatus(result.success ? 'success' : 'error');
  };

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <h1>{t('hero_title')}</h1>
          <p>{t('hero_subtitle')}</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className={styles.layout}>
            {/* Form */}
            <div className={styles.formCard}>
              {status === 'success' ? (
                <div className={styles.success}>
                  <div className={styles.successIcon}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <h2>{t('success_title')}</h2>
                  <p>{t('success_message')}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.form} noValidate>
                  <div className={styles.field}>
                    <label htmlFor="name" className={styles.label}>
                      {tForm('name_label')} <span className={styles.required}>*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                      placeholder={tForm('name_placeholder')}
                      value={form.name}
                      onChange={handleChange}
                      autoComplete="name"
                    />
                    {errors.name && <span className={styles.error}>{errors.name}</span>}
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="phone" className={styles.label}>
                      {tForm('phone_label')} <span className={styles.required}>*</span>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
                      placeholder={tForm('phone_placeholder')}
                      value={form.phone}
                      onChange={handleChange}
                      autoComplete="tel"
                    />
                    {errors.phone && <span className={styles.error}>{errors.phone}</span>}
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="service" className={styles.label}>
                      {tForm('service_label')} <span className={styles.required}>*</span>
                    </label>
                    <div className={styles.selectWrap}>
                      <select
                        id="service"
                        name="service"
                        className={`${styles.select} ${errors.service ? styles.inputError : ''}`}
                        value={form.service}
                        onChange={handleChange}
                      >
                        <option value="">{tForm('service_placeholder')}</option>
                        {SERVICE_KEYS.map((key) => (
                          <option key={key} value={key}>
                            {tForm(`services.${key}` as Parameters<typeof tForm>[0])}
                          </option>
                        ))}
                      </select>
                      <span className={styles.selectArrow}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </span>
                    </div>
                    {errors.service && <span className={styles.error}>{errors.service}</span>}
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="date" className={styles.label}>
                      {tForm('date_label')} <span className={styles.required}>*</span>
                    </label>
                    <input
                      id="date"
                      name="date"
                      type="date"
                      className={`${styles.input} ${errors.date ? styles.inputError : ''}`}
                      value={form.date}
                      onChange={handleChange}
                      min={getTodayString()}
                    />
                    {errors.date && <span className={styles.error}>{errors.date}</span>}
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="message" className={styles.label}>
                      {tForm('message_label')}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      className={styles.textarea}
                      placeholder={tForm('message_placeholder')}
                      value={form.message}
                      onChange={handleChange}
                      maxLength={300}
                      rows={4}
                    />
                    <span className={styles.charCount}>
                      {tForm('char_count', { count: form.message.length })}
                    </span>
                  </div>

                  {status === 'error' && (
                    <p className={styles.error} role="alert">{t('error_message')}</p>
                  )}

                  <button
                    type="submit"
                    className={`btn btn--primary ${styles.submitBtn}`}
                    disabled={status === 'loading'}
                  >
                    {status === 'loading' ? (
                      <>
                        <span className={styles.spinner} />
                        {tForm('submitting')}
                      </>
                    ) : (
                      tForm('submit')
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Sidebar */}
            <aside className={styles.sidebar}>
              {/* Clinic image */}
              <div className={styles.clinicImgWrap}>
                {CLINIC_IMAGE ? (
                  <Image
                    src={CLINIC_IMAGE}
                    alt="Consultorio Dental Tello"
                    fill
                    sizes="(max-width: 768px) 100vw, 380px"
                    style={{ objectFit: 'cover' }}
                  />
                ) : (
                  <div className={styles.clinicImgPlaceholder}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                    <span>images/clinic/consultorio.jpg</span>
                  </div>
                )}
              </div>

              <div className={styles.sideCard}>
                <h3 className={styles.sideTitle}>{t('contact_info.title')}</h3>

                <div className={styles.contactItem}>
                  <div className={styles.contactIcon}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.61 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.59a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.92 16z" />
                    </svg>
                  </div>
                  <div>
                    <p className={styles.contactLabel}>Teléfono</p>
                    <a href={`tel:${t('contact_info.phone').replace(/\s/g, '')}`} className={styles.contactValue}>
                      {t('contact_info.phone')}
                    </a>
                  </div>
                </div>

                <div className={styles.contactItem}>
                  <div className={styles.contactIcon} style={{ background: 'rgba(37,211,102,0.1)', color: '#25D366' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    </svg>
                  </div>
                  <div>
                    <p className={styles.contactLabel}>WhatsApp</p>
                    <a href="https://wa.me/51942661120" target="_blank" rel="noopener noreferrer" className={styles.contactValue}>
                      {t('contact_info.whatsapp')}
                    </a>
                  </div>
                </div>
              </div>

              <div className={styles.sideCard}>
                <h3 className={styles.sideTitle}>{t('contact_info.hours_title')}</h3>
                <ul className={styles.hoursList}>
                  <li>
                    <span>{t('contact_info.hours_weekdays')}</span>
                  </li>
                  <li>
                    <span>{t('contact_info.hours_saturday')}</span>
                  </li>
                  <li className={styles.emergency}>
                    <span>{t('contact_info.hours_sunday')}</span>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section className="section--blue">
        <div className="container">
          <Reveal>
            <div className="section-header">
              <h2>{tContact('hero_title')}</h2>
              <p>{tContact('hero_subtitle')}</p>
            </div>
          </Reveal>
          <div className={styles.contactWrap}>
            <Reveal direction="scale">
              <div className={styles.contactInfoCard}>
                <div className={styles.contactInfoItem}>
                  <div className={styles.contactInfoIcon}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div>
                    <p className={styles.contactInfoLabel}>{tContact('address_label')}</p>
                    <p className={styles.contactInfoValue}>{tContact('address')}</p>
                  </div>
                </div>

                <div className={styles.contactInfoItem}>
                  <div className={styles.contactInfoIcon}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.61 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.59a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.92 16z" />
                    </svg>
                  </div>
                  <div>
                    <p className={styles.contactInfoLabel}>{tContact('phone_label')}</p>
                    <a href={`tel:${tContact('phone').replace(/\s/g, '')}`} className={styles.contactInfoLink}>{tContact('phone')}</a>
                  </div>
                </div>

                <div className={styles.contactInfoItem}>
                  <div className={styles.contactInfoIcon}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <div>
                    <p className={styles.contactInfoLabel}>{tContact('email_label')}</p>
                    <a href={`mailto:${tContact('email')}`} className={styles.contactInfoLink}>{tContact('email')}</a>
                  </div>
                </div>

                <div className={styles.contactInfoItem}>
                  <div className={styles.contactInfoIcon}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <div>
                    <p className={styles.contactInfoLabel}>{tContact('hours_label')}</p>
                    <p className={styles.contactInfoValue}>{tContact('hours_weekdays')}</p>
                    <p className={styles.contactInfoValue}>{tContact('hours_saturday')}</p>
                  </div>
                </div>

                <div className={styles.contactSocialSection}>
                  <p className={styles.contactSocialTitle}>{tContact('social_title')}</p>
                  <div className={styles.contactSocialRow}>
                    <a href="https://instagram.com/dr.daniel.tello" target="_blank" rel="noopener noreferrer" className={styles.contactSocialPill} aria-label="Instagram">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                        <circle cx="12" cy="12" r="4" />
                        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
                      </svg>
                      Instagram
                    </a>
                    <a href="https://www.tiktok.com/@dr.daniel.tello" target="_blank" rel="noopener noreferrer" className={styles.contactSocialPill} aria-label="TikTok">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                      </svg>
                      TikTok
                    </a>
                    <a href="https://wa.me/51942661120" target="_blank" rel="noopener noreferrer" className={styles.contactSocialPill} aria-label="WhatsApp">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                      </svg>
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120} direction="scale">
              <div className={styles.contactMediaCol}>
                <div className={styles.contactExterior}>
                  <Image
                    src={EXTERIOR_IMAGE}
                    alt="Exterior Clínica Dental Tello"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className={styles.contactMapEmbed}>
                  <iframe
                    src="https://maps.google.com/maps?q=Av.+Pr%C3%B3ceres+De+Huandoy+7865%2C+Los+Olivos%2C+Lima%2C+Peru&t=&z=16&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={tContact('map_label')}
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section--gradient">
        <div className="container">
          <Reveal>
            <div className="section-header">
              <h2>{t('faq_title')}</h2>
              <p>{t('faq_subtitle')}</p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <FaqAccordion items={faqItems} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
