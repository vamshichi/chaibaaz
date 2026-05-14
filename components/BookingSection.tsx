"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

// ───────────────── TYPES ─────────────────
type EventType   = "Wedding" | "Corporate Event" | "Private Party" | "Concerts" | "";
type GuestRange  = "<50" | "50–100" | "100–300" | "300+" | "";
type ServiceType = "Full Chai Experience" | "Chai Cart Only" | "Custom Setup" | "";

interface FormData {
  eventType:   EventType;
  guestRange:  GuestRange;
  serviceType: ServiceType;
  name:        string;
  email:       string;
  phone:       string;
}

// ───────────────── CONFIG ─────────────────
const EVENT_TYPES = [
  { value: "Wedding",        icon: "✦", sub: "Luxury wedding celebrations" },
  { value: "Corporate Event",icon: "◆", sub: "Executive & brand experiences" },
  { value: "Private Party",  icon: "◈", sub: "Exclusive gatherings & soirées" },
  { value: "Concerts",       icon: "⬢", sub: "Premium live music & entertainment events" },
];

const GUEST_RANGES = [
  { value: "<50",    label: "Under 50" },
  { value: "50–100", label: "50 – 100" },
  { value: "100–300",label: "100 – 300" },
  { value: "300+",   label: "300 +" },
];

const SERVICE_TYPES = [
  { value: "Full Chai Experience", icon: "✦", sub: "Luxury live chai experience" },
  { value: "Chai Cart Only",       icon: "◉", sub: "Elegant self-service cart" },
  { value: "Custom Setup",         icon: "◈", sub: "Tailored luxury setup" },
];

// ───────────────── ANIMATION ─────────────────
const EASE = [0.16, 1, 0.3, 1] as const;

const variants = {
  enter:  { opacity: 0, y: 24, filter: "blur(8px)" },
  center: { opacity: 1, y: 0,  filter: "blur(0px)", transition: { duration: 0.65, ease: EASE } },
  exit:   { opacity: 0, y: -16,filter: "blur(8px)", transition: { duration: 0.35 } },
};

// ───────────────── OPTION CARD ─────────────────
function OptionCard({
  label, sublabel, icon, selected, onClick,
}: {
  label: string; sublabel: string; icon: string;
  selected: boolean; onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      // FIX: reduced padding on mobile (p-4 sm:p-6)
      className={`
        relative overflow-hidden rounded-2xl
        p-4 sm:p-5
        text-left transition-all duration-500 border w-full
        ${selected
          ? "border-[#C9A46A]/50 bg-white/70"
          : "border-white/40 bg-white/40 hover:bg-white/60"}
      `}
      style={{ backdropFilter: "blur(20px)" }}
    >
      {selected && (
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at top right, rgba(201,164,106,0.14), transparent 60%)",
          }}
        />
      )}

      <div className="relative z-10 flex items-start justify-between gap-2">
        <div className="flex gap-3">
          <div className={`text-xl shrink-0 ${selected ? "text-[#B88B4A]" : "text-[#7A6A5A]"}`}>
            {icon}
          </div>
          <div>
            <h3
              // FIX: slightly smaller heading on mobile
              className={`text-lg sm:text-xl ${selected ? "text-[#2A160D]" : "text-[#4F4034]"}`}
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {label}
            </h3>
            {/* FIX: sublabel hidden on very small screens to save space */}
            <p className="text-[#6B5B4D] text-xs sm:text-sm mt-0.5 hidden xs:block sm:block">
              {sublabel}
            </p>
          </div>
        </div>

        <div
          className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border shrink-0 flex items-center justify-center mt-0.5
            ${selected ? "border-[#C9A46A]" : "border-[#D7C8B6]"}`}
        >
          {selected && <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#C9A46A]" />}
        </div>
      </div>
    </motion.button>
  );
}

// ───────────────── INPUT ─────────────────
function LuxuryInput({
  label, value, onChange, type = "text",
}: {
  label: string; value: string; type?: string; onChange: (v: string) => void;
}) {
  return (
    <div className="relative">
      <label className="block text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-black mb-2 sm:mb-3">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full rounded-xl sm:rounded-2xl
          bg-white/50 border border-white/40
          px-4 py-3 sm:px-5 sm:py-4
          text-[#2A160D] placeholder:text-[#8A7A6A]
          focus:outline-none focus:border-[#C9A46A]
          transition-all text-sm sm:text-base
        "
        style={{ backdropFilter: "blur(20px)" }}
      />
    </div>
  );
}

// ───────────────── MAIN COMPONENT ─────────────────
export default function BookingSection() {
  const prefersReduced = useReducedMotion();

  const [step, setStep]           = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [apiError, setApiError]   = useState("");

  const [form, setForm] = useState<FormData>({
    eventType: "", guestRange: "", serviceType: "",
    name: "", email: "", phone: "",
  });

  const set = <K extends keyof FormData>(key: K, val: FormData[K]) =>
    setForm((p) => ({ ...p, [key]: val }));

  const canProceed = () => {
    if (step === 1) return !!form.eventType;
    if (step === 2) return !!form.guestRange;
    if (step === 3) return !!form.serviceType;
    if (step === 4) return !!form.name && !!form.email;
    return false;
  };

  // ── Submit: calls the API route which sends both emails ──
  const handleSubmit = async () => {
    setLoading(true);
    setApiError("");
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setSubmitted(true);
    } catch (err: any) {
      setApiError(err.message || "Failed to send. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const next = () => {
    if (!canProceed()) return;
    if (step === 4) { handleSubmit(); return; }
    setStep((s) => s + 1);
  };

  const back = () => setStep((s) => s - 1);

  return (
    <section
      id="booking"
      className="relative overflow-hidden py-20 sm:py-28 lg:py-36 px-4 sm:px-6"
      style={{
        backgroundImage: `
          linear-gradient(rgba(15,10,5,0.72), rgba(15,10,5,0.72)),
          url('/images/bookingimage.png')
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/10 pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.025] mix-blend-multiply bg-[url('/noise.png')] pointer-events-none" />

      {/* CONTENT */}
      <div className="relative z-10 max-w-2xl mx-auto">

        {/* ── HEADER ── */}
        {/* FIX: tighter bottom margin on mobile */}
        <div className="text-center mb-10 sm:mb-14 lg:mb-16">
          <p
            className="text-[10px] uppercase text-[#B88B4A] mb-5 sm:mb-6"
            // FIX: tracking reduced on mobile to prevent overflow
            style={{ letterSpacing: "clamp(0.2em, 0.5em, 0.5em)" }}
          >
            Reserve Your Experience
          </p>

          <h2
            className="text-white/90 font-light leading-tight mb-6 sm:mb-8"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              // FIX: lower floor — 2.4rem fits on 320px; 6vw stays fluid
              fontSize: "clamp(2.4rem, 6vw, 6rem)",
            }}
          >
            Begin your
            <br />
            <span className="italic text-[#B88B4A]">luxury chai journey</span>
          </h2>

          <div className="flex justify-center items-center gap-3 sm:gap-4">
            <div className="w-12 sm:w-16 h-px bg-[#C9A46A]" />
            <div className="w-2 h-2 rounded-full bg-[#C9A46A]" />
            <div className="w-12 sm:w-16 h-px bg-[#C9A46A]" />
          </div>
        </div>

        {/* ── FORM CARD ──
            FIX: padding p-5 on mobile, p-8 sm, p-12 md */}
        <div
          className="
            relative rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden
            border border-white/40 bg-white/45 backdrop-blur-2xl
            p-5 sm:p-8 md:p-12
          "
          style={{ boxShadow: "0 30px 80px rgba(42,22,13,0.10)" }}
        >
          {/* STEP BAR */}
          {!submitted && (
            <div className="flex items-center gap-2 sm:gap-3 mb-8 sm:mb-10">
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className={`h-[3px] flex-1 rounded-full transition-all duration-500
                    ${s <= step ? "bg-[#C9A46A]" : "bg-[#DDD0C0]"}`}
                />
              ))}
            </div>
          )}

          {/* STEP CONTENT */}
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div
                key={step}
                variants={prefersReduced ? undefined : variants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                {/* STEP 1 */}
                {step === 1 && (
                  <div>
                    <h3
                      // FIX: smaller heading on mobile
                      className="text-3xl sm:text-4xl text-[#2A160D] mb-6 sm:mb-8"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      What's the occasion?
                    </h3>
                    <div className="space-y-3 sm:space-y-4">
                      {EVENT_TYPES.map((item) => (
                        <OptionCard
                          key={item.value}
                          label={item.value}
                          sublabel={item.sub}
                          icon={item.icon}
                          selected={form.eventType === item.value}
                          onClick={() => set("eventType", item.value as EventType)}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 2 */}
                {step === 2 && (
                  <div>
                    <h3
                      className="text-3xl sm:text-4xl text-[#2A160D] mb-6 sm:mb-8"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      Guest count
                    </h3>
                    {/* FIX: already grid-cols-2, fine on mobile */}
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      {GUEST_RANGES.map((item) => (
                        <OptionCard
                          key={item.value}
                          label={item.label}
                          sublabel="Guests"
                          icon="✦"
                          selected={form.guestRange === item.value}
                          onClick={() => set("guestRange", item.value as GuestRange)}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 3 */}
                {step === 3 && (
                  <div>
                    <h3
                      className="text-3xl sm:text-4xl text-[#2A160D] mb-6 sm:mb-8"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      Select your service
                    </h3>
                    <div className="space-y-3 sm:space-y-4">
                      {SERVICE_TYPES.map((item) => (
                        <OptionCard
                          key={item.value}
                          label={item.value}
                          sublabel={item.sub}
                          icon={item.icon}
                          selected={form.serviceType === item.value}
                          onClick={() => set("serviceType", item.value as ServiceType)}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 4 */}
                {step === 4 && (
                  <div>
                    <h3
                      className="text-3xl sm:text-4xl text-black mb-7 sm:mb-10"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      Your details
                    </h3>
                    <div className="space-y-4 sm:space-y-6">
                      <LuxuryInput label="Full Name"      value={form.name}  onChange={(v) => set("name", v)} />
                      <LuxuryInput label="Email Address"  value={form.email} onChange={(v) => set("email", v)} type="email" />
                      <LuxuryInput label="Phone Number"   value={form.phone} onChange={(v) => set("phone", v)} type="tel" />
                    </div>

                    {/* API error */}
                    {apiError && (
                      <p className="mt-4 text-red-500 text-sm text-center">{apiError}</p>
                    )}
                  </div>
                )}

                {/* NAV BUTTONS */}
                <div className={`flex mt-8 sm:mt-12 gap-3 ${step === 1 ? "justify-end" : "justify-between"}`}>
                  {step > 1 && (
                    <button
                      onClick={back}
                      disabled={loading}
                      className="
                        px-5 py-3 sm:px-6 rounded-full
                        border border-[#D8C8B5] text-[#6B5B4D]
                        uppercase tracking-[0.2em] text-xs
                        disabled:opacity-40 transition
                      "
                    >
                      Back
                    </button>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={next}
                    disabled={!canProceed() || loading}
                    className="
                      px-6 py-3 sm:px-8 sm:py-4
                      rounded-full text-[#2A160D]
                      uppercase tracking-[0.2em] sm:tracking-[0.25em] text-xs
                      disabled:opacity-40 transition flex items-center gap-2
                    "
                    style={{
                      background:
                        "linear-gradient(135deg, #B88B4A 0%, #E2C48D 45%, #C9A46A 65%, #9F6F2D 100%)",
                    }}
                  >
                    {loading && (
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                      </svg>
                    )}
                    {loading ? "Sending…" : step === 4 ? "Submit Inquiry" : "Continue"}
                  </motion.button>
                </div>

              </motion.div>
            ) : (
              /* SUCCESS STATE */
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-8 sm:py-10"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mx-auto mb-6 sm:mb-8 flex items-center justify-center bg-[#C9A46A]/10">
                  <span className="text-2xl sm:text-3xl text-[#B88B4A]">✦</span>
                </div>

                <h3
                  className="text-4xl sm:text-5xl text-[#2A160D] mb-4 sm:mb-6"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  Thank you
                </h3>

                <p className="text-[#6B5B4D] leading-relaxed max-w-sm mx-auto text-sm sm:text-base">
                  Our concierge team will reach out shortly to begin crafting
                  your luxury chai experience. A confirmation has been sent to{" "}
                  <span className="text-[#B88B4A]">{form.email}</span>.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}