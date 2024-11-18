import { Avatar } from '@progress/kendo-react-layout';
import { Rating } from '@progress/kendo-react-inputs';
import { useStore } from '@nanostores/react';
import { selectedLanguage } from '../helpers/languageStore';
import { loadMessages, LocalizationProvider } from '@progress/kendo-react-intl';
import messages from '../data/messages';

loadMessages(messages['en'], 'en');
loadMessages(messages['fr'], 'fr');
loadMessages(messages['es'], 'es');

export const Testemonials = () => {
  const language = useStore(selectedLanguage);
  const t = messages[language] || messages['en']; 

  return (
    <LocalizationProvider language={language}>
      <div className="k-d-flex k-flex-col k-align-items-center k-py-12 k-px-10 k-mx-auto">
        <div className="k-d-flex k-flex-col k-align-items-center k-gap-4 k-mb-10">
          <h2 className="k-h2">{t.testimonialsTitle}</h2>
          <p className="k-font-size-xl k-color-subtle">
            {t.testimonialsSubtitle}
          </p>
        </div>
        <div className="k-d-grid k-grid-cols-3 k-gap-5 k-mb-6">
          {t.testimonialsData.map((item: any, index: number) => (
            <div
              key={index}
              className="k-d-flex k-flex-col k-border-solid k-border k-bg-surface k-bg-app-surface k-rounded-lg k-border-border"
            >
              <div className="k-d-grid k-grid-cols-3 k-justify-items-center k-px-4 k-py-3 k-gap-y-3">
                <div className="k-col-start-1 k-col-end-4 k-d-grid k-grid-cols-3 k-justify-items-center k-w-full">
                  <Avatar
                    themeColor="primary"
                    size="large"
                    className="k-col-start-2 k-col-end-3"
                    type="image"
                  >
                    <img src={item.image} className="k-bg-cover" alt={item.name} />
                  </Avatar>
                </div>
                <p className="k-paragraph k-col-start-1 k-col-end-4">{item.name}</p>
                <Rating
                  value={item.rating}
                  precision="half"
                  className="k-col-start-1 k-col-end-4"
                />
              </div>
              <div className="k-p-4">
                <p className="k-paragraph">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </LocalizationProvider>
  );
};
