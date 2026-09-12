import Image from "next/image";
import { Navigation } from "@/components/Navigation";
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
    <main className="relative min-h-screen w-full overflow-x-hidden bg-[#0A0A0A] text-neutral-200 font-sans selection:bg-[#CBA135]/30">
      
      <Navigation />

      {/* 1. HERO SECTION */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 pb-12 px-6 bg-[#0A0A0A] overflow-hidden">
        {/* Background Image - static */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/frames/video_1/frame_0001.webp" 
            alt="Golden Dental Clinic Reception" 
            fill 
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A]"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
          <p className="text-[#CBA135] font-semibold tracking-[0.2em] text-xs sm:text-sm md:text-base mb-4 sm:mb-6 uppercase drop-shadow-md">
            GOLDEN DENTAL CLINIC
          </p>
          
          <h1 className="text-white font-light text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-tight mb-6 sm:mb-8 drop-shadow-lg">
            Your Smile Deserves Expert Care
          </h1>
          
          <p className="text-neutral-300 text-base sm:text-lg md:text-xl font-light max-w-2xl leading-relaxed mb-10 sm:mb-12 drop-shadow-md">
            Compassionate, modern dental care focused on healthy and confident smiles.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full sm:w-auto">
            <a href="#booking" className="w-full sm:w-auto bg-[#CBA135] hover:bg-[#D4AF37] text-[#0A0A0A] font-semibold uppercase tracking-widest text-xs sm:text-sm px-8 py-4 rounded-sm transition-colors duration-300 shadow-lg text-center">
              BOOK AN APPOINTMENT
            </a>
            <a href="tel:+919243365741" className="w-full sm:w-auto bg-[#1a1a1a]/80 backdrop-blur-sm border border-white/20 hover:border-[#CBA135] hover:text-[#CBA135] text-white font-medium uppercase tracking-widest text-xs sm:text-sm px-8 py-4 rounded-sm transition-all duration-300 text-center flex items-center justify-center gap-2">
              CALL NOW
            </a>
          </div>
        </div>
      </section>

      {/* 2. DOCTOR / ABOUT SECTION */}
      <section id="doctor" className="py-24 md:py-32 px-6 bg-[#1a1a1a]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          <div className="w-full md:w-1/2 relative h-[400px] sm:h-[500px] lg:h-[600px] rounded-sm overflow-hidden border border-white/5 shadow-2xl">
            <Image 
              src="/frames/video_2/frame_0001.webp" 
              alt="Dr. MK Sunhare" 
              fill 
              className="object-cover object-[center_20%]"
            />
          </div>
          <div className="w-full md:w-1/2 flex flex-col items-start text-left">
            <p className="text-[#CBA135] font-semibold tracking-[0.2em] text-xs md:text-sm mb-4 uppercase">
              ABOUT OUR DOCTOR
            </p>
            <h2 className="text-white font-light text-3xl md:text-4xl lg:text-5xl tracking-tight mb-6 leading-tight">
              Meet Dr. MK Sunhare
            </h2>
            <p className="text-neutral-300 text-base md:text-lg font-light leading-relaxed">
              Providing personalised dental care with a focus on comfort, precision and confident smiles.
            </p>
          </div>
        </div>
      </section>

      {/* 3. TREATMENTS / SERVICES */}
      <section id="services" className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-[#0A0A0A]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center md:text-left mb-16 md:mb-20">
             <p className="text-[#CBA135] font-semibold tracking-[0.2em] text-xs md:text-sm mb-3 uppercase">
              Our Expertise
            </p>
            <h2 className="text-white font-light text-3xl md:text-4xl lg:text-5xl tracking-tight leading-tight">
              Our Dental Treatments
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

      {/* 4. WHY CHOOSE GOLDEN DENTAL CLINIC */}
      <section id="about" className="py-24 md:py-32 px-6 bg-[#1a1a1a]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 md:mb-20">
            <p className="text-[#CBA135] font-semibold tracking-[0.2em] text-xs md:text-sm mb-3 uppercase">
              Why Choose Golden Dental Clinic
            </p>
            <h2 className="text-white font-light text-3xl md:text-4xl lg:text-5xl tracking-tight leading-tight">
              A Patient-First Approach
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Personalised Care", desc: "Every smile is unique, and so is our tailored treatment plan for you." },
              { title: "Comfort-Focused Experience", desc: "A relaxing clinic environment designed to eliminate dental anxiety." },
              { title: "Modern Dental Care", desc: "Utilising current techniques and equipment for safe, precise treatments." },
              { title: "Convenient Location", desc: "Easily accessible in Badnagar with a welcoming clinic setting." }
            ].map((feature, idx) => (
              <div key={idx} className="bg-[#0A0A0A] p-8 border border-white/5 rounded-sm hover:border-[#CBA135]/30 transition-colors duration-300">
                <h3 className="text-white text-lg font-medium mb-3">{feature.title}</h3>
                <p className="text-neutral-400 font-light text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. APPOINTMENT BOOKING */}
      <section className="py-24 md:py-32 px-6 bg-[#0A0A0A]">
        <BookingForm />
      </section>

      {/* 6. LOCATION / CONTACT */}
      <LocationSection />

      {/* 7. FOOTER */}
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
