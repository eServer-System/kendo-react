import React from 'react';
import { Layout } from "../components/Layout";
import { BackgroundImage } from '../components/BackgroundImage';
import { Button } from "@progress/kendo-react-buttons";

import { useStore } from '@nanostores/react';
import { selectedLanguage } from '../helpers/languageStore';
import { loadMessages, LocalizationProvider } from '@progress/kendo-react-intl';
import messages from '../data/messages';

loadMessages(messages['en'], 'en');
loadMessages(messages['fr'], 'fr');
loadMessages(messages['es'], 'es');

const ThankYou: React.FC = () => {

  const language = useStore(selectedLanguage);
  const t = messages[language] || messages['en'];

  const onBacktoShoppingClick = () => {
    window.location.href = "/products";
  };

  return (
    <LocalizationProvider language={language}>
      <>
        <BackgroundImage img="/present.png" title="" subtitle="" />
        <Layout>
          <div className="k-d-flex k-flex-col k-justify-content-center k-align-items-center k-h-100 k-text-center">
            <h1>{t.thankYouTitle}</h1>
            <p>{t.thankYouSubtitle}</p>
            <Button
              className="k-mt-6"
              onClick={onBacktoShoppingClick}
              themeColor="primary"
              size="large"
            >
              {t.backToShoppingButton}
            </Button>
          </div>
        </Layout>
      </>
    </LocalizationProvider>
  );
};

export default ThankYou;
