import { Navigation } from "@/components/Navigation";
import { VideoSection1 } from "@/components/VideoSection1";
import { VideoSection2 } from "@/components/VideoSection2";
import { VideoSection3 } from "@/components/VideoSection3";
import { BookingForm } from "@/components/BookingForm";
import { LocationSection } from "@/components/LocationSection";

const treatments = [
  {
    name: "Dental Implants",
    description: "Permanent, natural-looking tooth replacements to restore full function and aesthetics."
  },
  {
    name: "Dental Braces & Aligners",
    description: "Modern orthodontic solutions for perfectly aligned teeth and a confident smile."
  },
  {
    name: "RCT",
    description: "Painless root canal treatments to save damaged teeth and relieve severe discomfort."
  },
  {
    name: "Fixed Denture",
    description: "Secure and comfortable fixed dentures for a complete, natural-feeling smile."
  },
  {
    name: "Extraction",
    description: "Safe and gentle tooth extractions performed with maximum comfort and care."
  },
  {
    name: "Scaling and Polishing",
    description: "Professional cleaning to remove plaque, prevent decay, and brighten your teeth."
  }
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] text-neutral-200 font-sans selection:bg-[#CBA135]/30">
      
      <Navigation />

      {/* 1. VideoSection1 — Reception / Interior */}
      <div id="home">
        <VideoSection1 />
      </div>

      {/* 2. Short introductory clinic statement */}
      <section id="about" className="py-24 md:py-32 px-6 flex flex-col items-center text-center bg-[#1a1a1a]">
        <div className="max-w-3xl flex flex-col items-center">
          <p className="text-[#CBA135] font-semibold tracking-[0.25em] text-xs md:text-sm mb-4 uppercase">
            Golden Dental Clinic
          </p>
          <h2 className="text-white font-light text-3xl md:text-5xl tracking-tight mb-6 leading-tight">
            Modern Dentistry.<br className="hidden md:block" /> Personal Care.
          </h2>
          <p className="text-neutral-300 text-lg md:text-xl font-light">
            Committed to providing thoughtful, comfortable and modern dental care for every smile.
          </p>
        </div>
      </section>

      {/* 3. Treatment/Services section */}
      <section id="services" className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-[#0A0A0A]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center md:text-left mb-16 md:mb-20">
             <p className="text-[#CBA135] font-semibold tracking-[0.25em] text-xs md:text-sm mb-3 uppercase">
              Our Expertise
            </p>
            <h2 className="text-white font-light text-3xl md:text-4xl lg:text-5xl tracking-tight leading-tight">
              Premium Treatments
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {treatments.map((t, idx) => (
              <div key={idx} className="group border-t border-white/10 pt-8 hover:border-[#CBA135]/50 transition-colors duration-500">
                <h3 className="text-white text-xl md:text-2xl font-light mb-4 group-hover:text-[#CBA135] transition-colors duration-300">
                  {t.name}
                </h3>
                <p className="text-neutral-400 font-light leading-relaxed">
                  {t.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. VideoSection2 — Dr. MK Sunhare introduction */}
      <div id="doctor">
        <VideoSection2 />
      </div>

      {/* 5. Short trust/clinic statement */}
      <section id="trust" className="py-24 md:py-32 px-6 flex flex-col items-center text-center bg-[#1a1a1a]">
        <div className="max-w-3xl flex flex-col items-center">
          <p className="text-[#CBA135] font-semibold tracking-[0.25em] text-xs md:text-sm mb-4 uppercase">
            Care Led by Dr. MK Sunhare
          </p>
          <h2 className="text-white font-light text-2xl md:text-4xl tracking-tight leading-relaxed">
            Personalised dental care with a focus on comfort, precision and confident smiles.
          </h2>
        </div>
      </section>

      {/* 7. VideoSection3 — Exterior */}
      <div id="exterior">
        <VideoSection3 />
      </div>

      {/* 8. Location & Contact Section */}
      <LocationSection />

      {/* 9. Appointment Booking Form */}
      <section className="py-24 md:py-32 px-6 bg-[#1a1a1a]">
        <BookingForm />
      </section>

      {/* 10. Footer */}
      <footer className="bg-[#1a1a1a] py-16 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          
          <div className="flex flex-col items-start max-w-sm">
            <h3 className="text-[#CBA135] font-semibold tracking-[0.2em] uppercase text-sm mb-2">
              Golden Dental Clinic
            </h3>
            <p className="text-neutral-400 font-light text-xs mb-6 uppercase tracking-[0.2em]">
              SMILE BRIGHT, LIVE CONFIDENT
            </p>
            <p className="text-neutral-500 text-sm font-light leading-relaxed">
              131, M.G. Road, Near Royal Progressive School, Nayapura, Badnagar, District Ujjain, Madhya Pradesh
            </p>
          </div>
          
          <div className="flex flex-col items-start md:items-end">
             <h4 className="text-white text-xs tracking-widest uppercase font-semibold mb-4">Contact</h4>
             <a href="tel:+919243365741" className="text-neutral-400 hover:text-[#CBA135] text-sm mb-2 transition-colors">92433-65741</a>
             <a href="tel:+919926065741" className="text-neutral-400 hover:text-[#CBA135] text-sm transition-colors">99260-65741</a>
          </div>
          
        </div>
        
        <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-600">
          <p>© {new Date().getFullYear()} Golden Dental Clinic. All rights reserved.</p>
          <p>Premium Dental Care in Badnagar</p>
        </div>
      </footer>

    </main>
  );
}
