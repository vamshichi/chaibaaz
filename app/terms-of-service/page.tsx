export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-[#F8F5F0] px-6 py-20">
      <div className="max-w-4xl mx-auto">

        {/* Heading */}
        <div className="mb-16 text-center">
          <p className="uppercase tracking-[0.4em] text-[#B88B4A] text-xs mb-6">
            Chaibaaz
          </p>

          <h1
            className="text-5xl md:text-7xl text-[#2A160D] leading-none"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Terms of Service
          </h1>

          <div className="flex justify-center items-center gap-3 mt-8">
            <div className="w-16 h-px bg-[#C9A46A]" />
            <div className="w-2 h-2 rounded-full bg-[#C9A46A]" />
            <div className="w-16 h-px bg-[#C9A46A]" />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-10 text-[#4F4034] leading-8">

          <section>
            <h2
              className="text-3xl text-[#2A160D] mb-4"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Acceptance of Terms
            </h2>

            <p>
              By accessing and using the Chaibaaz website and services, you
              agree to comply with these Terms of Service and all applicable
              laws and regulations.
            </p>
          </section>

          <section>
            <h2
              className="text-3xl text-[#2A160D] mb-4"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Services
            </h2>

            <p>
              Chaibaaz provides luxury chai catering and hospitality services
              for weddings, corporate events, private gatherings, concerts,
              and premium experiences.
            </p>
          </section>

          <section>
            <h2
              className="text-3xl text-[#2A160D] mb-4"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Booking & Payments
            </h2>

            <p>
              All bookings are subject to availability and confirmation.
              Pricing, payment schedules, and cancellation policies will be
              communicated directly during the booking process.
            </p>
          </section>

          <section>
            <h2
              className="text-3xl text-[#2A160D] mb-4"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              User Responsibilities
            </h2>

            <p>
              Users agree to provide accurate information when submitting
              inquiries or bookings and to use the website lawfully and
              respectfully.
            </p>
          </section>

          <section>
            <h2
              className="text-3xl text-[#2A160D] mb-4"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Intellectual Property
            </h2>

            <p>
              All content, branding, designs, images, logos, and materials on
              this website are the property of Chaibaaz and may not be copied,
              reproduced, or distributed without permission.
            </p>
          </section>

          <section>
            <h2
              className="text-3xl text-[#2A160D] mb-4"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Limitation of Liability
            </h2>

            <p>
              Chaibaaz is not liable for any indirect, incidental, or
              consequential damages arising from the use of our website or
              services.
            </p>
          </section>

          <section>
            <h2
              className="text-3xl text-[#2A160D] mb-4"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Changes to Terms
            </h2>

            <p>
              We reserve the right to modify these Terms of Service at any
              time. Continued use of the website after updates constitutes
              acceptance of the revised terms.
            </p>
          </section>

          <section>
            <h2
              className="text-3xl text-[#2A160D] mb-4"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Contact
            </h2>

            <p>
              For any questions regarding these Terms of Service, please
              contact us through our official website or support email.
            </p>
          </section>

          <section className="pt-10 border-t border-[#D8C8B5]">
            <p className="text-sm text-[#7A6A5A]">
              Last updated: May 2026
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}