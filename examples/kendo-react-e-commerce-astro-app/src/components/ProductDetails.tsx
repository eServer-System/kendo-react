import React from 'react';
import { ProductCard } from '../components/ProductCard';
import { Layout } from '../components/Layout';
import { CategoryList } from '../components/CategoryList';
import { CustomSection } from '../components/CustomizedSection';
import { ListDataDescriptor, CardDescriptor } from '../data/types';

import { useStore } from '@nanostores/react';
import { selectedLanguage } from '../helpers/languageStore';
import { loadMessages, LocalizationProvider } from '@progress/kendo-react-intl';
import messages from '../data/messages';

loadMessages(messages['en'], 'en');
loadMessages(messages['fr'], 'fr');
loadMessages(messages['es'], 'es');

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
      collectionText: t.handmadePinkDiamondRing,
    },
    {
      img: '/diamondRingPinkRuby.jpg',
      collectionText: t.diamondRingWithPinkRuby,
    },
    {
      img: '/whiteSandDiamondRing.jpg',
      collectionText: t.whiteSandDiamondRing,
    },
  ];

  return (
    <LocalizationProvider language={language}>
      <>
        <Layout>
          <ProductCard
            title={product.title}
            image={product.img}
            subtitle={t.productSubtitle}
            breadCrumbItem={[
              { text: t.breadcrumbHome },
              { text: t.breadcrumbJewelry },
              { text: t.categories[product.category] || product.category },
            ]}
            rating={product.rating}
            reviews={t.reviewsText.replace('{0}', '208')}
            price={product.newPrice}
            description={t.productDescription}
            addToCart={handleAddToCart}
          />
        </Layout>
        <Layout>
          <CustomSection>
            <CategoryList
              title={t.youMayAlsoLikeTitle}
              subtitle={t.youMayAlsoLikeSubtitle}
              data={data}
            />
          </CustomSection>
        </Layout>
      </>
    </LocalizationProvider>
  );
};

export default ProductDetails;
