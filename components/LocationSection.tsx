import React from "react";

export function LocationSection() {
  const address = "131, M.G. Road, Near Royal Progressive School, Nayapura, Badnagar, District Ujjain, Madhya Pradesh";
  
  // URL-encode the address for the maps URL
  const encodedAddress = encodeURIComponent(address);
  
  // Directions URL
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
  
  // Embed URL for the iframe
  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodedAddress}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  // WhatsApp Message
  const whatsappMessage = encodeURIComponent("Hello Golden Dental Clinic, I would like to know more about dental treatment and book an appointment.");
  const whatsappUrl = `https://wa.me/919243365741?text=${whatsappMessage}`;

  return (
    <section id="contact" className="py-24 md:py-32 px-6 bg-[#0A0A0A] border-b border-white/5 relative overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20 justify-between items-center">
        
        {/* Contact Information (Left / Top) */}
        <div className="flex-1 w-full lg:w-5/12 flex flex-col z-10">
          <h2 className="text-[#CBA135] font-semibold tracking-[0.25em] text-xs md:text-sm mb-4 uppercase">
            Visit Golden Dental Clinic
          </h2>
          <h3 className="text-white font-light text-3xl md:text-4xl lg:text-5xl tracking-tight leading-tight mb-6">
            Conveniently located in Badnagar, Madhya Pradesh.
          </h3>
          <p className="text-neutral-300 font-light text-base md:text-lg mb-10 leading-relaxed max-w-md">
            Call us or get directions to plan your visit.
          </p>
          
          <div className="bg-[#1a1a1a] p-8 rounded-sm border border-white/5 shadow-2xl relative overflow-hidden group">
            {/* Subtle hover accent */}
            <div className="absolute top-0 left-0 w-1 h-full bg-[#CBA135]/50 group-hover:bg-[#CBA135] transition-colors duration-500" />
            
            <h4 className="text-white text-xl font-light tracking-wide mb-6 uppercase">
              Golden Dental Clinic
            </h4>
            
            {/* Address */}
            <div className="flex items-start gap-4 mb-8">
              <svg className="w-5 h-5 text-[#CBA135] mt-1 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="text-neutral-300 font-light leading-relaxed">
                131, M.G. Road,<br/>
                Near Royal Progressive School,<br/>
                Nayapura, Badnagar,<br/>
                District Ujjain, Madhya Pradesh
              </p>
            </div>

            {/* Phone Numbers */}
            <div className="flex items-start gap-4 mb-10">
              <svg className="w-5 h-5 text-[#CBA135] mt-1 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <div className="flex flex-col gap-1">
                <a href="tel:+919243365741" className="text-white font-light text-lg hover:text-[#CBA135] transition-colors w-fit">
                  92433-65741
                </a>
                <a href="tel:+919926065741" className="text-white font-light text-lg hover:text-[#CBA135] transition-colors w-fit">
                  99260-65741
                </a>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-4">
              <a 
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#CBA135] hover:bg-[#D4AF37] text-[#0A0A0A] font-medium uppercase tracking-widest text-xs md:text-sm px-6 py-4 rounded-sm transition-colors duration-300 shadow-lg text-center"
              >
                GET DIRECTIONS
              </a>
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-transparent hover:bg-[#25D366]/5 border border-[#25D366]/30 text-[#25D366] font-medium uppercase tracking-widest text-xs md:text-sm px-6 py-4 rounded-sm transition-colors duration-300 text-center"
              >
                CHAT ON WHATSAPP
              </a>
            </div>
          </div>
        </div>

        {/* Map Area (Right / Bottom) */}
        <div className="flex-1 w-full lg:w-7/12 h-[500px] lg:h-[650px] z-10 relative">
          <div className="w-full h-full rounded-sm overflow-hidden shadow-2xl relative group bg-[#1a1a1a] border border-white/5">
             <iframe 
               src={mapEmbedUrl}
               width="100%" 
               height="100%" 
               style={{ border: 0 }} 
               allowFullScreen={true} 
               loading="lazy" 
               referrerPolicy="no-referrer-when-downgrade"
               title="Google Maps location of Golden Dental Clinic"
               className="grayscale-[20%] contrast-125 opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
             ></iframe>
             <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_20px_rgba(10,10,10,0.5)]"></div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default LocationSection;
