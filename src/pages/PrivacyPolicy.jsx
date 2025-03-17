import { useTranslation } from "react-i18next";
import SoulJourneyLogo from "../components/SoulJourneyLogo";

const PrivacyPolicy = () => {
  const { t } = useTranslation();
  
  return (
    <div className="bg-offWhite dark:bg-background-darker text-navy dark:text-offWhite-dark min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-16 ">
        <div className="flex justify-center mb-8">
          <SoulJourneyLogo />
        </div>
        
        <h1 className="text-3xl font-bold text-center  mb-12">{t('PrivacyPolicy.title')}</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold  mb-4 border-b border-purple-500 pb-2">{t('PrivacyPolicy.sections.introduction.title')}</h2>
            <p className="mb-3">
              {t('PrivacyPolicy.sections.introduction.content')}
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold  mb-4 border-b border-purple-500 pb-2">{t('PrivacyPolicy.sections.informationWeCollect.title')}</h2>
            <p className="mb-3">
              {t('PrivacyPolicy.sections.informationWeCollect.personalInfo')}
            </p>
            <p className="mb-3">
              {t('PrivacyPolicy.sections.informationWeCollect.professionalInfo')}
            </p>
            <p className="mb-3">
              {t('PrivacyPolicy.sections.informationWeCollect.healthInfo')}
            </p>
            <p className="mb-3">
              {t('PrivacyPolicy.sections.informationWeCollect.usageData')}
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold  mb-4 border-b border-purple-500 pb-2">{t('PrivacyPolicy.sections.howWeUseYourInformation.title')}</h2>
            <p className="mb-3">
              {t('PrivacyPolicy.sections.howWeUseYourInformation.content')}
            </p>
            <ul className="list-disc pl-6 mb-3 space-y-2">
              {t('PrivacyPolicy.sections.howWeUseYourInformation.items', { returnObjects: true }).map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold  mb-4 border-b border-purple-500 pb-2">{t('PrivacyPolicy.sections.sharingYourInformation.title')}</h2>
            <p className="mb-3">
              {t('PrivacyPolicy.sections.sharingYourInformation.content')}
            </p>
            <ul className="list-disc pl-6 mb-3 space-y-2">
              {t('PrivacyPolicy.sections.sharingYourInformation.items', { returnObjects: true }).map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold  mb-4 border-b border-purple-500 pb-2">{t('PrivacyPolicy.sections.dataSecurityAndRetention.title')}</h2>
            <p className="mb-3">
              {t('PrivacyPolicy.sections.dataSecurityAndRetention.content1')}
            </p>
            <p className="mb-3">
              {t('PrivacyPolicy.sections.dataSecurityAndRetention.content2')}
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold  mb-4 border-b border-purple-500 pb-2">{t('PrivacyPolicy.sections.yourRights.title')}</h2>
            <p className="mb-3">
              {t('PrivacyPolicy.sections.yourRights.content')}
            </p>
            <ul className="list-disc pl-6 mb-3 space-y-2">
              {t('PrivacyPolicy.sections.yourRights.items', { returnObjects: true }).map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <p className="mb-3">
              {t('PrivacyPolicy.sections.yourRights.content2')}
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold  mb-4 border-b border-purple-500 pb-2">{t('PrivacyPolicy.sections.cookiesAndTracking.title')}</h2>
            <p className="mb-3">
              {t('PrivacyPolicy.sections.cookiesAndTracking.content')}
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold  mb-4 border-b border-purple-500 pb-2">{t('PrivacyPolicy.sections.childrenPrivacy.title')}</h2>
            <p className="mb-3">
              {t('PrivacyPolicy.sections.childrenPrivacy.content')}
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold  mb-4 border-b border-purple-500 pb-2">{t('PrivacyPolicy.sections.internationalDataTransfers.title')}</h2>
            <p className="mb-3">
              {t('PrivacyPolicy.sections.internationalDataTransfers.content')}
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4 border-b border-purple-500 pb-2">{t('PrivacyPolicy.sections.changes.title')}</h2>
            <p className="mb-3">
              {t('PrivacyPolicy.sections.changes.content')}
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold  mb-4 border-b border-purple-500 pb-2">{t('PrivacyPolicy.sections.contactUs.title')}</h2>
            <p className="mb-3">
              {t('PrivacyPolicy.sections.contactUs.content')}
            </p>
            <p className="mb-3">
              {t('PrivacyPolicy.sections.contactUs.email')}
            </p>
            <p className="mb-3">
              {t('PrivacyPolicy.sections.contactUs.address')}
            </p>
          </section>
        </div>
        
        <div className="mt-12 text-center text-sm text-slate-500 dark:text-slate-400">
          <p>{t('PrivacyPolicy.lastUpdated')}</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
