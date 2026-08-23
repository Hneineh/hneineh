import type { ContactFormField, Localized } from './types'

/**
 * Web3Forms delivers the submission straight to `recipientEmail` with no
 * backend of our own — https://web3forms.com. The submit endpoint is
 * fixed/public for every Web3Forms user (not environment-specific), so it
 * lives here as a constant; only the Access Key varies per account and
 * lives in .env (see .env.example). The key is public-by-design (meant to
 * ship in client code) — it's kept in .env for easy swapping, not secrecy.
 * None of this is language-specific.
 */
export const contactConfig = {
  recipientEmail: 'info@hneineh.com',
  phoneNumber: '+961 81 066 873',
  whatsappUrl: 'https://wa.me/96181066873',
  web3formsEndpoint: 'https://api.web3forms.com/submit',
  web3formsAccessKey: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
}

export const contactPopup: Localized<{
  title: string
  subtitle: string
  emailLabel: string
  phoneLabel: string
  closeLabel: string
}> = {
  ar: {
    title: 'تواصل معنا',
    subtitle: 'نحنا هون، تواصل معنا بالطريقة يلي بتريحك.',
    emailLabel: 'البريد الإلكتروني',
    phoneLabel: 'رقم الهاتف',
    closeLabel: 'إغلاق',
  },
  en: {
    title: 'Get in Touch',
    subtitle: "We're here — reach out directly, whichever way suits you.",
    emailLabel: 'Email',
    phoneLabel: 'Phone',
    closeLabel: 'Close',
  },
}

export const contactSection: Localized<{
  title: string
  subtitle: string
  emailSubject: string
  submitLabel: string
  submittingLabel: string
  successMessage: string
  errorMessage: string
}> = {
  ar: {
    title: 'خبرنا شو في ببالك',
    subtitle: '',
    emailSubject: 'طلب تواصل جديد من موقع حنينة',
    submitLabel: 'إرسال',
    submittingLabel: 'جاري الإرسال...',
    successMessage: 'تم إرسال رسالتك بنجاح، رح نتواصل معك قريبًا.',
    errorMessage: 'صار في خطأ أثناء الإرسال، جرّب مرة تانية أو تواصل معنا مباشرة على',
  },
  en: {
    title: 'Let’s Bring Your Vision to Life',
    subtitle: '',
    emailSubject: 'New contact request from the Hneineh website',
    submitLabel: 'Send',
    submittingLabel: 'Sending...',
    successMessage: 'Your message has been sent successfully — we’ll be in touch soon.',
    errorMessage: 'Something went wrong while sending. Please try again or reach us directly at',
  },
}

export const contactFields: Localized<ContactFormField[]> = {
  ar: [
    {
      id: 'name',
      name: 'name',
      label: 'الاسم الكريم',
      placeholder: 'الاسم الكريم',
      type: 'text',
      required: true,
    },
    {
      id: 'phone',
      name: 'phone',
      label: 'رقم الهاتف',
      placeholder: 'رقم هاتفك',
      type: 'tel',
      required: true,
      isLtr: true,
    },
    {
      id: 'email',
      name: 'email',
      label: 'البريد الإلكتروني',
      placeholder: 'name@example.com',
      type: 'email',
      required: true,
      isLtr: true,
    },
    {
      id: 'message',
      name: 'message',
      label: 'رسالتك',
      placeholder: 'شاركنا تفاصيل مشروعك أو أي ملاحظات...',
      type: 'textarea',
      required: true,
    },
  ],
  en: [
    {
      id: 'name',
      name: 'name',
      label: 'Full Name',
      placeholder: 'Full name',
      type: 'text',
      required: true,
    },
    {
      id: 'phone',
      name: 'phone',
      label: 'Phone Number',
      placeholder: 'Your phone number',
      type: 'tel',
      required: true,
      isLtr: true,
    },
    {
      id: 'email',
      name: 'email',
      label: 'Email Address',
      placeholder: 'name@example.com',
      type: 'email',
      required: true,
      isLtr: true,
    },
    {
      id: 'message',
      name: 'message',
      label: 'Your Message',
      placeholder: 'Tell us about your project or any notes...',
      type: 'textarea',
      required: true,
    },
  ],
}

export const contactValidationMessages: Localized<{
  required: string
  invalidEmail: string
  invalidPhone: string
}> = {
  ar: {
    required: 'هالحقل مطلوب',
    invalidEmail: 'الرجاء إدخال بريد إلكتروني صحيح',
    invalidPhone: 'الرجاء إدخال رقم هاتف صحيح',
  },
  en: {
    required: 'This field is required',
    invalidEmail: 'Please enter a valid email address',
    invalidPhone: 'Please enter a valid phone number',
  },
}
