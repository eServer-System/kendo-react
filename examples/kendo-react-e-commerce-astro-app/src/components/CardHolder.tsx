import { TextBox } from '@progress/kendo-react-inputs';
import { useStore } from '@nanostores/react';
import { selectedLanguage } from '../helpers/languageStore';
import {
  loadMessages,
  LocalizationProvider,
} from '@progress/kendo-react-intl';
import messages from '../data/messages';

loadMessages(messages['en'], 'en');
loadMessages(messages['fr'], 'fr');
loadMessages(messages['es'], 'es');

const CardHolder = () => {
  const language = useStore(selectedLanguage);
  const t = messages[language] || messages['en'];

  return (
    <LocalizationProvider language={language}>
      <TextBox placeholder={t.fullNamePlaceholder} />
    </LocalizationProvider>
  );
};

export default CardHolder;
