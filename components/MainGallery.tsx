"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const galleryItems = [
  { id: 1,  type: "image", src: "/gallery/g1.png" },
  { id: 2,  type: "image", src: "/gallery/g2.png" },
  { id: 3,  type: "image", src: "/gallery/g7.png" },
  { id: 4,  type: "image", src: "/gallery/g9.png" },
  { id: 5,  type: "image", src: "/gallery/g10.png" },
  { id: 6,  type: "image", src: "/gallery/g11.png" },
  { id: 7,  type: "image", src: "/gallery/g12.png" },
  { id: 8,  type: "image", src: "/gallery/g13.jpeg" },
  { id: 9,  type: "image", src: "/gallery/g15.jpg" },
  { id: 10, type: "image", src: "/gallery/g13.png" },
  { id: 11, type: "video", src: "/gallery/g5.mp4" },
  { id: 12, type: "video", src: "/gallery/g6.mp4" },
  { id: 13, type: "video", src: "/gallery/gv1.mp4" },
  { id: 14, type: "video", src: "/gallery/gv2.mp4" },
  { id: 15, type: "video", src: "/gallery/gv3.mp4" },
  { id: 16, type: "video", src: "/gallery/gv4.mp4" },
  { id: 17, type: "video", src: "/gallery/gv5.mp4" },
  { id: 18, type: "video", src: "/gallery/gv6.mp4" },
];

/* ─────────────────────────────────────────────
   LAZY VIDEO CARD
   • Starts preload="none"  → zero network cost
   • IntersectionObserver fires 200 px before the
     card enters the viewport and switches to
     preload="metadata" with a per-video stagger
     (100 ms apart) so the browser never decodes
     all 8 videos in the same frame.
   • key={preload} forces a DOM remount when the
     attribute changes — required because browsers
     ignore a runtime change to the preload attr
     once the element is already rendered.
───────────────────────────────────────────── */
function VideoCard({
  src,
  staggerIndex,
  onPlay,
}: {
  src: string;
  staggerIndex: number;
  onPlay: (src: string) => void;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [preload, setPreload] = useState<"none" | "metadata">("none");

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setPreload("metadata"), staggerIndex * 100);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [staggerIndex]);

  return (
    <div
      ref={wrapperRef}
      className="relative h-[220px] sm:h-[280px] lg:h-[300px] w-full overflow-hidden"
    >
      {/* key forces remount so the browser re-reads the new preload value */}
      <video
        key={preload}
        className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
        muted
        loop
        playsInline
        preload={preload}
        onMouseEnter={(e) => e.currentTarget.play()}
        onMouseLeave={(e) => {
          e.currentTarget.pause();
          e.currentTarget.currentTime = 0;
        }}
      >
        <source src={src} type="video/mp4" />
      </video>

      {/* Play button */}
      <button
        onClick={() => onPlay(src)}
        aria-label="Play video"
        className="absolute inset-0 flex items-center justify-center z-10"
      >
        <div className="bg-white/90 hover:bg-white transition-all duration-300 backdrop-blur-md p-4 sm:p-5 rounded-full shadow-2xl hover:scale-110 active:scale-95">
          <Play className="w-5 h-5 sm:w-7 sm:h-7 text-black fill-black ml-0.5" />
        </div>
      </button>

      <div className="absolute inset-0 bg-black/10 pointer-events-none" />
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN GALLERY
───────────────────────────────────────────── */
export default function Gallery() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  let videoCount = 0;

  return (
    <section className="w-full bg-white py-20 px-4 sm:px-6 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* ── Heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-14 sm:mb-20"
        >
          <p
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "10px",
              letterSpacing: "clamp(0.2em, 0.55em, 0.55em)",
              color: "#B8964A",
              textTransform: "uppercase",
              marginBottom: "20px",
            }}
          >
            Captured Moments
          </p>

          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              fontSize: "clamp(2.6rem, 7vw, 6.5rem)",
              lineHeight: 0.92,
              color: "#2C1A0E",
            }}
          >
            Crafted
            <br />
            <em style={{ fontStyle: "italic", color: "#B8964A" }}>
              experiences
            </em>
          </h2>

          <div className="flex items-center justify-center gap-3 mt-7 mb-7">
            <span
              className="block h-px w-12 sm:w-16"
              style={{ background: "linear-gradient(to right, transparent, #B8964A)" }}
            />
            <span style={{ color: "#B8964A", fontSize: 12 }}>✦</span>
            <span
              className="block h-px w-12 sm:w-16"
              style={{ background: "linear-gradient(to left, transparent, #B8964A)" }}
            />
          </div>

          <p
            style={{
              fontFamily: "'Lato', sans-serif",
              fontWeight: 300,
              fontSize: "15px",
              lineHeight: 1.85,
              color: "#5C3D22",
              maxWidth: "640px",
              margin: "0 auto",
              letterSpacing: "0.02em",
            }}
          >
            A glimpse into the world of Chaibaaz luxury hospitality,
            handcrafted chai experiences, and timeless celebrations.
          </p>
        </motion.div>

        {/* ── Gallery Grid ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {galleryItems.map((item, index) => {
            const currentVideoIndex = item.type === "video" ? videoCount++ : 0;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0 }}
                transition={{
                  duration: 0.7,
                  delay: Math.min(index * 0.04, 0.3),
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-2xl
                  bg-stone-100
                  shadow-[0_6px_24px_rgba(0,0,0,0.07)]
                  hover:shadow-[0_16px_48px_rgba(0,0,0,0.13)]
                  transition-shadow
                  duration-500
                "
              >
                {item.type === "image" ? (
                  <div className="relative h-[220px] sm:h-[280px] lg:h-[300px] w-full overflow-hidden">
                    <Image
                      src={item.src}
                      alt="Gallery"
                      fill
                      unoptimized
                      className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                ) : (
                  <VideoCard
                    src={item.src}
                    staggerIndex={currentVideoIndex}
                    onPlay={setSelectedVideo}
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── Video Popup ── */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedVideo(null)}
          >
            <button
              onClick={() => setSelectedVideo(null)}
              aria-label="Close video"
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md p-2.5 sm:p-3 rounded-full transition"
            >
              <X className="text-white w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl"
            >
              <video
                controls
                autoPlay
                className="w-full h-auto max-h-[85vh] object-contain bg-black"
              >
                <source src={selectedVideo} type="video/mp4" />
              </video>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}