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
import { selectedLanguage } from '../helpers/languageStore';
import { IntlProvider, loadMessages, LocalizationProvider } from '@progress/kendo-react-intl';
import messages from '../data/messages'; // Import the messages
import AdminView from '../components/AdminView'; 

loadMessages(messages['en'], 'en');
loadMessages(messages['fr'], 'fr');
loadMessages(messages['es'], 'es');

const data: CardDescriptor[] = [
  { img: '/listViewImages/silverBraceletOnyx.png', collectionText: "Silver Bracelet with Onyx" },
  { img: '/listViewImages/weddingBandsPearl.png', collectionText: "Wedding Bands with Pearls" },
  { img: '/listViewImages/roseGoldEarringsOpal.png', collectionText: "Rose Gold Earrings with Opal" }
];

const ringsData: CardDescriptor[] = [
  { img: '/listViewImages/diamondWeddingRing.png', collectionText: "Diamond Wedding Ring" },
  { img: '/listViewImages/diamondWeddingBands.png', collectionText: "Diamond Wedding Bands" }
];

const watchData: CardDescriptor[] = [
  { img: '/brownWatch.jpg', collectionText: "Brown Leather Watch" },
  { img: '/listViewImages/casualSilverWatch.png', collectionText: "Casual Silver Watch" },
  { img: '/vintageWatch.jpg', collectionText: "Vintage Silver Watch" }
];

const Home: React.FC = () => {
  const isAdminValue = useStore(isAdmin);
  const selectedLang = useStore(selectedLanguage);

  const t = messages[selectedLang] || messages['en']; 

  return (
    <LocalizationProvider language={selectedLang}>
      <IntlProvider locale={selectedLang}>
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
                  data={data}
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
                  data={ringsData}
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
                  data={watchData}
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
                  link="Learn More"
                />
              </CustomSection>
            </Layout>
            <Layout>
              <Testemonials />
            </Layout>
          </>
        )}
      </IntlProvider>
    </LocalizationProvider>
  );
};

export default Home;
