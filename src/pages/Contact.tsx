import React, { useState } from 'react';
import SectionHeading from '../components/ui/SectionHeading';
import Button from '../components/ui/Button';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { submitContactForm, ContactFormData } from '../services/contactService';
import { useSite } from '../context/SiteContext';

interface FormValues {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  agree: boolean;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
  agree?: string;
}

const Contact: React.FC = () => {
  const { siteSettings } = useSite();
  

  
  const [formValues, setFormValues] = useState<FormValues>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    agree: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormValues({ ...formValues, [name]: checked });

    // Clear error when user checks the box
    if (errors[name as keyof FormErrors]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formValues.name.trim()) {
      newErrors.name = 'İsim zorunludur';
    }
    
    if (!formValues.email.trim()) {
      newErrors.email = 'E-posta zorunludur';
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      newErrors.email = 'Geçerli bir e-posta adresi giriniz';
    }
    
    if (!formValues.phone.trim()) {
      newErrors.phone = 'Telefon numarası zorunludur';
    }
    
    if (!formValues.subject) {
      newErrors.subject = 'Konu seçimi zorunludur';
    }
    
    if (!formValues.message.trim()) {
      newErrors.message = 'Mesaj zorunludur';
    }
    
    if (!formValues.agree) {
      newErrors.agree = 'Gizlilik politikasını kabul etmelisiniz';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      const formData: ContactFormData = {
        name: formValues.name,
        email: formValues.email,
        phone: formValues.phone,
        subject: formValues.subject,
        message: formValues.message,
      };
      
      try {
        const result = await submitContactForm(formData);
        
        if (result.success) {
          setSubmitSuccess(true);
          
          // Reset form after successful submission
          setFormValues({
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: '',
            agree: false,
          });
          
          // Reset success message after some time
          setTimeout(() => {
            setSubmitSuccess(false);
          }, 5000);
        } else {
          // Handle server errors
          if (result.errors) {
            const serverErrors: FormErrors = {};
            result.errors.forEach((error: string) => {
              if (error.includes('Name')) serverErrors.name = error;
              else if (error.includes('Email')) serverErrors.email = error;
              else if (error.includes('Phone')) serverErrors.phone = error;
              else if (error.includes('Subject')) serverErrors.subject = error;
              else if (error.includes('Message')) serverErrors.message = error;
            });
            setErrors(serverErrors);
          }
          
          // Show error message
          alert(result.message || 'Mesaj gönderilirken bir hata oluştu.');
        }
      } catch (error) {
        console.error('Form submission error:', error);
        alert('Bağlantı hatası. Lütfen daha sonra tekrar deneyiniz.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div>

      
      {/* Hero Section */}
      <section className="bg-primary-700 text-white py-24 relative">
        <div className="absolute inset-0 bg-dark-500 opacity-50"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">İletişim</h1>
            <p className="text-xl text-light-300">
              Dijital pazarlama ihtiyaçlarınız için bizimle iletişime geçin
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="fade-in-section">
              <SectionHeading 
                title="İletişim Bilgilerimiz" 
                subtitle="Dijital pazarlama stratejileriniz için bizimle iletişime geçin"
              />
              
              <div className="space-y-6 mt-8">
                <div className="flex items-start">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-50 text-primary-600 rounded-full mr-4 flex-shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Adres</h3>
                    <p className="text-dark-300">
                      {siteSettings?.contact_address || 'İstasyon Yolu Sk. No: 3/1, Maltepe, İstanbul'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-50 text-primary-600 rounded-full mr-4 flex-shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Telefon</h3>
                    <p className="text-dark-300">
                      {siteSettings?.contact_phone1 || '+90 850 441 75 49'}<br />
                      {siteSettings?.contact_phone2 || '+90 538 587 39 84'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-50 text-primary-600 rounded-full mr-4 flex-shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">E-posta</h3>
                    <p className="text-dark-300">
                      {siteSettings?.contact_email || 'bilgi@kandurasmedya.com'}<br />
                      {siteSettings?.contact_support_email || 'destek@kandurasmedya.com'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-50 text-primary-600 rounded-full mr-4 flex-shrink-0">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Çalışma Saatleri</h3>
                    <p className="text-dark-300">
                      Pazartesi - Cuma: 09:00 - 18:00<br />
                      Cumartesi: 10:00 - 14:00
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-12">
                <h3 className="text-xl font-semibold mb-4">Sosyal Medya</h3>
                <div className="flex space-x-4">
                  <a 
                    href="#" 
                    className="inline-flex items-center justify-center w-10 h-10 bg-primary-50 text-primary-600 rounded-full hover:bg-primary-100 transition-colors"
                    aria-label="Facebook"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9.19795 21.5H13.198V13.4901H16.8021L17.198 9.50977H13.198V7.5C13.198 6.94772 13.6457 6.5 14.198 6.5H17.198V2.5H14.198C11.4365 2.5 9.19795 4.73858 9.19795 7.5V9.50977H7.19795L6.80206 13.4901H9.19795V21.5Z"></path>
                    </svg>
                  </a>
                  <a 
                    href="#" 
                    className="inline-flex items-center justify-center w-10 h-10 bg-primary-50 text-primary-600 rounded-full hover:bg-primary-100 transition-colors"
                    aria-label="Twitter"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.9441 7.92638C19.9568 8.10403 19.9568 8.28174 19.9568 8.4594C19.9568 13.8982 15.8325 20.1216 8.29441 20.1216C5.97207 20.1216 3.81473 19.4569 2 18.3039C2.32996 18.3419 2.64719 18.3546 2.98984 18.3546C4.90605 18.3546 6.67004 17.7153 8.07867 16.6129C6.27664 16.5749 4.76648 15.395 4.24617 13.7813C4.5 13.8193 4.75379 13.8446 5.02031 13.8446C5.38832 13.8446 5.75637 13.794 6.09898 13.7052C4.22082 13.321 2.78684 11.6693 2.78684 9.67133V9.62064C3.33254 9.92513 3.95242 10.1154 4.60965 10.1408C3.48199 9.39909 2.8112 8.11673 2.8112 6.68276C2.8112 5.91562 3.00156 5.21054 3.33254 4.59062C5.33586 7.06358 8.30707 8.73788 11.6471 8.91554C11.5837 8.61106 11.5456 8.29381 11.5456 7.97655C11.5456 5.71511 13.3603 3.8877 15.6319 3.8877C16.8237 3.8877 17.8996 4.36018 18.6668 5.12732C19.6158 4.9497 20.5141 4.61968 21.3066 4.15996C21.0018 5.08997 20.3445 5.91566 19.4715 6.44138C20.3192 6.3527 21.1416 6.12211 21.8961 5.80486C21.3067 6.6432 20.5775 7.3736 19.7469 7.97655C19.7596 8.06522 19.7596 8.15384 19.7596 8.24251C19.7596 8.48585 19.7469 8.72925 19.7342 8.97265C20.2036 8.9093 20.661 8.76318 21.0929 8.53913C20.8644 9.10046 20.5649 9.62064 20.1977 10.0803C19.9441 9.38798 19.5887 8.66349 19.0938 7.92638H19.9441Z"></path>
                    </svg>
                  </a>
                  <a 
                    href="#" 
                    className="inline-flex items-center justify-center w-10 h-10 bg-primary-50 text-primary-600 rounded-full hover:bg-primary-100 transition-colors"
                    aria-label="Instagram"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.0001 8.87578C10.2798 8.87578 8.8759 10.2797 8.8759 12C8.8759 13.7203 10.2798 15.1242 12.0001 15.1242C13.7204 15.1242 15.1243 13.7203 15.1243 12C15.1243 10.2797 13.7204 8.87578 12.0001 8.87578ZM21.3704 12C21.3704 10.7062 21.3822 9.42422 21.3095 8.13281C21.2368 6.63281 20.8947 5.30156 19.7978 4.20469C18.6986 3.10547 17.3697 2.76562 15.8697 2.69297C14.5759 2.62031 13.2939 2.63203 12.0025 2.63203C10.7087 2.63203 9.42668 2.62031 8.13527 2.69297C6.63527 2.76562 5.30402 3.10781 4.20714 4.20469C3.10792 5.30391 2.76808 6.63281 2.69542 8.13281C2.62277 9.42656 2.63449 10.7086 2.63449 12C2.63449 13.2914 2.62277 14.5758 2.69542 15.8672C2.76808 17.3672 3.11027 18.6984 4.20714 19.7953C5.30636 20.8945 6.63527 21.2344 8.13527 21.307C9.42902 21.3797 10.7111 21.368 12.0025 21.368C13.2962 21.368 14.5783 21.3797 15.8697 21.307C17.3697 21.2344 18.7009 20.8922 19.7978 19.7953C20.897 18.6961 21.2368 17.3672 21.3095 15.8672C21.3845 14.5758 21.3704 13.2938 21.3704 12ZM12.0001 16.807C9.33996 16.807 7.19308 14.6602 7.19308 12C7.19308 9.33984 9.33996 7.19297 12.0001 7.19297C14.6603 7.19297 16.8072 9.33984 16.8072 12C16.8072 14.6602 14.6603 16.807 12.0001 16.807ZM17.004 8.11875C16.3829 8.11875 15.8814 7.61719 15.8814 6.99609C15.8814 6.375 16.3829 5.87344 17.004 5.87344C17.6251 5.87344 18.1267 6.375 18.1267 6.99609C18.1269 7.14357 18.098 7.28964 18.0416 7.42511C17.9853 7.56057 17.9026 7.68251 17.7983 7.78677C17.694 7.89103 17.5721 7.97382 17.4366 8.03016C17.3011 8.08649 17.1551 8.11538 17.0076 8.11523L17.004 8.11875Z"></path>
                    </svg>
                  </a>
                  <a 
                    href="#" 
                    className="inline-flex items-center justify-center w-10 h-10 bg-primary-50 text-primary-600 rounded-full hover:bg-primary-100 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M5.37214 7.41673H8.75232V16.6664H5.37214V7.41673ZM7.06404 3.33339C8.10432 3.33339 8.94641 4.17577 8.94641 5.21639C8.94641 6.257 8.10432 7.09937 7.06404 7.09937C6.02376 7.09937 5.18167 6.257 5.18167 5.21639C5.18167 4.17577 6.02376 3.33339 7.06404 3.33339ZM11.7693 11.9916V7.41673H15.1495V9.02506H15.183C15.5679 8.12653 16.6749 7.18332 18.3423 7.18332C21.7561 7.18332 22.33 9.47465 22.33 12.4161V16.6664H18.9498V13.0413C18.9498 11.8745 18.9164 10.3747 17.3157 10.3747C15.7151 10.3747 15.4471 11.6329 15.4471 12.9327V16.6664H12.0669V11.9916H11.7693Z"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow-md fade-in-section">
              <h2 className="text-2xl font-bold mb-6">Bize Ulaşın</h2>
              
              {submitSuccess && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <span>Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.</span>
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-dark-500 font-medium mb-2">
                      İsim Soyisim*
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formValues.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                        errors.name ? 'border-red-500' : 'border-light-700'
                      }`}
                      placeholder="Adınız ve soyadınız"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-dark-500 font-medium mb-2">
                      E-posta*
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formValues.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                        errors.email ? 'border-red-500' : 'border-light-700'
                      }`}
                      placeholder="ornek@email.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="phone" className="block text-dark-500 font-medium mb-2">
                      Telefon*
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formValues.phone}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                        errors.phone ? 'border-red-500' : 'border-light-700'
                      }`}
                      placeholder="+90 5XX XXX XX XX"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-dark-500 font-medium mb-2">
                      Konu*
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formValues.subject}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                        errors.subject ? 'border-red-500' : 'border-light-700'
                      }`}
                    >
                      <option value="">Konu seçiniz</option>
                      <option value="Sosyal Medya Yönetimi">Sosyal Medya Yönetimi</option>
                      <option value="SEO Optimizasyonu">SEO Optimizasyonu</option>
                      <option value="Google Ads Yönetimi">Google Ads Yönetimi</option>
                      <option value="Web Tasarım & Geliştirme">Web Tasarım & Geliştirme</option>
                      <option value="E-posta Pazarlaması">E-posta Pazarlaması</option>
                      <option value="Uygulama Geliştirme">Uygulama Geliştirme</option>
                      <option value="Genel Bilgi">Genel Bilgi</option>
                    </select>
                    {errors.subject && (
                      <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
                    )}
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-dark-500 font-medium mb-2">
                    Mesajınız*
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formValues.message}
                    onChange={handleChange}
                    rows={6}
                    className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                      errors.message ? 'border-red-500' : 'border-light-700'
                    }`}
                    placeholder="Projeniz hakkında detaylı bilgi veriniz..."
                  ></textarea>
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                  )}
                </div>
                
                <div className="mb-6">
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      name="agree"
                      checked={formValues.agree}
                      onChange={handleCheckboxChange}
                      className="mt-1 mr-3 rounded border-light-700 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm text-dark-300">
                      <a href="#" className="text-primary-600 hover:text-primary-700 underline">
                        Gizlilik Politikası
                      </a>'nı okudum ve kabul ediyorum.*
                    </span>
                  </label>
                  {errors.agree && (
                    <p className="text-red-500 text-sm mt-1">{errors.agree}</p>
                  )}
                </div>
                
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Gönderiliyor...
                    </>
                  ) : (
                    <>
                      <Send size={20} className="mr-2" />
                      Mesaj Gönder
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-12 bg-light-500">
        <div className="container mx-auto px-4 md:px-6">
          <div className="rounded-lg overflow-hidden shadow-md h-96 fade-in-section">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.8963338026066!2d29.0628359!3d41.002497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cac790b17ba89d%3A0xd2d24ea0437a7ee2!2sBa%C4%9Fdat%20Cd.%2C%20Kad%C4%B1k%C3%B6y%2F%C4%B0stanbul!5e0!3m2!1str!2str!4v1632780847683!5m2!1str!2str" 
              className="w-full h-full"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Kanduras Medya Ofis Konumu"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;