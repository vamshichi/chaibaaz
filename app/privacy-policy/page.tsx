export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#F8F5F0] px-6 py-20">
      <div className="max-w-4xl mx-auto">

        {/* Heading */}
        <div className="mb-16 text-center">
          <p
            className="uppercase tracking-[0.4em] text-[#B88B4A] text-xs mb-6"
          >
            Chaibaaz
          </p>

          <h1
            className="text-5xl md:text-7xl text-[#2A160D] leading-none"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Privacy Policy
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
              Introduction
            </h2>

            <p>
              At Chaibaaz, we value your privacy and are committed to protecting
              your personal information. This Privacy Policy explains how we
              collect, use, and safeguard your information when you use our
              website or submit inquiries through our booking forms.
            </p>
          </section>

          <section>
            <h2
              className="text-3xl text-[#2A160D] mb-4"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Information We Collect
            </h2>

            <p>
              We may collect personal information including:
            </p>

            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Full name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Event details and preferences</li>
            </ul>
          </section>

          <section>
            <h2
              className="text-3xl text-[#2A160D] mb-4"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              How We Use Your Information
            </h2>

            <p>
              Your information is used to:
            </p>

            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Respond to booking inquiries</li>
              <li>Provide customer support</li>
              <li>Send booking confirmations</li>
              <li>Improve our services and customer experience</li>
            </ul>
          </section>

          <section>
            <h2
              className="text-3xl text-[#2A160D] mb-4"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Data Protection
            </h2>

            <p>
              We implement reasonable security measures to protect your
              information from unauthorized access, misuse, or disclosure.
            </p>
          </section>

          <section>
            <h2
              className="text-3xl text-[#2A160D] mb-4"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Third-Party Services
            </h2>

            <p>
              We may use trusted third-party services such as email providers,
              analytics platforms, or hosting providers to operate our website
              and services.
            </p>
          </section>

          <section>
            <h2
              className="text-3xl text-[#2A160D] mb-4"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Contact Us
            </h2>

            <p>
              If you have any questions regarding this Privacy Policy, please
              contact us through our website or official email address.
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