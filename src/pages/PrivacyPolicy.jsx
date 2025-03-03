import { useTranslation } from "react-i18next";
import SoulJourneyLogo from "../components/SoulJourneyLogo";

const PrivacyPolicy = () => {
  const { t } = useTranslation();
  
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-16 text-slate-700">
        <div className="flex justify-center mb-8">
          <SoulJourneyLogo />
        </div>
        
        <h1 className="text-3xl font-bold text-center text-slate-800 mb-12">Privacy Policy</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4 border-b border-purple-500 pb-2">1. Introduction</h2>
            <p className="mb-3">
              At SoulJourney, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform and services. Please read this policy carefully. By accessing or using our service, you acknowledge that you have read and understood this Privacy Policy.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4 border-b border-purple-500 pb-2">2. Information We Collect</h2>
            <p className="mb-3">
              <strong>Personal Information:</strong> When you register for an account, we collect personal information such as your name, email address, phone number, and payment information.
            </p>
            <p className="mb-3">
              <strong>Professional Information:</strong> For therapists, we collect professional credentials, licensing information, education history, and professional experience.
            </p>
            <p className="mb-3">
              <strong>Health Information:</strong> Clients may provide health information, including mental health history and current concerns, to facilitate therapy services.
            </p>
            <p className="mb-3">
              <strong>Usage Data:</strong> We collect information on how you interact with our platform, including access times, pages viewed, and features used.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4 border-b border-purple-500 pb-2">3. How We Use Your Information</h2>
            <p className="mb-3">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 mb-3 space-y-2">
              <li>Provide, maintain, and improve our services</li>
              <li>Process payments and manage accounts</li>
              <li>Match clients with appropriate therapists</li>
              <li>Communicate with you about our services</li>
              <li>Monitor and analyze usage patterns and trends</li>
              <li>Protect against unauthorized access and legal liability</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4 border-b border-purple-500 pb-2">4. Sharing Your Information</h2>
            <p className="mb-3">
              We may share your information in the following circumstances:
            </p>
            <ul className="list-disc pl-6 mb-3 space-y-2">
              <li><strong>Between Clients and Therapists:</strong> Information necessary for the provision of therapy services is shared between matched clients and therapists.</li>
              <li><strong>Service Providers:</strong> We may share information with third-party service providers who perform services on our behalf, such as payment processing and data analysis.</li>
              <li><strong>Legal Requirements:</strong> We may disclose information if required by law or in response to valid legal processes.</li>
              <li><strong>Business Transfers:</strong> If SoulJourney is involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4 border-b border-purple-500 pb-2">5. Data Security</h2>
            <p className="mb-3">
              We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, disclosure, alteration, and destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4 border-b border-purple-500 pb-2">6. Data Retention</h2>
            <p className="mb-3">
              We retain your personal information for as long as necessary to provide our services and fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4 border-b border-purple-500 pb-2">7. Your Rights</h2>
            <p className="mb-3">
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <ul className="list-disc pl-6 mb-3 space-y-2">
              <li>The right to access your personal information</li>
              <li>The right to correct inaccurate or incomplete information</li>
              <li>The right to request deletion of your personal information</li>
              <li>The right to restrict or object to processing of your personal information</li>
              <li>The right to data portability</li>
            </ul>
            <p className="mb-3">
              To exercise these rights, please contact us using the information provided in the "Contact Us" section.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4 border-b border-purple-500 pb-2">8. Cookies and Tracking Technologies</h2>
            <p className="mb-3">
              We use cookies and similar tracking technologies to collect information about your browsing activities and to improve your experience on our platform. You can manage your cookie preferences through your browser settings.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4 border-b border-purple-500 pb-2">9. Children's Privacy</h2>
            <p className="mb-3">
              Our services are not intended for individuals under the age of 18 without parental consent. We do not knowingly collect personal information from children under 18. If we become aware that we have collected personal information from a child under 18 without verification of parental consent, we will take steps to remove that information.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4 border-b border-purple-500 pb-2">10. International Data Transfers</h2>
            <p className="mb-3">
              Your information may be transferred to and processed in countries other than the country in which you reside. These countries may have different data protection laws than your country of residence. We will take appropriate measures to ensure that your personal information remains protected in accordance with this Privacy Policy.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4 border-b border-purple-500 pb-2">11. Changes to This Privacy Policy</h2>
            <p className="mb-3">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4 border-b border-purple-500 pb-2">12. Contact Us</h2>
            <p className="mb-3">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p className="mb-3">
              Email: privacy@souljourney.com<br />
              Address: [Your Company Address]
            </p>
          </section>
        </div>
        
        <div className="mt-12 text-center text-sm text-slate-500">
          <p>Last updated: March 3, 2025</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
