import * as React from "react";
import { Layout } from "../components/Layout";
import { OrderedImgText } from "../components/OrderedImageCard";
import { CustomSection } from "../components/CustomizedSection";
import { listData } from "../data/listData";
import { FilterComponent } from "../components/FilterComponent";
import { CardsList } from "../components/CardsList";
import { CategoryList } from "../components/CategoryList";
import { CardDescriptor } from "../data/types";
import { DataModel } from "../data/types";

import { Breadcrumb } from "@progress/kendo-react-layout";
import { Button, ButtonGroup } from "@progress/kendo-react-buttons";
import { layout2By2Icon, gridLayoutIcon } from "@progress/kendo-svg-icons";
import { process, State } from "@progress/kendo-data-query";

import { useStore } from '@nanostores/react';
import { selectedLanguage } from '../helpers/languageStore';
import { loadMessages, LocalizationProvider } from '@progress/kendo-react-intl';
import messages from '../data/messages';

loadMessages(messages['en'], 'en');
loadMessages(messages['fr'], 'fr');
loadMessages(messages['es'], 'es');

export const AllProductsListView = () => {
  const language = useStore(selectedLanguage);
  const t = messages[language] || messages['en'];

  const title = t.allProductsTitle;
  const subtitle = t.allProductsSubtitle;
  const contentText = t.allProductsContentText;
  const order = "first";

  const [data, setData] = React.useState(listData);

  const updateUI = (newState: State) => {
    const newData = process(listData, newState);
    setData(newData.data);
  };

  const cards: CardDescriptor[] = [
    {
      img: "/necklace_1.jfif",
      collectionText: t.collectionSerene,
    },
    {
      img: "/ring_1.jfif",
      collectionText: t.collectionAurelia,
    },
    {
      img: "/1111.jfif",
      collectionText: t.collectionRavina,
    },
  ];

  const BreakcrumbData: DataModel[] = [
    { text: t.breadcrumbHome },
    { text: t.breadcrumbJewelry },
  ];

  return (
    <LocalizationProvider language={language}>
      <>
        <Layout>
          <section
            className="k-d-grid k-grid-cols-12 k-justify-content-center k-align-items-center k-col-span-12"
            style={{
              paddingTop: "60px",
            }}
          >
            <OrderedImgText
              title={title}
              subtitle={subtitle}
              contentText={contentText}
              img="/bracelets.png"
              order={order}
              link={null}
            />
          </section>
        </Layout>
        <Layout>
          <CustomSection>
            <CategoryList
              title={t.ourCollectionsTitle}
              subtitle={t.ourCollectionsSubtitle}
              data={cards}
            />
          </CustomSection>
        </Layout>
        <Layout>
          <section className="k-d-flex k-justify-content-between">
            <Breadcrumb data={BreakcrumbData} />
            <ButtonGroup>
              <Button fillMode={"flat"} svgIcon={gridLayoutIcon} />
              <Button fillMode={"flat"} svgIcon={layout2By2Icon} />
            </ButtonGroup>
          </section>
        </Layout>
        <Layout>
          <FilterComponent updateUI={updateUI} />
        </Layout>
        <Layout>
          <CardsList data={data} />
        </Layout>
      </>
    </LocalizationProvider>
  );
};

export default AllProductsListView;
