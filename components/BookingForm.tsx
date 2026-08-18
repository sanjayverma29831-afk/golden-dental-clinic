"use client";

import React, { useState } from "react";

type FormData = {
  fullName: string;
  phone: string;
  treatment: string;
  date: string;
  time: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

export function BookingForm() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phone: "",
    treatment: "",
    date: "",
    time: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Today's date in YYYY-MM-DD for minimum date constraint
  const today = new Date().toISOString().split("T")[0];

  const validatePhone = (phone: string) => {
    // Allows optional +91 or 91 prefix, spaces/dashes, then exactly 10 digits
    const cleaned = phone.replace(/[\s-]/g, "");
    const regex = /^(\+91|91)?[6-9]\d{9}$/;
    return regex.test(cleaned);
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      newErrors.fullName = "Name must be at least 2 characters long.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit Indian mobile number.";
    }

    if (!formData.date) {
      newErrors.date = "Please select a preferred date.";
    } else if (formData.date < today) {
      newErrors.date = "Date cannot be in the past.";
    }

    if (formData.message.length > 300) {
      newErrors.message = "Message cannot exceed 300 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API request delay since no real backend is attached yet
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSuccess(true);
    setFormData({
      fullName: "",
      phone: "",
      treatment: "",
      date: "",
      time: "",
      message: "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error inline once user starts typing
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const whatsappMessage = encodeURIComponent("Hello Golden Dental Clinic, I would like to book an appointment.");
  const whatsappUrl = `https://wa.me/919243365741?text=${whatsappMessage}`;

  if (isSuccess) {
    return (
      <div id="booking" className="w-full max-w-[650px] mx-auto bg-[#1a1a1a] border border-[#CBA135]/20 p-8 md:p-12 rounded flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full bg-[#CBA135]/10 flex items-center justify-center mb-6">
          <svg className="w-8 h-8 text-[#CBA135]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-white text-2xl font-light mb-4">Request Received</h3>
        <p className="text-neutral-300 font-light leading-relaxed mb-8">
          Thank you. Your appointment request has been received. Our team will contact you shortly.
        </p>
        <button
          onClick={() => setIsSuccess(false)}
          className="bg-transparent text-neutral-400 hover:text-white font-medium text-sm transition-colors border-b border-transparent hover:border-white pb-1"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <div id="booking" className="w-full max-w-[700px] mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-[#CBA135] font-semibold tracking-[0.25em] text-xs md:text-sm mb-3 uppercase">
          Book Your Appointment
        </h2>
        <p className="text-neutral-300 font-light text-sm md:text-base max-w-md mx-auto">
          Tell us what you need and our clinic team will contact you to confirm your appointment.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
        {/* Full Name & Phone */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 flex flex-col gap-2">
            <label htmlFor="fullName" className="text-xs uppercase tracking-widest text-neutral-400 font-medium ml-1">
              Full Name *
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="John Doe"
              className={`w-full bg-[#0A0A0A] border ${errors.fullName ? "border-red-500/50 focus:border-red-500" : "border-white/10 focus:border-[#CBA135]"} text-white px-5 py-3.5 rounded-sm outline-none transition-colors font-light`}
              aria-invalid={!!errors.fullName}
            />
            {errors.fullName && <span className="text-red-400 text-xs ml-1">{errors.fullName}</span>}
          </div>

          <div className="flex-1 flex flex-col gap-2">
            <label htmlFor="phone" className="text-xs uppercase tracking-widest text-neutral-400 font-medium ml-1">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 9876543210"
              className={`w-full bg-[#0A0A0A] border ${errors.phone ? "border-red-500/50 focus:border-red-500" : "border-white/10 focus:border-[#CBA135]"} text-white px-5 py-3.5 rounded-sm outline-none transition-colors font-light`}
              aria-invalid={!!errors.phone}
            />
            {errors.phone && <span className="text-red-400 text-xs ml-1">{errors.phone}</span>}
          </div>
        </div>

        {/* Treatment Dropdown */}
        <div className="flex flex-col gap-2">
          <label htmlFor="treatment" className="text-xs uppercase tracking-widest text-neutral-400 font-medium ml-1">
            Preferred Treatment
          </label>
          <div className="relative">
            <select
              id="treatment"
              name="treatment"
              value={formData.treatment}
              onChange={handleChange}
              className="w-full bg-[#0A0A0A] border border-white/10 focus:border-[#CBA135] text-white px-5 py-3.5 rounded-sm outline-none transition-colors font-light appearance-none"
            >
              <option value="" className="text-neutral-500">Select a treatment (Optional)</option>
              <option value="General Consultation">General Consultation</option>
              <option value="Dental Implants">Dental Implants</option>
              <option value="Dental Braces & Aligners">Dental Braces & Aligners</option>
              <option value="RCT">RCT (Root Canal)</option>
              <option value="Fixed Denture">Fixed Denture</option>
              <option value="Extraction">Extraction</option>
              <option value="Scaling and Polishing">Scaling and Polishing</option>
            </select>
            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400">
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Date & Time */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 flex flex-col gap-2">
            <label htmlFor="date" className="text-xs uppercase tracking-widest text-neutral-400 font-medium ml-1">
              Preferred Date *
            </label>
            <input
              type="date"
              id="date"
              name="date"
              min={today}
              value={formData.date}
              onChange={handleChange}
              className={`w-full bg-[#0A0A0A] border ${errors.date ? "border-red-500/50 focus:border-red-500" : "border-white/10 focus:border-[#CBA135]"} text-white px-5 py-3.5 rounded-sm outline-none transition-colors font-light [color-scheme:dark]`}
              aria-invalid={!!errors.date}
            />
            {errors.date && <span className="text-red-400 text-xs ml-1">{errors.date}</span>}
          </div>

          <div className="flex-1 flex flex-col gap-2">
            <label htmlFor="time" className="text-xs uppercase tracking-widest text-neutral-400 font-medium ml-1">
              Preferred Time
            </label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full bg-[#0A0A0A] border border-white/10 focus:border-[#CBA135] text-white px-5 py-3.5 rounded-sm outline-none transition-colors font-light [color-scheme:dark]"
            />
          </div>
        </div>

        {/* Message */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center ml-1">
            <label htmlFor="message" className="text-xs uppercase tracking-widest text-neutral-400 font-medium">
              Message
            </label>
            <span className={`text-xs ${formData.message.length > 300 ? "text-red-400" : "text-neutral-500"}`}>
              {formData.message.length}/300
            </span>
          </div>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Any specific dental issues or requests?"
            rows={4}
            className={`w-full bg-[#0A0A0A] border ${errors.message ? "border-red-500/50 focus:border-red-500" : "border-white/10 focus:border-[#CBA135]"} text-white px-5 py-3.5 rounded-sm outline-none transition-colors font-light resize-none`}
            aria-invalid={!!errors.message}
          />
          {errors.message && <span className="text-red-400 text-xs ml-1">{errors.message}</span>}
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-4 mt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#CBA135] hover:bg-[#D4AF37] disabled:bg-[#CBA135]/50 disabled:cursor-not-allowed text-[#0A0A0A] font-semibold uppercase tracking-widest text-xs md:text-sm px-8 py-4 rounded-sm transition-colors duration-300 shadow-lg"
          >
            {isSubmitting ? "Submitting..." : "REQUEST APPOINTMENT"}
          </button>
          
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-transparent hover:bg-[#25D366]/5 border border-[#25D366]/30 text-[#25D366] font-medium uppercase tracking-widest text-xs md:text-sm px-8 py-4 rounded-sm transition-colors duration-300 text-center flex items-center justify-center gap-2"
          >
            BOOK VIA WHATSAPP
          </a>
        </div>
      </form>

      {/* Alternative Contact */}
      <div className="mt-12 pt-8 border-t border-white/5 text-center">
        <p className="text-xs uppercase tracking-widest text-neutral-500 font-medium mb-4">Call Us</p>
        <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-8">
          <a href="tel:+919243365741" className="text-xl md:text-2xl font-light text-white hover:text-[#CBA135] transition-colors">
            92433-65741
          </a>
          <a href="tel:+919926065741" className="text-xl md:text-2xl font-light text-white hover:text-[#CBA135] transition-colors">
            99260-65741
          </a>
        </div>
      </div>
    </div>
  );
}
