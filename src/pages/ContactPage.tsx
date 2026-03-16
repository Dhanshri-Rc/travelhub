import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, MessageSquare, Shield } from 'lucide-react';

const faqs = [
  { q: 'How do you verify safety ratings?',          a: 'Our safety team conducts on-site inspections, reviews traveler feedback, and checks certifications for every partner before approval.' },
  { q: 'What does Women Friendly certification mean?', a: 'Certified partners have dedicated women-only floors or areas, female staff available 24/7, enhanced lighting, and security features.' },
  { q: 'Can I cancel or modify a booking?',           a: 'Yes! You can manage bookings from your dashboard. Cancellation policies vary by partner — check the listing for details.' },
  { q: 'Is my payment information secure?',           a: 'All payments are encrypted using industry-standard SSL. We never store your full card details on our servers.' },
];

export default function ContactPage() {
  const [form, setForm]     = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent]     = useState(false);
  const [error, setError]   = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) { setError('Please fill in all required fields'); return; }
    setSending(true); setError('');
    // Simulate sending
    await new Promise((r) => setTimeout(r, 1500));
    setSending(false); setSent(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <MessageSquare className="h-4 w-4" /> Get in Touch
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">We're Here to Help</h1>
          <p className="text-primary-100 text-lg">Have a question, feedback, or need assistance? Our team is ready to help.</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Contact Info */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Contact Information</h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Reach out through any of these channels — we typically respond within a few hours.</p>
            </div>

            {[
              { icon: Mail,  label: 'Email',   value: 'support@travelhub.com',  href: 'mailto:support@travelhub.com' },
              { icon: Phone, label: 'Phone',   value: '+1 (555) 123-4567',      href: 'tel:+15551234567' },
              { icon: MapPin,label: 'Address', value: '123 Travel Street, Adventure City, AC 12345', href: '#' },
              { icon: Clock, label: 'Hours',   value: '24/7 Emergency Support\nMon–Fri 9am–6pm for general queries', href: '#' },
            ].map((item, i) => (
              <a key={i} href={item.href}
                className="flex items-start gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow group">
                <div className="bg-primary-100 dark:bg-primary-900/40 p-2.5 rounded-xl flex-shrink-0">
                  <item.icon className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">{item.label}</p>
                  <p className="text-sm text-gray-900 dark:text-white font-medium mt-0.5 whitespace-pre-line group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{item.value}</p>
                </div>
              </a>
            ))}

            {/* Emergency */}
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-5 w-5 text-red-500" />
                <h3 className="font-semibold text-red-700 dark:text-red-400">Emergency Helplines</h3>
              </div>
              <div className="space-y-1 text-sm text-red-600 dark:text-red-400">
                <p>🚔 Police: <strong>100</strong></p>
                <p>🆘 Women Helpline: <strong>1091</strong></p>
                <p>🗺️ Tourist Helpline: <strong>1363</strong></p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-8">
              {sent ? (
                <div className="text-center py-10">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Message Sent!</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                  <button onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
                    className="px-6 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-xl text-sm font-medium transition-colors">
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Send Us a Message</h2>

                  {error && (
                    <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm">{error}</div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {[
                        { key: 'name',    label: 'Your Name *',      type: 'text',  placeholder: 'John Smith' },
                        { key: 'email',   label: 'Email Address *',  type: 'email', placeholder: 'john@example.com' },
                      ].map(({ key, label, type, placeholder }) => (
                        <div key={key}>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{label}</label>
                          <input type={type} value={(form as any)[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                            placeholder={placeholder}
                            className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white text-sm"
                          />
                        </div>
                      ))}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Subject</label>
                      <select value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white text-sm">
                        <option value="">Select a subject…</option>
                        <option>Booking Support</option>
                        <option>Safety Concern</option>
                        <option>Partner Inquiry</option>
                        <option>Technical Issue</option>
                        <option>General Feedback</option>
                        <option>Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Message *</label>
                      <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                        rows={5} placeholder="Tell us how we can help you…"
                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white text-sm resize-none"
                      />
                    </div>

                    <button type="submit" disabled={sending}
                      className="flex items-center gap-2 bg-primary-500 hover:bg-primary-600 disabled:bg-primary-300 text-white px-8 py-3 rounded-xl font-semibold transition-colors">
                      {sending ? <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" /> : <Send className="h-5 w-5" />}
                      {sending ? 'Sending…' : 'Send Message'}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">{faq.q}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
