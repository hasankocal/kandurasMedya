export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  errors?: string[];
}

import { supabase } from '../lib/supabase';

export const submitContactForm = async (data: ContactFormData): Promise<ContactResponse> => {
  try {
    const { data: contactData, error } = await supabase
      .from('contacts')
      .insert([
        {
          name: data.name,
          email: data.email,
          phone: data.phone,
          subject: data.subject,
          message: data.message,
          status: 'new'
        }
      ])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      throw new Error('Veritabanı hatası');
    }

    return {
      success: true,
      message: 'Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.'
    };
  } catch (error) {
    console.error('Contact form submission error:', error);
    
    return {
      success: false,
      message: 'Bağlantı hatası. Lütfen daha sonra tekrar deneyiniz.',
    };
  }
}; 