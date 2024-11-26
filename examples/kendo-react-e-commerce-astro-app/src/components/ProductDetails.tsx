import React from 'react';
import { ProductCard } from '../components/ProductCard';
import { Layout } from '../components/Layout';
import { CategoryList } from '../components/CategoryList';
import { CustomSection } from '../components/CustomizedSection';
import { ListDataDescriptor, CardDescriptor } from '../data/types';

import { useStore } from '@nanostores/react';
import { selectedLanguage } from '../helpers/languageStore';
import { loadMessages, LocalizationProvider } from '@progress/kendo-react-intl';

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

interface ProductDetailsProps {
  id: string;
  product: ListDataDescriptor;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const language = useStore(selectedLanguage);
  const t = messages[language] || messages['en'];

  const handleAddToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const updatedCart = [...existingCart, product];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.location.href = '/shoppingcart';
  };

  const data: CardDescriptor[] = [
    {
      img: '/homemadePinkDiamondRing.jpg',
      collectionTextKey: 'handmadePinkDiamondRing',
    },
    {
      img: '/diamondRingPinkRuby.jpg',
      collectionTextKey: 'diamondRingWithPinkRuby',
    },
    {
      img: '/whiteSandDiamondRing.jpg',
      collectionTextKey: 'whiteSandDiamondRing',
    },
  ];

  return (
    <LocalizationProvider language={language}>
      <>
        <Layout>
          <ProductCard
            title={t[product.titleKey] || product.title}
            image={product.img}
            subtitle={t.productSubtitle}
            breadCrumbItem={[
              { text: t.breadcrumbHome},
              { text: t.breadcrumbJewelry},
              { text: t.categories[product.categoryKey] || product.category },
            ]}
            rating={product.rating}
            reviews={t.reviewsText.replace('{0}', '208') || `${product.reviews} reviews`}
            price={product.newPrice}
            description={t[product.descriptionKey] || product.description}
            addToCart={handleAddToCart}
          />
        </Layout>
        <Layout>
          <CustomSection>
            <CategoryList
              title={t.youMayAlsoLikeTitle}
              subtitle={t.youMayAlsoLikeSubtitle}
              data={data.map((item) => ({
                ...item,
                collectionText: t[item.collectionTextKey] || item.collectionTextKey,
              }))}
            />
          </CustomSection>
        </Layout>
      </>
    </LocalizationProvider>
  );
};

export default ProductDetails;
