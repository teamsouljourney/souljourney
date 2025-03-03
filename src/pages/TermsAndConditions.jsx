import { useTranslation } from "react-i18next";
import SoulJourneyLogo from "../components/SoulJourneyLogo";

const TermsAndConditions = () => {
  const { t } = useTranslation();
  
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-16 text-slate-700">
        <div className="flex justify-center mb-8">
          <SoulJourneyLogo />
        </div>
        
        <h1 className="text-3xl font-bold text-center text-slate-800 mb-12">Terms and Conditions</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4 border-b border-purple-500 pb-2">1. Introduction</h2>
            <p className="mb-3">
              Welcome to SoulJourney. These Terms and Conditions govern your use of our platform and services. By accessing or using SoulJourney, you agree to be bound by these Terms. If you disagree with any part of these terms, you may not access the service.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4 border-b border-purple-500 pb-2">2. Definitions</h2>
            <p className="mb-3">
              <strong>"Platform"</strong> refers to the SoulJourney website and application.
            </p>
            <p className="mb-3">
              <strong>"Services"</strong> refers to the therapy and counseling services provided through our platform.
            </p>
            <p className="mb-3">
              <strong>"Therapist"</strong> refers to licensed mental health professionals registered on our platform.
            </p>
            <p className="mb-3">
              <strong>"Client"</strong> refers to users seeking therapy services through our platform.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4 border-b border-purple-500 pb-2">3. Account Registration</h2>
            <p className="mb-3">
              To use our services, you must register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
            </p>
            <p className="mb-3">
              You are responsible for safeguarding your password and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4 border-b border-purple-500 pb-2">4. Therapist Qualifications</h2>
            <p className="mb-3">
              All therapists on our platform must be licensed professionals. We verify credentials before allowing therapists to offer services, but clients are encouraged to verify a therapist's credentials independently.
            </p>
            <p className="mb-3">
              Therapists are independent contractors and not employees of SoulJourney. We do not control the services provided by therapists and are not responsible for their professional advice.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4 border-b border-purple-500 pb-2">5. Payment Terms</h2>
            <p className="mb-3">
              Clients agree to pay the fees for services as described on the platform. All payments are processed through our secure payment system.
            </p>
            <p className="mb-3">
              Therapists will receive payment for their services according to our payment schedule, minus applicable platform fees.
            </p>
            <p className="mb-3">
              Refunds may be issued in accordance with our refund policy, which is available on our website.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4 border-b border-purple-500 pb-2">6. Cancellation Policy</h2>
            <p className="mb-3">
              Clients must provide at least 24 hours' notice to cancel a scheduled session. Late cancellations or no-shows may result in a charge of the full session fee.
            </p>
            <p className="mb-3">
              Therapists must provide reasonable notice of cancellation and assist in rescheduling sessions when necessary.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4 border-b border-purple-500 pb-2">7. Confidentiality</h2>
            <p className="mb-3">
              We respect the confidentiality of the therapeutic relationship. All communications between clients and therapists are confidential, subject to legal and ethical limitations.
            </p>
            <p className="mb-3">
              Our platform implements security measures to protect your information, but no system is completely secure. Please refer to our Privacy Policy for more information.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4 border-b border-purple-500 pb-2">8. Limitations of Liability</h2>
            <p className="mb-3">
              SoulJourney is not liable for any damages resulting from the use of our platform or services. We do not guarantee the effectiveness of therapy services.
            </p>
            <p className="mb-3">
              Our platform is not suitable for emergency situations. If you are experiencing a mental health emergency, please call emergency services or go to your nearest emergency room.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4 border-b border-purple-500 pb-2">9. Intellectual Property</h2>
            <p className="mb-3">
              All content on the SoulJourney platform, including text, graphics, logos, and software, is the property of SoulJourney and is protected by intellectual property laws.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4 border-b border-purple-500 pb-2">10. Termination</h2>
            <p className="mb-3">
              We reserve the right to terminate or suspend access to our services immediately, without prior notice or liability, for any reason, including breach of these Terms.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4 border-b border-purple-500 pb-2">11. Changes to Terms</h2>
            <p className="mb-3">
              We reserve the right to modify these terms at any time. We will provide notice of significant changes. Your continued use of the platform after such modifications constitutes your acceptance of the revised terms.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4 border-b border-purple-500 pb-2">12. Governing Law</h2>
            <p className="mb-3">
              These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4 border-b border-purple-500 pb-2">13. Contact Us</h2>
            <p className="mb-3">
              If you have any questions about these Terms, please contact us at support@souljourney.com.
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

export default TermsAndConditions;
