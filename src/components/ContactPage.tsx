import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', concern: 'Hair Fall Consultation', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      
      <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#78c459]">
          Direct Helpline & Consultations
        </span>
        <h1 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white">
          We are Here to <span className="italic text-[#a4e38b]">Help You</span>
        </h1>
        <p className="text-emerald-200/70 text-sm font-light">
          Have questions about which herbal hair oil or radiance cream fits your scalp and skin profile? Connect with our botanical experts.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* Left Column: Direct Pakistani Helpline Info */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="p-8 rounded-[36px] bg-gradient-to-b from-[#0e3120] to-[#071c12] border border-emerald-500/25 space-y-6 shadow-2xl">
            <h3 className="font-serif-luxury text-2xl font-bold text-white">
              Instant Pakistani Support
            </h3>

            {/* WhatsApp Quick Connect */}
            <a
              href="https://wa.me/923001234567?text=Hi%20Dali%20Organics,%20I%20need%20a%20consultation%20regarding%20my%20hair%20and%20skin."
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl bg-[#144229] border border-emerald-400/30 flex items-center gap-4 hover:bg-[#1a5535] transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#25d366] text-black flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <strong className="text-white text-sm block">Official WhatsApp Helpline</strong>
                <span className="text-emerald-300 text-xs font-mono font-semibold">+92 300 1234567</span>
                <span className="text-[10px] text-emerald-400/70 block mt-0.5">Instant replies 10 AM - 10 PM PKT</span>
              </div>
            </a>

            {/* Phone & Email */}
            <div className="space-y-4 text-xs text-emerald-200/80">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#78c459] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Email Inquiries</strong>
                  <span>support@daliorganics.pk</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#78c459] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Apothecary Studio & Distribution</strong>
                  <span>Gulberg III, Lahore & Clifton Block 4, Karachi, Pakistan</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#78c459] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Courier Dispatch Hours</strong>
                  <span>Monday - Saturday: 9:00 AM - 7:00 PM</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Right Column: Inquiry & Consultation Form */}
        <div className="lg:col-span-7">
          <div className="p-8 sm:p-10 rounded-[36px] bg-gradient-to-b from-[#0f3422] to-[#082015] border border-emerald-500/25 shadow-2xl">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#1b5030] text-[#78c459] flex items-center justify-center mx-auto text-2xl">
                  ✓
                </div>
                <h3 className="font-serif-luxury text-2xl font-bold text-white">Shukriya! Message Received</h3>
                <p className="text-emerald-200/80 text-sm max-w-sm mx-auto">
                  Our herbalist specialist will contact you via WhatsApp/Phone within 2 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-full bg-[#6aa84f] text-white text-xs font-semibold"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-serif-luxury text-2xl font-bold text-white mb-2">
                  Request a Free Hair & Skin Consultation
                </h3>

                <div>
                  <label className="block text-xs font-medium text-emerald-200 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sara Ahmed"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-emerald-950/70 border border-emerald-500/30 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-stone-400 focus:outline-none focus:border-[#78c459]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-emerald-200 mb-1">WhatsApp / Phone *</label>
                    <input
                      type="tel"
                      required
                      placeholder="0300-XXXXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-emerald-950/70 border border-emerald-500/30 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-stone-400 focus:outline-none focus:border-[#78c459]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-emerald-200 mb-1">Primary Concern</label>
                    <select
                      value={formData.concern}
                      onChange={(e) => setFormData({ ...formData, concern: e.target.value })}
                      className="w-full bg-[#0b2717] border border-emerald-500/30 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#78c459]"
                    >
                      <option>Severe Hair Fall & Thinning</option>
                      <option>Chronic Dandruff & Flakes</option>
                      <option>Dull Skin & Hyperpigmentation</option>
                      <option>Dry Skin Barrier Repair</option>
                      <option>Wholesale & Distribution</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-emerald-200 mb-1">Detailed Message</label>
                  <textarea
                    rows={3}
                    placeholder="Describe your current hair/skin issues, age, or past products tried..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-emerald-950/70 border border-emerald-500/30 rounded-xl px-4 py-2 text-sm text-white placeholder:text-stone-400 focus:outline-none focus:border-[#78c459]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-[#6aa84f] hover:bg-[#7bc05d] text-white text-sm font-semibold tracking-wide shadow-lg shadow-emerald-950/80 transition-all"
                >
                  Submit Consultation Request
                </button>
              </form>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
