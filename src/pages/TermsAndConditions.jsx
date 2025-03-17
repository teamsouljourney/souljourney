import { useTranslation } from "react-i18next";
import SoulJourneyLogo from "../components/SoulJourneyLogo";

const TermsAndConditions = () => {
  const { t } = useTranslation();
  
  return (
    <div className="bg-slate-50 dark:bg-background-darker text-navy dark:text-offWhite-dark min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-16 ">
        <div className="flex justify-center mb-8">
          <SoulJourneyLogo />
        </div>
        
        <h1 className="text-3xl font-bold text-center  mb-12">{t('termsAndConditions.title')}</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold  mb-4 border-b border-purple-500 pb-2">{t('termsAndConditions.sections.introduction.title')}</h2>
            <p className="mb-3">
              {t('termsAndConditions.sections.introduction.content')}
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold  mb-4 border-b border-purple-500 pb-2">{t('termsAndConditions.sections.definitions.title')}</h2>
            <p className="mb-3">
              {t('termsAndConditions.sections.definitions.platform')}
            </p>
            <p className="mb-3">
              {t('termsAndConditions.sections.definitions.services')}
            </p>
            <p className="mb-3">
              {t('termsAndConditions.sections.definitions.therapist')}
            </p>
            <p className="mb-3">
              {t('termsAndConditions.sections.definitions.client')}
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold  mb-4 border-b border-purple-500 pb-2">{t('termsAndConditions.sections.accountRegistration.title')}</h2>
            <p className="mb-3">
              {t('termsAndConditions.sections.accountRegistration.content1')}
            </p>
            <p className="mb-3">
              {t('termsAndConditions.sections.accountRegistration.content2')}
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold  mb-4 border-b border-purple-500 pb-2">{t('termsAndConditions.sections.therapistQualifications.title')}</h2>
            <p className="mb-3">
              {t('termsAndConditions.sections.therapistQualifications.content1')}
            </p>
            <p className="mb-3">
              {t('termsAndConditions.sections.therapistQualifications.content2')}
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold  mb-4 border-b border-purple-500 pb-2">{t('termsAndConditions.sections.paymentTerms.title')}</h2>
            <p className="mb-3">
              {t('termsAndConditions.sections.paymentTerms.content1')}
            </p>
            <p className="mb-3">
              {t('termsAndConditions.sections.paymentTerms.content2')}
            </p>
            <p className="mb-3">
              {t('termsAndConditions.sections.paymentTerms.content3')}
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold  mb-4 border-b border-purple-500 pb-2">{t('termsAndConditions.sections.cancellationPolicy.title')}</h2>
            <p className="mb-3">
              {t('termsAndConditions.sections.cancellationPolicy.content1')}
            </p>
            <p className="mb-3">
              {t('termsAndConditions.sections.cancellationPolicy.content2')}
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold  mb-4 border-b border-purple-500 pb-2">{t('termsAndConditions.sections.confidentiality.title')}</h2>
            <p className="mb-3">
              {t('termsAndConditions.sections.confidentiality.content1')}
            </p>
            <p className="mb-3">
              {t('termsAndConditions.sections.confidentiality.content2')}
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold  mb-4 border-b border-purple-500 pb-2">{t('termsAndConditions.sections.limitationsOfLiability.title')}</h2>
            <p className="mb-3">
              {t('termsAndConditions.sections.limitationsOfLiability.content1')}
            </p>
            <p className="mb-3">
              {t('termsAndConditions.sections.limitationsOfLiability.content2')}
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold  mb-4 border-b border-purple-500 pb-2">{t('termsAndConditions.sections.intellectualProperty.title')}</h2>
            <p className="mb-3">
              {t('termsAndConditions.sections.intellectualProperty.content')}
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold  mb-4 border-b border-purple-500 pb-2">{t('termsAndConditions.sections.termination.title')}</h2>
            <p className="mb-3">
              {t('termsAndConditions.sections.termination.content')}
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold  mb-4 border-b border-purple-500 pb-2">{t('termsAndConditions.sections.changestoTerms.title')}</h2>
            <p className="mb-3">
              {t('termsAndConditions.sections.changestoTerms.content')}
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold  mb-4 border-b border-purple-500 pb-2">{t('termsAndConditions.sections.governingLaw.title')}</h2>
            <p className="mb-3">
              {t('termsAndConditions.sections.governingLaw.content')}
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold  mb-4 border-b border-purple-500 pb-2">{t('termsAndConditions.sections.contactUs.title')}</h2>
            <p className="mb-3">
              {t('termsAndConditions.sections.contactUs.content')}
            </p>
          </section>
        </div>
        
        <div className="mt-12 text-center text-sm text-slate-500 dark:text-slate-400">
          <p>{t('termsAndConditions.lastUpdated')}</p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
