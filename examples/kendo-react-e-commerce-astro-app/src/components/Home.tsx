import React from 'react';
import { BackgroundImage } from '../components/BackgroundImage';
import { Layout } from '../components/Layout';
import { CategoryList } from '../components/CategoryList';
import { CardDescriptor } from "../data/types";
import { CustomSection } from '../components/CustomizedSection';
import { OrderedImgText } from '../components/OrderedImageCard';
import { Testemonials } from '../components/Testemonials';
import { isAdmin } from "../helpers/adminStore"; 
import { useStore } from '@nanostores/react';
import { loadMessages, LocalizationProvider } from '@progress/kendo-react-intl';
import AdminView from '../components/AdminView'; 

import { selectedLanguage } from '../helpers/languageStore';
import enMessages from '../data/messages/en';
import frMessages from '../data/messages/fr';
import esMessages from '../data/messages/es';

loadMessages(enMessages, 'en');
loadMessages(frMessages, 'fr');
loadMessages(esMessages, 'es');

const messages = {
  en: enMessages,
  fr: frMessages,
  es: esMessages,
};

const data: CardDescriptor[] = [
  { img: '/listViewImages/silverBraceletOnyx.png', collectionTextKey: "silverBraceletWithOnyx" },
  { img: '/listViewImages/weddingBandsPearl.png', collectionTextKey: "weddingBandsWithPearls" },
  { img: '/listViewImages/roseGoldEarringsOpal.png', collectionTextKey: "roseGoldEarringsWithOpal" }
];

const ringsData: CardDescriptor[] = [
  { img: '/listViewImages/diamondWeddingRing.png', collectionTextKey: "diamondWeddingRing" },
  { img: '/listViewImages/diamondWeddingBands.png', collectionTextKey: "diamondWeddingBands" }
];

const watchData: CardDescriptor[] = [
  { img: '/brownWatch.jpg', collectionTextKey: "brownLeatherWatch" },
  { img: '/listViewImages/casualSilverWatch.png', collectionTextKey: "casualSilverWatch" },
  { img: '/vintageWatch.jpg', collectionTextKey: "vintageSilverWatch" }
];

const Home: React.FC = () => {
  const isAdminValue = useStore(isAdmin);
  const selectedLang = useStore(selectedLanguage);

  const t = messages[selectedLang] || messages['en']; 

  const translatedData = data.map(item => ({
    img: item.img,
    collectionText: t[item.collectionTextKey] || item.collectionTextKey,
  }));

  const translatedRingsData = ringsData.map(item => ({
    img: item.img,
    collectionText: t[item.collectionTextKey] || item.collectionTextKey,
  }));

  const translatedWatchData = watchData.map(item => ({
    img: item.img,
    collectionText: t[item.collectionTextKey] || item.collectionTextKey,
  }));

  return (
    <LocalizationProvider language={selectedLang}>
      <BackgroundImage
        title={t.title}
        subtitle={t.subtitle}
        buttonText={t.buttonText}
        img="/model_1.png"
      />

      {isAdminValue ? (
        <Layout>
          <div className="k-mt-8"> 
            <AdminView />
          </div>
        </Layout>
      ) : (
        <>
          <Layout>
            <section
              className="k-d-grid k-grid-cols-12 k-justify-content-center k-align-items-center k-col-span-12"
              style={{ paddingTop: "60px" }}
            >
              <CategoryList
                title={t.bestsellersTitle}
                subtitle={t.bestsellersSubtitle}
                data={translatedData}
              />
            </section>
          </Layout>
          <Layout>
            <CustomSection>
              <OrderedImgText
                title={t.timelessTitle}
                subtitle={t.timelessSubtitle}
                contentText={t.timelessContent}
                img="/homeModel2.png"
                order='first'
                link={t.buttonText}
              />
            </CustomSection>
          </Layout>
          <Layout>
            <CustomSection>
              <OrderedImgText
                title={t.fineJewelryTitle}
                subtitle={t.fineJewelrySubtitle}
                contentText={t.fineJewelryContent}
                img="/homeModel3.png"
                order='last'
                link={t.buttonText}
              />
            </CustomSection>
          </Layout>
          <Layout>
            <CustomSection>
              <CategoryList
                colSpan={6}
                title={t.ringsTitle}
                subtitle={t.ringsSubtitle}
                data={translatedRingsData}
              />
            </CustomSection>
          </Layout>
          <Layout>
            <CustomSection>
              <OrderedImgText
                title={t.watchesTitle}
                subtitle={t.watchesSubtitle}
                contentText={t.watchesContent}
                img="/homeWatch1.png"
                order='first'
                link={t.buttonText}
              />
            </CustomSection>
          </Layout>
          <Layout>
            <CustomSection>
              <CategoryList
                title={t.watchesTitle}
                subtitle={t.watchesSubtitle}
                data={translatedWatchData}
              />
            </CustomSection>
          </Layout>
          <Layout>
            <CustomSection>
              <OrderedImgText
                title={t.servicesTitle}
                subtitle={t.servicesSubtitle}
                contentText={t.servicesContent}
                img="/homeServicesImage.png"
                order='last'
                link={t.learnMoreText}
              />
            </CustomSection>
          </Layout>
          <Layout>
            <Testemonials />
          </Layout>
        </>
      )}
    </LocalizationProvider>
  );
};

export default Home;
