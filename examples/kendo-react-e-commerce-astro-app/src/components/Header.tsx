import React from "react";
import { Menu, MenuSelectEvent } from "@progress/kendo-react-layout";
import { Button } from "@progress/kendo-react-buttons";
import { SvgIcon } from "@progress/kendo-react-common";
import {
  InputPrefix,
  InputSeparator,
  TextBox,
  Switch,
} from "@progress/kendo-react-inputs";
import { searchIcon, userIcon, cartIcon } from "@progress/kendo-svg-icons";
import { AppBar, AppBarSection } from "@progress/kendo-react-layout";
import { isAdmin } from "../helpers/adminStore";
import { selectedLanguage } from "../helpers/languageStore";
import { useStore } from "@nanostores/react";
import {
  loadMessages,
  LocalizationProvider,
} from "@progress/kendo-react-intl";
import messages from "../data/messages";

loadMessages(messages["en"], "en");
loadMessages(messages["fr"], "fr");
loadMessages(messages["es"], "es");

const Header: React.FC = () => {
  const isAdminValue = useStore(isAdmin);
  const language = useStore(selectedLanguage);
  const t = messages[language] || messages["en"];

  const items = [
    {
      text: t.menuHome,
      url: "/",
    },
    {
      text: t.menuJewelry,
      items: [
        { text: t.menuBracelets, url: "/jewelry/bracelets" },
        { text: t.menuRings, url: "/jewelry/rings" },
        { text: t.menuEarrings, url: "/jewelry/earrings" },
        { text: t.menuWatches, url: "/jewelry/watches" },
        { text: t.menuAll, url: "/jewelry/all" },
      ],
    },
    {
      text: t.menuContacts,
      url: "/contacts",
    },
  ];

  const languageItems = [
    {
      text: t.languageMenuTitle || "Language",
      items: [
        { text: t.languageEnglish, code: "en" },
        { text: t.languageFrench, code: "fr" },
        { text: t.languageSpanish, code: "es" },
      ],
    },
  ];

  const handleCartClick = () => {
    window.location.href = "/shoppingcart";
  };

  const handleSwitchChange = () => {
    isAdmin.set(!isAdminValue);
  };

  const handleLanguageMenuSelect = (event: MenuSelectEvent) => {
    const selectedLangCode = event.item.code;
    if (selectedLangCode) {
      selectedLanguage.set(selectedLangCode);
    }
  };

  return (
    <LocalizationProvider language={language}>
      <AppBar themeColor="inherit">
        <AppBarSection
          className="k-flex-basis-0 k-flex-grow k-gap-2 k-align-items-center"
          style={{ paddingLeft: "50px" }}
        >
          <a href="/" className="k-d-sm-flex" style={{ marginRight: "50px" }}>
            <img src="/vilora-logo.png" alt="Logo" />
          </a>
          <Menu items={items} />
        </AppBarSection>
        <AppBarSection className="k-flex-basis-0 k-flex-grow k-justify-content-end k-gap-1.5">
          <TextBox
            placeholder={t.searchPlaceholder}
            prefix={() => (
              <>
                <InputPrefix orientation="horizontal">
                  <span className="k-input-prefix-text">
                    <SvgIcon icon={searchIcon} size="medium" />
                  </span>
                </InputPrefix>
                <InputSeparator />
              </>
            )}
            style={{ width: 300 }}
          />
          <Button svgIcon={userIcon} fillMode="flat" className="k-ml-2" />
          <Button
            svgIcon={cartIcon}
            fillMode="flat"
            className="k-ml-2"
            onClick={handleCartClick}
          />
          <Switch
            onLabel={t.adminLabel}
            offLabel={t.clientLabel}
            checked={isAdminValue}
            onChange={handleSwitchChange}
          />
          <Menu items={languageItems} onSelect={handleLanguageMenuSelect} />
        </AppBarSection>
      </AppBar>
    </LocalizationProvider>
  );
};

export default Header;
