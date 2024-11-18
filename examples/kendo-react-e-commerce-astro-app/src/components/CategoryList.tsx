import React from 'react';
import { CategoryListProps } from "../data/types";
import { Button } from "@progress/kendo-react-buttons";
import { CardDescriptor } from "../data/types";
import { useStore } from '@nanostores/react';
import { selectedLanguage } from '../helpers/languageStore';
import { loadMessages, LocalizationProvider } from '@progress/kendo-react-intl';
import messages from '../data/messages';

loadMessages(messages['en'], 'en');
loadMessages(messages['fr'], 'fr');
loadMessages(messages['es'], 'es');

export const CategoryList: React.FC<CategoryListProps> = ({ data, title, subtitle, colSpan = 4 }) => {
    const language = useStore(selectedLanguage).substring(0, 2); // Normalize language code
    const t = messages[language] || messages['en'];

    console.log('Language:', language);
    console.log('Translations (t):', t);
    console.log('Buy Now Button Text:', t.buyNowButtonText);

    const onNavigate = (card: CardDescriptor) => {
        if (card.collectionText === `Collection \"AURELIA\"`) {
        }
    }

    return (
        <LocalizationProvider language={language}>
            <>
                <div className="k-h2 k-font-bold k-text-black k-col-span-12 k-text-center">
                    {title}
                </div>
                <div
                    className="k-font-size-xl k-p-5 k-col-span-12 k-text-center"
                    style={{
                        paddingBottom: "1rem",
                    }}
                >
                    {subtitle}
                </div>
                <div className="k-d-grid k-grid-cols-12 k-col-span-12 k-gap-5">
                    {data.map((card, index) => {
                        return (
                            <div key={index} className={`k-col-span-${colSpan} k-text-center`}>
                                <img
                                    height={"319px"}
                                    width={"100%"}
                                    style={{
                                        minWidth: "360px",
                                        paddingBottom: "1rem",
                                    }}
                                    src={card.img}
                                    alt={card.collectionText}
                                />
                                <span className="k-pt-md">
                                    {card.collectionText}
                                </span>
                                <div
                                    style={{
                                        paddingTop: "1rem",
                                    }}
                                >
                                    <Button themeColor={"primary"} size={"large"} onClick={() => onNavigate(card)}>
                                        {t.buyNowButtonText}
                                    </Button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </>
        </LocalizationProvider>
    );
};
