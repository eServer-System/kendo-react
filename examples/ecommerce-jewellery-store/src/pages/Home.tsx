import React from "react";
import { useStore } from "@nanostores/react";
import { selectedLanguage } from "../helpers/languageStore";
import messages from "../data/messages";
import { BackgroundImage } from "../components/BackgroundImage";
import { Layout } from "../components/Layout";
import { CategoryList } from "../components/CategoryList";
import { CustomSection } from "../components/CustomizedSection";
import { OrderedImgText } from "../components/OrderedImageCard";
import { Testemonials } from "../components/Testemonials";
import AdminView from "../components/AdminView";
import model from "../assets/model_1.png";
import silverBraceletOnyx from "../assets/listViewImages/silverBraceletOnyx.png";
import weddingBandsPearl from "../assets/listViewImages/weddingBandsPearl.png";
import roseGoldEarringsOpal from "../assets/listViewImages/roseGoldEarringsOpal.png";
import diamondWeddingRing from "../assets/listViewImages/diamondWeddingRing.png";
import diamondWeddingBands from "../assets/listViewImages/diamondWeddingBands.png";
import brownWatch from "../assets/brownWatch.jpg";
import vitageWatch from "../assets/vitageWatch.jpg";
import casualSilverWatch from "../assets/listViewImages/casualSilverWatch.png";
import homeModel2 from "../assets/homeModel2.png";
import homeModel3 from "../assets/homeModel3.png";
import homeWatch1 from "../assets/homeWatch1.png";

const data = [
  { img: silverBraceletOnyx, collectionText: "Silver Bracelet with Onyx" },
  { img: weddingBandsPearl, collectionText: "Wedding Bands with Pearls" },
  { img: roseGoldEarringsOpal, collectionText: "Rose Gold Earrings with Opal" },
];

const ringsData = [
  { img: diamondWeddingRing, collectionText: "Diamond Wedding Ring" },
  { img: diamondWeddingBands, collectionText: "Diamond Wedding Bands" },
];

const watchData = [
  { img: brownWatch, collectionText: "Brown Leather Watch" },
  { img: casualSilverWatch, collectionText: "Casual Silver Watch" },
  { img: vitageWatch, collectionText: "Vintage Silver Watch" },
];

const Home = () => {
  const [forceUpdate, setForceUpdate] = React.useState(0);
const language = useStore(selectedLanguage);
console.log(`selectedLanguage`,selectedLanguage)
React.useEffect(() => {
  setForceUpdate((prev) => prev + 1);
  console.log("Language updated, forcing re-render:", language);
}, [language]);
  const t = messages[language];
  console.log("Messages for Current Language:", messages[language]);
  console.log("Resolved Translations Object:", t);
  console.log("Title:", t.title);
  console.log("Subtitle:", t.subtitle);
  console.log("Button Text:", t.buttonText);
  console.log('T', t)

  console.log()
  return (
    <>
      <BackgroundImage
        title={t.title}
        subtitle={t.subtitle}
        buttonText={t.buttonText}
        img={model}
      />
      <Layout>
        <section>
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
            img={homeModel2}
            order="first"
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
            img={homeModel3}
            order="last"
            link={t.buttonText}
          />
        </CustomSection>
      </Layout>
      <Layout>
        <CustomSection>
          <CategoryList
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
            contentText={t.servicesContent}
            img={homeWatch1}
            order="first"
            link={t.buttonText}
          />
        </CustomSection>
      </Layout>
      <Layout>
        <Testemonials />
      </Layout>
    </>
  );
};

export default Home;
