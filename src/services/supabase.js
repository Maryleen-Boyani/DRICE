import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Contact form service
export const contactService = {
  async submitInquiry(formData) {
    try {
      // Validate required fields
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.projectDescription) {
        throw new Error('All fields are required');
      }

      // Insert into Supabase
      const { data, error } = await supabase
        .from('inquiries')
        .insert([{
          first_name: formData.firstName.trim(),
          last_name: formData.lastName.trim(),
          email: formData.email.trim().toLowerCase(),
          project_description: formData.projectDescription.trim(),
          status: 'pending',
          created_at: new Date().toISOString(),
          ip_address: await this.getClientIP(),
          user_agent: navigator.userAgent
        }])
        .select()
        .single();

      if (error) throw error;

      // Create mailto link for user
      const mailtoLink = this.createMailtoLink(formData, data.id);

      return {
        success: true,
        message: 'Inquiry submitted successfully! We\'ll contact you within 48 hours.',
        data: data,
        mailtoLink: mailtoLink,
        directEmail: import.meta.env.VITE_DRICE_EMAIL
      };

    } catch (error) {
      console.error('Submission error:', error);
      
      return {
        success: false,
        message: error.message || 'Failed to submit inquiry. Please try again or email us directly.',
        directEmail: import.meta.env.VITE_DRICE_EMAIL
      };
    }
  },

  async getClientIP() {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch {
      return 'unknown';
    }
  },

  createMailtoLink(formData, inquiryId) {
    const subject = `DRICE Inquiry #${inquiryId}: ${formData.firstName} ${formData.lastName}`;
    const body = `
INQUIRY ID: ${inquiryId}
NAME: ${formData.firstName} ${formName} ${formData.lastName}
EMAIL: ${formData.email}
DATE: ${new Date().toLocaleDateString('en-KE', { 
  weekday: 'long', 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
})}

PROJECT DESCRIPTION:
${formData.projectDescription}

---
Submitted via DRICE Contact Form (${window.location.href})
    `.trim();

    return `mailto:${import.meta.env.VITE_DRICE_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  },

  // Optional: Fetch inquiries (for admin)
  async getInquiries() {
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};