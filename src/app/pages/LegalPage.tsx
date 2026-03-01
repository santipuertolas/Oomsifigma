import { useNavigate, useLocation } from "react-router";
import { ArrowLeft } from "lucide-react";

const C = { teal: "#264653", green: "#2A9D8F", white: "#F8F9FA", slate: "#2D3436" };
const F = { heading: "Nunito, sans-serif", body: "Inter, sans-serif" };

const legalContent: Record<string, { title: string; lastUpdated: string; sections: { heading: string; body: string }[] }> = {
  "/privacy": {
    title: "Privacy Policy",
    lastUpdated: "1 March 2026",
    sections: [
      { heading: "Information We Collect", body: "We collect information you provide directly to us when you create an account, such as your name, email address, and company name. We also collect information about your properties and team members that you add to the platform. We do not collect or store guest payment information — all payment processing is handled by our third-party payment provider." },
      { heading: "How We Use Your Information", body: "We use the information we collect to provide, maintain, and improve our services, to communicate with you about your account and our services, and to send you notifications related to your properties and tasks. We will never sell your personal information to third parties." },
      { heading: "Data Storage & Security", body: "Your data is stored securely in EU-based data centres. We use industry-standard encryption (TLS 1.3) for data in transit and AES-256 encryption for data at rest. Access to your data is restricted to authorised personnel only." },
      { heading: "Third-Party Services", body: "We integrate with third-party services such as Airbnb, Booking.com, and VRBO to sync your booking data. We also use WhatsApp (via approved messaging providers) to send notifications to your team. These integrations only access the data necessary to provide the service." },
      { heading: "Data Retention", body: "We retain your data for as long as your account is active or as needed to provide you services. If you delete your account, we will delete your personal data within 30 days, except where we are required to retain it by law." },
      { heading: "Your Rights", body: "You have the right to access, correct, or delete your personal data at any time. You can do this through your account settings or by contacting us at hello@oomsi.com. If you are in the EU, you have additional rights under GDPR — see our GDPR page for details." },
      { heading: "Contact Us", body: "If you have any questions about this Privacy Policy, please contact us at hello@oomsi.com." },
    ],
  },
  "/terms": {
    title: "Terms of Service",
    lastUpdated: "1 March 2026",
    sections: [
      { heading: "Acceptance of Terms", body: "By accessing or using oomsi, you agree to be bound by these Terms of Service. If you do not agree to these terms, you may not use our services. These terms apply to all users, including property managers, cleaners, and other team members." },
      { heading: "Account Registration", body: "You must provide accurate and complete information when creating an account. You are responsible for maintaining the security of your account and password. You must notify us immediately of any unauthorised use of your account." },
      { heading: "Service Description", body: "oomsi is a property management platform for vacation rental owners and managers. We provide tools for managing properties, bookings, cleaning operations, and team coordination. We do not own or manage any properties ourselves." },
      { heading: "Subscription & Billing", body: "Our services are offered on a monthly or annual subscription basis. Prices are per property per month and vary by plan. No booking fees apply. You will be billed at the beginning of each billing cycle. All plans include a 14-day free trial. You can cancel your subscription at any time — cancellation takes effect at the end of your current billing period." },
      { heading: "Acceptable Use", body: "You agree not to use our services for any unlawful purpose, to interfere with the operation of our services, or to attempt to gain unauthorised access to our systems. You are responsible for all content you upload, including property information, photos, and team data." },
      { heading: "Intellectual Property", body: "All content, features, and functionality of oomsi are owned by us and are protected by international copyright, trademark, and other intellectual property laws. You may not copy, modify, or distribute our software without our prior written consent." },
      { heading: "Limitation of Liability", body: "oomsi is provided 'as is' without warranties of any kind. We are not liable for any indirect, incidental, or consequential damages arising from your use of our services. Our total liability shall not exceed the amount you paid us in the 12 months preceding the claim." },
      { heading: "Changes to Terms", body: "We may update these terms from time to time. We will notify you of any material changes by email or through the platform. Your continued use of oomsi after changes are posted constitutes acceptance of the updated terms." },
      { heading: "Contact", body: "Questions about these Terms of Service? Contact us at hello@oomsi.com." },
    ],
  },
  "/cookies": {
    title: "Cookie Policy",
    lastUpdated: "1 March 2026",
    sections: [
      { heading: "What Are Cookies", body: "Cookies are small text files that are stored on your device when you visit a website. They help us remember your preferences, understand how you use our service, and improve your experience." },
      { heading: "Cookies We Use", body: "We use essential cookies that are necessary for the platform to function (such as keeping you logged in), and analytics cookies that help us understand how people use oomsi so we can improve it. We do not use advertising or tracking cookies." },
      { heading: "Essential Cookies", body: "These cookies are required for basic functionality — authentication, session management, and security. You cannot opt out of essential cookies as the platform would not work without them." },
      { heading: "Analytics Cookies", body: "We use simple, privacy-focused analytics to understand how our platform is used. This data is aggregated and anonymised — we cannot identify individual users from analytics data. You can opt out of analytics cookies in your browser settings." },
      { heading: "Managing Cookies", body: "You can control and delete cookies through your browser settings. Note that disabling essential cookies may prevent you from using certain features of oomsi. For more information on how to manage cookies, visit your browser's help documentation." },
      { heading: "Contact", body: "If you have questions about our use of cookies, please contact us at hello@oomsi.com." },
    ],
  },
  "/gdpr": {
    title: "GDPR Compliance",
    lastUpdated: "1 March 2026",
    sections: [
      { heading: "Our Commitment", body: "oomsi is committed to protecting the privacy and rights of individuals in accordance with the General Data Protection Regulation (GDPR). This page explains how we comply with GDPR requirements and your rights as a data subject." },
      { heading: "Lawful Basis for Processing", body: "We process your personal data based on the following lawful bases: contractual necessity (to provide our services to you), legitimate interest (to improve our services and communicate with you), and consent (for optional features such as marketing emails, which you can opt out of at any time)." },
      { heading: "Data Controller", body: "oomsi acts as the data controller for personal data collected through our platform. This means we determine the purposes and means of processing your personal data." },
      { heading: "Your Rights Under GDPR", body: "As a data subject, you have the right to: access your personal data, rectify inaccurate data, request erasure of your data ('right to be forgotten'), restrict processing of your data, data portability (receive your data in a machine-readable format), and object to processing. To exercise any of these rights, contact us at hello@oomsi.com." },
      { heading: "Data Processing Agreements", body: "Where we use third-party services to process data on our behalf (such as hosting providers and messaging services), we have Data Processing Agreements in place to ensure your data is handled in accordance with GDPR." },
      { heading: "International Data Transfers", body: "Your data is stored in EU-based data centres. Where data is transferred outside the EU (for example, to third-party services), we ensure appropriate safeguards are in place, such as Standard Contractual Clauses." },
      { heading: "Data Breach Notification", body: "In the event of a data breach that poses a risk to your rights and freedoms, we will notify the relevant supervisory authority within 72 hours and notify affected individuals without undue delay." },
      { heading: "Data Protection Officer", body: "For any GDPR-related enquiries, please contact us at hello@oomsi.com. We will respond to your request within 30 days." },
    ],
  },
};

export function LegalPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const content = legalContent[location.pathname];

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: C.white }}>
        <p style={{ fontFamily: F.body, color: C.slate }}>Page not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: C.white }}>
      {/* Header */}
      <div style={{ backgroundColor: C.teal }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1.5 mb-6"
            style={{ fontFamily: F.body, fontSize: "0.8125rem", color: "white", opacity: 0.6, fontWeight: 500 }}
          >
            <ArrowLeft size={16} />
            Back to oomsi
          </button>
          <h1
            style={{
              fontFamily: F.heading,
              fontSize: "1.75rem",
              fontWeight: 800,
              color: "white",
              marginBottom: "0.5rem",
            }}
          >
            {content.title}
          </h1>
          <p style={{ fontFamily: F.body, fontSize: "0.8125rem", color: "white", opacity: 0.5 }}>
            Last updated: {content.lastUpdated}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <div className="space-y-8">
          {content.sections.map((section, i) => (
            <div key={i}>
              <h2
                style={{
                  fontFamily: F.heading,
                  fontSize: "1.125rem",
                  fontWeight: 700,
                  color: C.teal,
                  marginBottom: "0.75rem",
                }}
              >
                {i + 1}. {section.heading}
              </h2>
              <p
                style={{
                  fontFamily: F.body,
                  fontSize: "0.875rem",
                  color: C.slate,
                  opacity: 0.6,
                  lineHeight: 1.8,
                }}
              >
                {section.body}
              </p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-gray-100 flex items-center justify-between">
          <p style={{ fontFamily: F.body, fontSize: "0.75rem", color: C.slate, opacity: 0.3 }}>
            © 2026 oomsi. All rights reserved.
          </p>
          <a
            href="mailto:hello@oomsi.com"
            style={{ fontFamily: F.body, fontSize: "0.75rem", color: C.green, fontWeight: 500 }}
          >
            hello@oomsi.com
          </a>
        </div>
      </div>
    </div>
  );
}