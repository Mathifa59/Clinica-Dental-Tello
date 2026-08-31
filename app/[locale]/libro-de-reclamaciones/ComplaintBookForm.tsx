'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { submitComplaint } from '@/lib/actions';
import styles from './page.module.css';

type FormState = {
  consumerName: string;
  consumerDoc: string;
  consumerAddress: string;
  consumerEmail: string;
  consumerPhone: string;
  isMinor: boolean;
  guardianName: string;
  goodType: 'producto' | 'servicio';
  goodDescription: string;
  claimedAmount: string;
  complaintType: 'reclamo' | 'queja';
  detail: string;
  request: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;
type Status = 'idle' | 'loading' | 'success' | 'error';

const INITIAL_STATE: FormState = {
  consumerName: '',
  consumerDoc: '',
  consumerAddress: '',
  consumerEmail: '',
  consumerPhone: '',
  isMinor: false,
  guardianName: '',
  goodType: 'servicio',
  goodDescription: '',
  claimedAmount: '',
  complaintType: 'reclamo',
  detail: '',
  request: '',
};

export default function ComplaintBookForm() {
  const t = useTranslations('complaintBook');
  const tForm = useTranslations('complaintBook.form');

  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [reference, setReference] = useState<string | null>(null);

  const validate = (): FormErrors => {
    const e: FormErrors = {};
    if (!form.consumerName.trim()) e.consumerName = tForm('errors.required');
    if (!form.consumerDoc.trim()) e.consumerDoc = tForm('errors.required');
    if (!form.consumerAddress.trim()) e.consumerAddress = tForm('errors.required');
    if (!form.consumerEmail.trim()) e.consumerEmail = tForm('errors.required');
    else if (!/^\S+@\S+\.\S+$/.test(form.consumerEmail)) e.consumerEmail = tForm('errors.email_invalid');
    if (!form.consumerPhone.trim()) e.consumerPhone = tForm('errors.required');
    if (form.isMinor && !form.guardianName.trim()) e.guardianName = tForm('errors.required');
    if (!form.goodDescription.trim()) e.goodDescription = tForm('errors.required');
    if (!form.detail.trim()) e.detail = tForm('errors.required');
    if (!form.request.trim()) e.request = tForm('errors.required');
    return e;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
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
    const result = await submitComplaint({
      consumerName: form.consumerName,
      consumerDoc: form.consumerDoc,
      consumerAddress: form.consumerAddress,
      consumerEmail: form.consumerEmail,
      consumerPhone: form.consumerPhone,
      isMinor: form.isMinor,
      guardianName: form.guardianName || undefined,
      goodType: form.goodType,
      goodDescription: form.goodDescription,
      claimedAmount: form.claimedAmount || undefined,
      complaintType: form.complaintType,
      detail: form.detail,
      request: form.request,
    });
    if (result.success) {
      setReference(result.reference ?? null);
      setStatus('success');
    } else {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className={styles.formCard}>
        <div className={styles.success}>
          <div className={styles.successIcon}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <h2>{t('success_title')}</h2>
          {reference && <span className={styles.reference}>{reference}</span>}
          <p>{t('success_message')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.formCard}>
      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        {/* Datos del consumidor */}
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>{t('section_consumer')}</legend>

          <div className={styles.field}>
            <label htmlFor="consumerName" className={styles.label}>
              {tForm('name_label')} <span className={styles.required}>*</span>
            </label>
            <input
              id="consumerName" name="consumerName" type="text" autoComplete="name"
              className={`${styles.input} ${errors.consumerName ? styles.inputError : ''}`}
              value={form.consumerName} onChange={handleChange}
            />
            {errors.consumerName && <span className={styles.error}>{errors.consumerName}</span>}
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="consumerDoc" className={styles.label}>
                {tForm('doc_label')} <span className={styles.required}>*</span>
              </label>
              <input
                id="consumerDoc" name="consumerDoc" type="text" placeholder={tForm('doc_placeholder')}
                className={`${styles.input} ${errors.consumerDoc ? styles.inputError : ''}`}
                value={form.consumerDoc} onChange={handleChange}
              />
              {errors.consumerDoc && <span className={styles.error}>{errors.consumerDoc}</span>}
            </div>
            <div className={styles.field}>
              <label htmlFor="consumerPhone" className={styles.label}>
                {tForm('phone_label')} <span className={styles.required}>*</span>
              </label>
              <input
                id="consumerPhone" name="consumerPhone" type="tel" autoComplete="tel"
                className={`${styles.input} ${errors.consumerPhone ? styles.inputError : ''}`}
                value={form.consumerPhone} onChange={handleChange}
              />
              {errors.consumerPhone && <span className={styles.error}>{errors.consumerPhone}</span>}
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="consumerAddress" className={styles.label}>
              {tForm('address_label')} <span className={styles.required}>*</span>
            </label>
            <input
              id="consumerAddress" name="consumerAddress" type="text" autoComplete="street-address"
              className={`${styles.input} ${errors.consumerAddress ? styles.inputError : ''}`}
              value={form.consumerAddress} onChange={handleChange}
            />
            {errors.consumerAddress && <span className={styles.error}>{errors.consumerAddress}</span>}
          </div>

          <div className={styles.field}>
            <label htmlFor="consumerEmail" className={styles.label}>
              {tForm('email_label')} <span className={styles.required}>*</span>
            </label>
            <input
              id="consumerEmail" name="consumerEmail" type="email" autoComplete="email"
              className={`${styles.input} ${errors.consumerEmail ? styles.inputError : ''}`}
              value={form.consumerEmail} onChange={handleChange}
            />
            {errors.consumerEmail && <span className={styles.error}>{errors.consumerEmail}</span>}
          </div>

          <label className={styles.checkboxOption}>
            <input type="checkbox" name="isMinor" checked={form.isMinor} onChange={handleChange} />
            {tForm('is_minor_label')}
          </label>

          {form.isMinor && (
            <div className={styles.field}>
              <label htmlFor="guardianName" className={styles.label}>
                {tForm('guardian_label')} <span className={styles.required}>*</span>
              </label>
              <input
                id="guardianName" name="guardianName" type="text"
                className={`${styles.input} ${errors.guardianName ? styles.inputError : ''}`}
                value={form.guardianName} onChange={handleChange}
              />
              {errors.guardianName && <span className={styles.error}>{errors.guardianName}</span>}
            </div>
          )}
        </fieldset>

        {/* Bien contratado */}
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>{t('section_good')}</legend>

          <div className={styles.field}>
            <span className={styles.label}>{tForm('good_type_label')}</span>
            <div className={styles.radioGroup}>
              <label className={styles.radioOption}>
                <input type="radio" name="goodType" value="producto" checked={form.goodType === 'producto'} onChange={handleChange} />
                {tForm('good_type_product')}
              </label>
              <label className={styles.radioOption}>
                <input type="radio" name="goodType" value="servicio" checked={form.goodType === 'servicio'} onChange={handleChange} />
                {tForm('good_type_service')}
              </label>
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="goodDescription" className={styles.label}>
              {tForm('good_description_label')} <span className={styles.required}>*</span>
            </label>
            <textarea
              id="goodDescription" name="goodDescription" rows={2}
              className={`${styles.textarea} ${errors.goodDescription ? styles.inputError : ''}`}
              value={form.goodDescription} onChange={handleChange}
            />
            {errors.goodDescription && <span className={styles.error}>{errors.goodDescription}</span>}
          </div>

          <div className={styles.field}>
            <label htmlFor="claimedAmount" className={styles.label}>{tForm('amount_label')}</label>
            <input
              id="claimedAmount" name="claimedAmount" type="text" placeholder={tForm('amount_placeholder')}
              className={styles.input}
              value={form.claimedAmount} onChange={handleChange}
            />
          </div>
        </fieldset>

        {/* Detalle */}
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>{t('section_detail')}</legend>

          <div className={styles.field}>
            <span className={styles.label}>{tForm('complaint_type_label')}</span>
            <div className={styles.radioGroup}>
              <label className={styles.radioOption}>
                <input type="radio" name="complaintType" value="reclamo" checked={form.complaintType === 'reclamo'} onChange={handleChange} />
                {tForm('complaint_type_reclamo')}
              </label>
              <label className={styles.radioOption}>
                <input type="radio" name="complaintType" value="queja" checked={form.complaintType === 'queja'} onChange={handleChange} />
                {tForm('complaint_type_queja')}
              </label>
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="detail" className={styles.label}>
              {tForm('detail_label')} <span className={styles.required}>*</span>
            </label>
            <textarea
              id="detail" name="detail" rows={4}
              className={`${styles.textarea} ${errors.detail ? styles.inputError : ''}`}
              value={form.detail} onChange={handleChange}
            />
            {errors.detail && <span className={styles.error}>{errors.detail}</span>}
          </div>

          <div className={styles.field}>
            <label htmlFor="request" className={styles.label}>
              {tForm('request_label')} <span className={styles.required}>*</span>
            </label>
            <textarea
              id="request" name="request" rows={3}
              className={`${styles.textarea} ${errors.request ? styles.inputError : ''}`}
              value={form.request} onChange={handleChange}
            />
            {errors.request && <span className={styles.error}>{errors.request}</span>}
          </div>
        </fieldset>

        {status === 'error' && (
          <p className={styles.error} role="alert">{t('error_message')}</p>
        )}

        <button type="submit" className={`btn btn--primary ${styles.submitBtn}`} disabled={status === 'loading'}>
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
    </div>
  );
}
