import React, { useCallback, useMemo } from "react";
import { Menu, MenuSelectEvent } from "@progress/kendo-react-layout";
import { Button } from "@progress/kendo-react-buttons";
import { SvgIcon } from "@progress/kendo-react-common";
import {
  InputPrefix,
  InputSeparator,
  TextBox,
  Switch,
} from "@progress/kendo-react-inputs";
import { AppBar, AppBarSection } from "@progress/kendo-react-layout";
import {
  searchIcon,
  userIcon,
  cartIcon,
} from "@progress/kendo-svg-icons";
import { isAdmin } from "../helpers/adminStore";
import { useStore } from "@nanostores/react";
import {
  loadMessages,
  LocalizationProvider,
} from "@progress/kendo-react-intl";

import enMessages from "../data/messages/en";
import frMessages from "../data/messages/fr";
import esMessages from "../data/messages/es";

import { selectedLanguage } from "../helpers/languageStore";

const languages = {
  en: enMessages,
  fr: frMessages,
  es: esMessages,
};

Object.keys(languages).forEach((lang) => {
  loadMessages(languages[lang], lang);
});

const Header: React.FC = () => {
  const isAdminValue = useStore(isAdmin);
  const language = useStore(selectedLanguage); 

  const t = languages[language] || languages["en"] || {};

  console.log("Header - Current Language:", language);
  console.log("Header - Translations (t):", t);
  console.log("Header - t.menuHome:", t.menuHome);

  const handleLanguageMenuSelect = useCallback(
    (event: MenuSelectEvent) => {
      const selectedLangCode = event.item.code;
      if (selectedLangCode && languages[selectedLangCode]) {
        selectedLanguage.set(selectedLangCode);
      }
    },
    []
  );

  const handleMenuSelect = (event: MenuSelectEvent) => {
    const selectedItem = event.item;

    if (selectedItem.url) {
      window.location.href = selectedItem.url;
      return;
    }

    if (selectedItem.category) {
      const category = selectedItem.category;
      if (category === "All") {
        window.location.href = `/products`;
      } else {
        window.location.href = `/products?category=${encodeURIComponent(
          category
        )}`;
      }
    }
  };

  const items = useMemo(
    () => [
      {
        text: t.menuHome,
        url: "/",
      },
      {
        text: t.menuJewelry,
        items: [
          { text: t.menuBracelets, category: "Bracelets" },
          { text: t.menuRings, category: "Rings" },
          { text: t.menuEarrings, category: "Earrings" },
          { text: t.menuWatches, category: "Watches" },
          { text: t.menuAll, category: "All" },
        ],
      },
      {
        text: t.menuContacts,
        url: "/contacts",
      },
    ],
    [t]
  );

  const languageItems = useMemo(
    () => [
      {
        text: t.languageMenuTitle || "Language",
        items: [
          { text: t.languageEnglish || "English", code: "en" },
          { text: t.languageFrench || "French", code: "fr" },
          { text: t.languageSpanish || "Spanish", code: "es" },
        ],
      },
    ],
    [t]
  );

  const handleCartClick = () => {
    window.location.href = "/shoppingcart";
  };

  const handleSwitchChange = () => {
    isAdmin.set(!isAdminValue);
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
          <Menu items={items} onSelect={handleMenuSelect} />
        </AppBarSection>
        <AppBarSection className="k-flex-basis-0 k-flex-grow k-justify-content-end k-gap-1.5">
          <TextBox
            placeholder={t.searchPlaceholder || "Search"}
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
            className="switch-width"
          />
          <Menu items={languageItems} onSelect={handleLanguageMenuSelect} />
        </AppBarSection>
      </AppBar>
    </LocalizationProvider>
  );
};

export default Header;
