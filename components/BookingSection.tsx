"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

// ─────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────
type EventType   = "Wedding" | "Corporate Event" | "Private Party" | "";
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

interface FieldError {
  name?:  string;
  email?: string;
  phone?: string;
}

// ─────────────────────────────────────────────────────────────────
// Step config
// ─────────────────────────────────────────────────────────────────
const TOTAL_STEPS = 4;

const EVENT_TYPES: { value: EventType; icon: string; sub: string }[] = [
  { value: "Wedding",         icon: "◈", sub: "Intimate or grand celebrations" },
  { value: "Corporate Event", icon: "◆", sub: "Brand experiences & conferences" },
  { value: "Private Party",   icon: "◇", sub: "Gatherings & social occasions"  },
];

const GUEST_RANGES: { value: GuestRange; label: string }[] = [
  { value: "<50",    label: "Under 50" },
  { value: "50–100", label: "50 – 100" },
  { value: "100–300",label: "100 – 300"},
  { value: "300+",   label: "300 +"    },
];

const SERVICE_TYPES: { value: ServiceType; icon: string; sub: string }[] = [
  { value: "Full Chai Experience", icon: "✦", sub: "Live brewing, cart & complete service" },
  { value: "Chai Cart Only",       icon: "◉", sub: "Elegant self-serve station"            },
  { value: "Custom Setup",         icon: "◈", sub: "Tailored to your vision"               },
];

// ─────────────────────────────────────────────────────────────────
// Easing
// ─────────────────────────────────────────────────────────────────
const EASE_LUXURY  = [0.25, 0.1,  0.25, 1]   as const;
const EASE_OUT_EXP = [0.16, 1,    0.3,  1]   as const;

// ─────────────────────────────────────────────────────────────────
// Direction-aware slide variants
// ─────────────────────────────────────────────────────────────────
const makeVariants = (dir: 1 | -1) => ({
  enter: {
    x:       dir * 48,
    opacity: 0,
    filter:  "blur(6px)",
  },
  center: {
    x:       0,
    opacity: 1,
    filter:  "blur(0px)",
    transition: { duration: 0.6, ease: EASE_OUT_EXP },
  },
  exit: {
    x:       dir * -48,
    opacity: 0,
    filter:  "blur(4px)",
    transition: { duration: 0.4, ease: EASE_LUXURY },
  },
});

// ─────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────

/** Large option card — for event type & service type */
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
      className="relative w-full text-left group focus:outline-none"
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.985 }}
      transition={{ duration: 0.25, ease: EASE_LUXURY }}
    >
      {/* Card */}
      <div
        className={`
          relative overflow-hidden rounded-xl px-6 py-5
          border transition-all duration-500
          ${selected
            ? "border-amber-500/55 bg-gradient-to-br from-amber-950/60 via-stone-900/70 to-stone-950/80"
            : "border-stone-700/40 bg-stone-900/40 hover:border-stone-600/60 hover:bg-stone-900/60"
          }
        `}
      >
        {/* Selected shimmer bg */}
        {selected && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              background:
                "radial-gradient(ellipse at 20% 50%, rgba(212,175,55,0.07) 0%, transparent 65%)",
            }}
          />
        )}

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            {/* Icon glyph */}
            <span
              className={`
                mt-0.5 text-xl leading-none flex-shrink-0
                transition-colors duration-400
                ${selected ? "text-amber-400" : "text-stone-600 group-hover:text-stone-400"}
              `}
            >
              {icon}
            </span>

            <div>
              <p
                className={`
                  text-base font-light tracking-wide
                  transition-colors duration-300
                  ${selected ? "text-amber-100" : "text-stone-300 group-hover:text-stone-200"}
                `}
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.05rem", letterSpacing: "0.04em" }}
              >
                {label}
              </p>
              <p
                className={`
                  mt-0.5 text-xs tracking-wider
                  transition-colors duration-300
                  ${selected ? "text-amber-300/50" : "text-stone-600 group-hover:text-stone-500"}
                `}
                style={{ letterSpacing: "0.06em" }}
              >
                {sublabel}
              </p>
            </div>
          </div>

          {/* Checkmark */}
          <motion.div
            animate={selected ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE_OUT_EXP }}
            className="flex-shrink-0 w-5 h-5 rounded-full border border-amber-500/60 flex items-center justify-center"
            style={{ background: selected ? "rgba(212,175,55,0.15)" : "transparent" }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          </motion.div>
        </div>

        {/* Bottom gold line on selected */}
        <motion.div
          className="absolute bottom-0 left-0 h-px"
          animate={{ scaleX: selected ? 1 : 0, opacity: selected ? 1 : 0 }}
          transition={{ duration: 0.5, ease: EASE_OUT_EXP }}
          style={{
            width: "100%",
            background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.6), transparent)",
            transformOrigin: "left",
          }}
        />
      </div>
    </motion.button>
  );
}

/** Compact pill — for guest range */
function GuestPill({
  label, selected, onClick,
}: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={`
        relative w-full py-4 px-4 rounded-xl border text-center
        transition-all duration-400 focus:outline-none
        ${selected
          ? "border-amber-500/55 bg-gradient-to-b from-amber-950/50 to-stone-900/70 text-amber-100"
          : "border-stone-700/40 bg-stone-900/35 text-stone-400 hover:border-stone-600/55 hover:text-stone-300 hover:bg-stone-900/55"
        }
      `}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.22, ease: EASE_LUXURY }}
    >
      <span
        className="block text-2xl font-light"
        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", letterSpacing: "0.04em" }}
      >
        {label}
      </span>
      <span className="block mt-1 text-[0.6rem] tracking-[0.3em] uppercase text-current opacity-50">
        guests
      </span>

      {selected && (
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            background: "radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.08) 0%, transparent 70%)",
          }}
        />
      )}

      {/* bottom line */}
      <motion.div
        className="absolute bottom-0 left-4 right-4 h-px"
        animate={{ scaleX: selected ? 1 : 0, opacity: selected ? 1 : 0 }}
        transition={{ duration: 0.45, ease: EASE_OUT_EXP }}
        style={{
          background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.55), transparent)",
          transformOrigin: "center",
        }}
      />
    </motion.button>
  );
}

/** Premium underline input */
function LuxuryInput({
  label, value, onChange, type = "text", placeholder, error,
}: {
  label: string; value: string; placeholder: string;
  onChange: (v: string) => void; type?: string; error?: string;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative group">
      {/* Float label */}
      <motion.label
        animate={{
          y:        focused || value ? -22 : 0,
          scale:    focused || value ? 0.80 : 1,
          color:    focused
            ? "rgba(212,175,55,0.75)"
            : value
            ? "rgba(180,160,120,0.55)"
            : "rgba(120,110,95,0.6)",
        }}
        transition={{ duration: 0.28, ease: EASE_LUXURY }}
        className="absolute left-0 top-3.5 text-sm tracking-wider pointer-events-none origin-left"
        style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: "0.1em" }}
      >
        {label}
      </motion.label>

      {/* Input */}
      <input
        type={type}
        value={value}
        autoComplete="off"
        placeholder={focused ? placeholder : ""}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="
          w-full bg-transparent pt-6 pb-2 text-stone-200
          text-sm tracking-wide focus:outline-none
          placeholder:text-stone-700 placeholder:text-xs
        "
        style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.04em" }}
      />

      {/* Underline */}
      <div className="relative h-px">
        <div className="absolute inset-0 bg-stone-700/50" />
        <motion.div
          className="absolute inset-0"
          animate={{ scaleX: focused ? 1 : 0 }}
          transition={{ duration: 0.4, ease: EASE_OUT_EXP }}
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.7) 40%, rgba(212,175,55,0.7) 60%, transparent 100%)",
            transformOrigin: "center",
          }}
        />
      </div>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25 }}
            className="mt-1.5 text-[0.65rem] tracking-wider text-rose-400/70"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Progress indicator
// ─────────────────────────────────────────────────────────────────
function ProgressBar({ step }: { step: number }) {
  const pct = ((step) / TOTAL_STEPS) * 100;

  return (
    <div className="mb-10">
      {/* Step dots */}
      <div className="flex items-center justify-between mb-3">
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => {
          const done    = i + 1 < step;
          const current = i + 1 === step;
          return (
            <div key={i} className="flex items-center gap-0 flex-1 last:flex-none">
              {/* Dot */}
              <div className="relative flex items-center justify-center">
                <motion.div
                  animate={{
                    width:  current ? 28 : done ? 20 : 16,
                    height: current ? 28 : done ? 20 : 16,
                    borderColor: current
                      ? "rgba(212,175,55,0.8)"
                      : done
                      ? "rgba(212,175,55,0.5)"
                      : "rgba(80,70,60,0.5)",
                    backgroundColor: done
                      ? "rgba(212,175,55,0.15)"
                      : "transparent",
                  }}
                  transition={{ duration: 0.4, ease: EASE_OUT_EXP }}
                  className="rounded-full border flex items-center justify-center"
                >
                  {done ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-1.5 h-1.5 rounded-full bg-amber-400"
                    />
                  ) : current ? (
                    <motion.div
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-2 h-2 rounded-full bg-amber-400/80"
                    />
                  ) : (
                    <div className="w-1 h-1 rounded-full bg-stone-700" />
                  )}
                </motion.div>
              </div>

              {/* Connector line */}
              {i < TOTAL_STEPS - 1 && (
                <div className="flex-1 mx-2 h-px relative overflow-hidden">
                  <div className="absolute inset-0 bg-stone-800" />
                  <motion.div
                    className="absolute inset-y-0 left-0"
                    animate={{ width: done ? "100%" : current ? "50%" : "0%" }}
                    transition={{ duration: 0.6, ease: EASE_OUT_EXP }}
                    style={{
                      background: "linear-gradient(90deg, rgba(212,175,55,0.6), rgba(212,175,55,0.25))",
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Label row */}
      <div className="flex justify-between px-0.5">
        {["Event", "Guests", "Service", "Details"].map((lbl, i) => (
          <span
            key={lbl}
            className="text-[0.58rem] tracking-[0.22em] uppercase transition-colors duration-300"
            style={{
              color: i + 1 === step
                ? "rgba(212,175,55,0.65)"
                : i + 1 < step
                ? "rgba(160,140,100,0.45)"
                : "rgba(80,70,60,0.5)",
            }}
          >
            {lbl}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Step heading
// ─────────────────────────────────────────────────────────────────
function StepHeading({ step, sub }: { step: string; sub: string }) {
  return (
    <div className="mb-8 text-center">
      <p
        className="text-[0.58rem] tracking-[0.5em] uppercase text-amber-400/40 mb-3"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        Tell us about your occasion
      </p>
      <h3
        className="text-3xl font-light text-stone-100 leading-snug"
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          letterSpacing: "0.04em",
          fontWeight: 300,
        }}
      >
        {step}
      </h3>
      <p
        className="mt-2 text-sm text-stone-500 font-light"
        style={{ letterSpacing: "0.06em" }}
      >
        {sub}
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Nav buttons
// ─────────────────────────────────────────────────────────────────
function NavButtons({
  step, canNext, onBack, onNext, isFinal,
}: {
  step: number; canNext: boolean;
  onBack: () => void; onNext: () => void; isFinal: boolean;
}) {
  return (
    <div className={`flex gap-3 mt-8 ${step === 1 ? "justify-end" : "justify-between"}`}>
      {step > 1 && (
        <motion.button
          type="button"
          onClick={onBack}
          className="
            px-6 py-2.5 rounded-full
            text-[0.68rem] tracking-[0.22em] uppercase font-light
            text-stone-500 border border-stone-700/50
            hover:border-stone-600/70 hover:text-stone-400
            transition-all duration-300 focus:outline-none
          "
          whileHover={{ x: -2 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.2 }}
        >
          ← Back
        </motion.button>
      )}

      <motion.button
        type="button"
        onClick={onNext}
        disabled={!canNext}
        className={`
          relative overflow-hidden px-8 py-2.5 rounded-full
          text-[0.68rem] tracking-[0.24em] uppercase font-semibold
          transition-all duration-400 focus:outline-none
          ${canNext
            ? "text-stone-900 cursor-pointer"
            : "text-stone-600 cursor-not-allowed opacity-40"
          }
        `}
        style={canNext ? {
          background: "linear-gradient(135deg, #C9922A 0%, #F0CC6E 45%, #D4AF37 65%, #A87828 100%)",
        } : {
          background: "rgba(80,70,60,0.3)",
          border: "1px solid rgba(80,70,60,0.4)",
        }}
        whileHover={canNext ? { scale: 1.04, boxShadow: "0 0 24px rgba(212,175,55,0.38)" } : {}}
        whileTap={canNext ? { scale: 0.97 } : {}}
        transition={{ duration: 0.28, ease: EASE_LUXURY }}
      >
        {/* Shimmer */}
        {canNext && (
          <motion.span
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.32) 50%, transparent 65%)",
              backgroundSize: "220% 100%",
              backgroundPosition: "200% 0",
            }}
            whileHover={{
              backgroundPosition: [null, "-100% 0"],
              transition: { duration: 0.65, ease: "linear" },
            }}
          />
        )}
        <span className="relative">
          {isFinal ? "Submit Inquiry" : "Continue →"}
        </span>
      </motion.button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Success screen
// ─────────────────────────────────────────────────────────────────
function SuccessScreen({ data }: { data: FormData }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE_OUT_EXP }}
      className="text-center py-6"
    >
      {/* Ornament */}
      <motion.div
        initial={{ opacity: 0, rotate: -15, scale: 0.5 }}
        animate={{ opacity: 1, rotate: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: EASE_OUT_EXP, delay: 0.15 }}
        className="mx-auto mb-8 w-16 h-16 rounded-full border border-amber-500/40 flex items-center justify-center"
        style={{ background: "radial-gradient(circle, rgba(212,175,55,0.1), transparent 70%)" }}
      >
        <span className="text-2xl text-amber-400">✦</span>
      </motion.div>

      <motion.h3
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-3xl font-light text-stone-100 mb-3"
        style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: "0.04em" }}
      >
        We'll be in touch shortly
      </motion.h3>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45, duration: 0.6 }}
        className="text-amber-400/50 text-lg mb-2"
      >
        ✨
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="text-stone-500 text-sm leading-relaxed max-w-xs mx-auto"
        style={{ fontStyle: "italic", letterSpacing: "0.04em" }}
      >
        Thank you, {data.name.split(" ")[0]}. Our concierge team will reach out
        within 24 hours to begin crafting your chai experience.
      </motion.p>

      {/* Summary chips */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65, duration: 0.6 }}
        className="flex flex-wrap justify-center gap-2 mt-8"
      >
        {[data.eventType, data.guestRange + " guests", data.serviceType].filter(Boolean).map((item) => (
          <span
            key={item}
            className="px-3 py-1 rounded-full text-[0.62rem] tracking-wider uppercase text-amber-300/60 border border-amber-800/30"
            style={{ background: "rgba(212,175,55,0.05)" }}
          >
            {item}
          </span>
        ))}
      </motion.div>

      {/* Hairline */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.8, duration: 0.8, ease: EASE_OUT_EXP }}
        className="mt-10 mx-auto h-px w-24"
        style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent)" }}
      />

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="mt-4 text-[0.6rem] tracking-[0.4em] uppercase text-stone-700"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        Chaibaaz · Inc
      </motion.p>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────────
export default function BookingSection() {
  const [step,      setStep]      = useState(1);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [submitted, setSubmitted] = useState(false);
  const [errors,    setErrors]    = useState<FieldError>({});
  const prefersReduced = useReducedMotion();

  const [form, setForm] = useState<FormData>({
    eventType:   "",
    guestRange:  "",
    serviceType: "",
    name:        "",
    email:       "",
    phone:       "",
  });

  // ── Helpers ──
  const set = <K extends keyof FormData>(key: K, val: FormData[K]) =>
    setForm((p) => ({ ...p, [key]: val }));

  const canProceed = () => {
    if (step === 1) return !!form.eventType;
    if (step === 2) return !!form.guestRange;
    if (step === 3) return !!form.serviceType;
    if (step === 4) {
      const errs: FieldError = {};
      if (!form.name.trim())                       errs.name  = "Please enter your name";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Enter a valid email address";
      if (form.phone && !/^[\d\s\+\-\(\)]{7,}$/.test(form.phone)) errs.phone = "Enter a valid phone number";
      setErrors(errs);
      return Object.keys(errs).length === 0;
    }
    return false;
  };

  const goNext = () => {
    if (!canProceed()) return;
    if (step === 4) { setSubmitted(true); return; }
    setDirection(1);
    setStep((s) => s + 1);
  };

  const goBack = () => {
    setDirection(-1);
    setStep((s) => s - 1);
    setErrors({});
  };

  const variants = prefersReduced
    ? { enter: { opacity: 0 }, center: { opacity: 1 }, exit: { opacity: 0 } }
    : makeVariants(direction);

  // ─────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400&display=swap');
        @keyframes luxPulse {
          0%,100% { opacity:.5; transform:scale(1); }
          50%      { opacity:.7; transform:scale(1.04); }
        }
      `}</style>

      <section
        className="relative min-h-screen w-full flex items-center justify-center py-20 px-4"
        style={{
          background: `
            radial-gradient(ellipse at 20% 30%, rgba(120,70,18,0.18) 0%, transparent 55%),
            radial-gradient(ellipse at 80% 70%, rgba(80,40,10,0.12) 0%, transparent 50%),
            linear-gradient(160deg, #0e0804 0%, #130a04 30%, #0c0703 65%, #080502 100%)
          `,
        }}
      >
        {/* Grain */}
        <div
          className="absolute inset-0 pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.42'/%3E%3C/svg%3E")`,
            backgroundSize: "200px",
            opacity: 0.14,
          }}
        />

        {/* Warm glow bloom */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none"
          style={{
            background: "radial-gradient(ellipse, rgba(180,110,22,0.08) 0%, transparent 68%)",
            filter: "blur(40px)",
            animation: "luxPulse 6s ease-in-out infinite",
          }}
        />

        {/* Edge vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(0,0,0,0.55) 75%, rgba(0,0,0,0.9) 100%)",
          }}
        />

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE_OUT_EXP }}
          className="relative w-full max-w-md z-10"
        >
          {/* Top accent line */}
          <div className="h-px w-full mb-1"
            style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.35), transparent)" }} />

          {/* Card */}
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              background: "linear-gradient(145deg, rgba(22,14,6,0.92) 0%, rgba(16,10,4,0.96) 100%)",
              border: "1px solid rgba(212,175,55,0.1)",
              boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(212,175,55,0.05) inset",
              backdropFilter: "blur(24px)",
            }}
          >
            {/* Inner card glow */}
            <div
              className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
              style={{
                background: "linear-gradient(180deg, rgba(212,175,55,0.04) 0%, transparent 100%)",
              }}
            />

            <div className="relative px-8 pt-9 pb-8">

              {/* Header brand */}
              {!submitted && (
                <div className="text-center mb-8">
                  <p
                    className="text-xs tracking-[0.55em] uppercase text-amber-400/35"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    Chaibaaz · Inc
                  </p>
                  <div className="mt-2 h-px mx-auto w-8"
                    style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent)" }} />
                </div>
              )}

              {/* Progress */}
              {!submitted && <ProgressBar step={step} />}

              {/* Step content */}
              <div className="relative overflow-hidden" style={{ minHeight: 320 }}>
                <AnimatePresence mode="wait" initial={false}>
                  {submitted ? (
                    <SuccessScreen key="success" data={form} />
                  ) : (
                    <motion.div
                      key={`step-${step}`}
                      variants={variants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                    >
                      {/* ── STEP 1 ── */}
                      {step === 1 && (
                        <div>
                          <StepHeading
                            step="What's the occasion?"
                            sub="Choose the nature of your event"
                          />
                          <div className="flex flex-col gap-3">
                            {EVENT_TYPES.map((opt) => (
                              <OptionCard
                                key={opt.value}
                                label={opt.value}
                                sublabel={opt.sub}
                                icon={opt.icon}
                                selected={form.eventType === opt.value}
                                onClick={() => set("eventType", opt.value)}
                              />
                            ))}
                          </div>
                        </div>
                      )}

                      {/* ── STEP 2 ── */}
                      {step === 2 && (
                        <div>
                          <StepHeading
                            step="How many guests?"
                            sub="We'll tailor the experience accordingly"
                          />
                          <div className="grid grid-cols-2 gap-3">
                            {GUEST_RANGES.map((opt) => (
                              <GuestPill
                                key={opt.value}
                                label={opt.label}
                                selected={form.guestRange === opt.value}
                                onClick={() => set("guestRange", opt.value)}
                              />
                            ))}
                          </div>
                        </div>
                      )}

                      {/* ── STEP 3 ── */}
                      {step === 3 && (
                        <div>
                          <StepHeading
                            step="Choose your service"
                            sub="Select the chai experience that suits your vision"
                          />
                          <div className="flex flex-col gap-3">
                            {SERVICE_TYPES.map((opt) => (
                              <OptionCard
                                key={opt.value}
                                label={opt.value}
                                sublabel={opt.sub}
                                icon={opt.icon}
                                selected={form.serviceType === opt.value}
                                onClick={() => set("serviceType", opt.value)}
                              />
                            ))}
                          </div>
                        </div>
                      )}

                      {/* ── STEP 4 ── */}
                      {step === 4 && (
                        <div>
                          <StepHeading
                            step="Your details"
                            sub="So our concierge team can reach you"
                          />
                          <div className="flex flex-col gap-7">
                            <LuxuryInput
                              label="Full Name"
                              value={form.name}
                              placeholder="e.g. Aanya Sharma"
                              onChange={(v) => { set("name", v); setErrors((e) => ({ ...e, name: undefined })); }}
                              error={errors.name}
                            />
                            <LuxuryInput
                              label="Email Address"
                              type="email"
                              value={form.email}
                              placeholder="you@example.com"
                              onChange={(v) => { set("email", v); setErrors((e) => ({ ...e, email: undefined })); }}
                              error={errors.email}
                            />
                            <LuxuryInput
                              label="Phone (optional)"
                              type="tel"
                              value={form.phone}
                              placeholder="+91 98765 43210"
                              onChange={(v) => { set("phone", v); setErrors((e) => ({ ...e, phone: undefined })); }}
                              error={errors.phone}
                            />
                          </div>
                        </div>
                      )}

                      {/* Nav buttons */}
                      <NavButtons
                        step={step}
                        canNext={
                          step === 1 ? !!form.eventType :
                          step === 2 ? !!form.guestRange :
                          step === 3 ? !!form.serviceType :
                          !!(form.name.trim() && form.email.trim())
                        }
                        onBack={goBack}
                        onNext={goNext}
                        isFinal={step === 4}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Bottom accent */}
          <div className="mt-1 h-px w-full"
            style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.2), transparent)" }} />

          {/* Privacy note */}
          {!submitted && (
            <p className="mt-5 text-center text-[0.6rem] tracking-[0.25em] uppercase text-stone-700">
              Your details are kept strictly private
            </p>
          )}
        </motion.div>
      </section>
    </>
  );
}