import React from "react";
import { useNavigate } from "react-router-dom";
import { Menu, MenuItemModel, MenuSelectEvent } from "@progress/kendo-react-layout";
import { Button } from "@progress/kendo-react-buttons";
import { SvgIcon } from "@progress/kendo-react-common";
import { InputPrefix, InputSeparator, TextBox, Switch } from "@progress/kendo-react-inputs";
import { searchIcon, userIcon, cartIcon } from "@progress/kendo-svg-icons";
import viloraLogo from "@/assets/vilora-logo.png";
import items from "../data/items";
import { AppBar, AppBarSection } from "@progress/kendo-react-layout";
import { useAdminContext } from "../helpers/AdminContext";
import { useCategoriesContext } from "../helpers/CategoriesContext";
import { useLanguageContext } from "../helpers/LanguageContext";

interface CustomMenuItemModel extends MenuItemModel {
  page?: string;
}

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { toggleRole } = useAdminContext();
  const { setSelectedCategory } = useCategoriesContext();
  const { language, setLanguage, t } = useLanguageContext();

  const handleCartClick = () => {
    navigate("/shoppingcart");
  };

  const handleSwitchChange = () => {
    toggleRole();
  };

  const handleMenuSelect = (event: MenuSelectEvent) => {
    const selectedItem: CustomMenuItemModel = event.item;

    if (selectedItem.id?.startsWith("lang-")) {
      const selectedLanguage = selectedItem.id.replace("lang-", ""); 
      setLanguage(selectedLanguage);
      console.log(`Language chosen: ${selectedLanguage}`);
      return;
    }

    if (selectedItem.page) {
      navigate(selectedItem.page);
      return;
    }

    const selectedCategory = selectedItem.text;
    if (selectedCategory === t.all) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(selectedCategory ?? null);
      navigate("/category");
    }
  };

  const translatedItems = items.map((item) => ({
    ...item,
    text: t[`menu${item.text}`] || item.text, 
    items: item.items?.map((subItem) => ({
      ...subItem,
      text: t[`menu${subItem.text}`] || subItem.text, 
    })),
  }));

  const languageMenu = [
    {
      text: t.languageMenuTitle, 
      items: [
        { text: t.languageEnglish, id: "lang-en" },
        { text: t.languageFrench, id: "lang-fr" },
        { text: t.languageSpanish, id: "lang-es" },
      ],
    },
  ];

  return (
    <AppBar themeColor="inherit">
      <AppBarSection
        className="k-flex-basis-0 k-flex-grow k-gap-2 k-align-items-center"
        style={{ paddingLeft: "50px" }}
      >
        <a href="#" className="k-d-sm-flex" style={{ marginRight: "50px" }}>
          <img src={viloraLogo} alt="Logo" />
        </a>
        <Menu items={translatedItems} onSelect={handleMenuSelect} />
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
        <Button svgIcon={cartIcon} fillMode="flat" className="k-ml-2" onClick={handleCartClick} />
        <Switch
          className="switch-width"
          onLabel={t.adminLabel}
          offLabel={t.clientLabel}
          onChange={handleSwitchChange}
        />
        <Menu items={languageMenu} onSelect={handleMenuSelect} />
      </AppBarSection>
    </AppBar>
  );
};

export default Header;
