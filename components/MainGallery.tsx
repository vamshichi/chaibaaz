"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";
import { useState } from "react";

const galleryItems = [
  {
    id: 1,
    type: "image",
    src: "/gallery/g1.png",
  },
  {
    id: 2,
    type: "image",
    src: "/gallery/g2.png",
  },
  {
    id: 3,
    type: "image",
    src: "/gallery/g7.png",
  },
  {
    id: 4,
    type: "image",
    src: "/gallery/g9.png",
  },
  {
    id: 5,
    type: "video",
    src: "/gallery/g5.mp4",
  },
  {
    id: 6,
    type: "video",
    src: "/gallery/g6.mp4",
  },
  {
    id: 7,
    type: "video",
    src: "/gallery/gv1.mp4",
  },
  {
    id: 8,
    type: "video",
    src: "/gallery/gv2.mp4",
  },
  {
    id: 9,
    type: "video",
    src: "/gallery/gv3.mp4",
  },
  {
    id: 10,
    type: "video",
    src: "/gallery/gv4.mp4",
  },
  {
    id: 11,
    type: "video",
    src: "/gallery/gv5.mp4",
  },
  {
    id: 12,
    type: "video",
    src: "/gallery/gv6.mp4",
  },
];

export default function Gallery() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  return (
    <section className="w-full bg-white py-24 px-6 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: true }}
  className="text-center mb-20 relative z-10"
>

  {/* Eyebrow */}
  <p
    style={{
      fontFamily: "'Cinzel', serif",
      fontSize: "10px",
      letterSpacing: "0.55em",
      color: "#B8964A",
      textTransform: "uppercase",
      marginBottom: "22px",
    }}
  >
    Captured Moments
  </p>

  {/* Main Heading */}
  <h2
    style={{
      fontFamily: "'Cormorant Garamond', serif",
      fontWeight: 300,
      fontSize: "clamp(3.2rem, 7vw, 6.5rem)",
      lineHeight: 0.9,
      color: "#2C1A0E",
    }}
  >
    Crafted
    <br />
    <em
      style={{
        fontStyle: "italic",
        color: "#B8964A",
      }}
    >
      experiences
    </em>
  </h2>

  {/* Gold Ornament */}
  <div className="flex items-center justify-center gap-3 mt-8 mb-8">
    <span
      className="block h-px w-16"
      style={{
        background:
          "linear-gradient(to right, transparent, #B8964A)",
      }}
    />

    <span
      style={{
        color: "#B8964A",
        fontSize: 12,
      }}
    >
      ✦
    </span>

    <span
      className="block h-px w-16"
      style={{
        background:
          "linear-gradient(to left, transparent, #B8964A)",
      }}
    />
  </div>

  {/* Description */}
  <p
    style={{
      fontFamily: "'Lato', sans-serif",
      fontWeight: 300,
      fontSize: "15px",
      lineHeight: 1.9,
      color: "#5C3D22",
      maxWidth: "680px",
      margin: "0 auto",
      letterSpacing: "0.02em",
    }}
  >
    A glimpse into the world of Chaibaaz — where luxury hospitality,
    handcrafted chai experiences, and timeless celebrations come together
    in the most elegant way.
  </p>
</motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
              }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-3xl bg-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)] transition-all duration-500"
            >

              {/* IMAGE */}
              {item.type === "image" ? (
                <div className="relative h-[320px] w-full overflow-hidden">
                  <Image
                    src={item.src}
                    alt="Gallery"
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />
                </div>
              ) : (
                /* VIDEO */
                <div className="relative h-[320px] w-full overflow-hidden">

                  <video
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    muted
                    loop
                    playsInline
                    autoPlay
                  >
                    <source src={item.src} type="video/mp4" />
                  </video>

                  {/* Play Button */}
                  <button
                    onClick={() => setSelectedVideo(item.src)}
                    className="absolute inset-0 flex items-center justify-center z-10"
                  >
                    <div className="bg-white/90 hover:bg-white transition-all duration-300 backdrop-blur-md p-5 rounded-full shadow-2xl hover:scale-110">
                      <Play className="w-7 h-7 text-black fill-black ml-1" />
                    </div>
                  </button>

                  <div className="absolute inset-0 bg-black/10" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* VIDEO POPUP */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >

            {/* Close Button */}
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-6 right-6 z-50 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md p-3 rounded-full transition"
            >
              <X className="text-white w-6 h-6" />
            </button>

            {/* Video */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl"
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