import React, { useEffect, useState } from 'react';
import { MultiSelect, DropDownList } from '@progress/kendo-react-dropdowns';
import { SvgIcon } from '@progress/kendo-react-common';
import { filterIcon, sortAscIcon } from '@progress/kendo-svg-icons';
import { FilterDescriptor, SortDescriptor, State } from '@progress/kendo-data-query';

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

interface FilterComponentProps {
  updateUI: (state: State) => void;
}

export const FilterComponent: React.FC<FilterComponentProps> = ({ updateUI }) => {
  const language = useStore(selectedLanguage);
  const t = messages[language] || messages['en'];

  const [categoryValue, setCategoryValue] = useState<string[]>([]);
  const [statusValue, setStatusValue] = useState<string>(t.statusesData[0]);
  const [materialValue, setMaterialValue] = useState<string>(t.materialPlaceholder);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');

    if (category && category !== t.menuAll) {
      setCategoryValue([category]);
      applyCategoryFilter([category]);
    } else {
      setCategoryValue([]);
      applyCategoryFilter([]);
    }
  }, [t.menuAll]);

  const applyCategoryFilter = (categories: string[]) => {
    if (categories.length === 0) {
      updateUI({ filter: undefined, sort: undefined });
      return;
    }

    const filters = categories.map((category) => ({
      field: 'category',
      operator: 'eq',
      value: category,
    }));

    const customCompositeFilters: State = {
      filter: {
        logic: 'or',
        filters,
      },
      sort: undefined,
    };

    updateUI(customCompositeFilters);
  };

  const onCategoryChange = (e: any) => {
    setCategoryValue(e.value);
    applyCategoryFilter(e.value);
  };

  const onStatusChange = (e: any) => {
    setStatusValue(e.value);

    const newSorts: SortDescriptor[] = [
      {
        field: 'status',
        dir: 'desc',
      },
    ];

    const customCompositeFilters: State = {
      filter: undefined,
      sort: newSorts,
    };

    updateUI(customCompositeFilters);
  };

  const onMaterialChange = (e: any) => {
    setMaterialValue(e.value);

    const newFilter: FilterDescriptor[] = [
      {
        field: 'material',
        operator: 'eq',
        value: e.value,
      },
    ];

    const customCompositeFilters: State = {
      filter: {
        logic: 'or',
        filters: newFilter,
      },
      sort: undefined,
    };

    updateUI(customCompositeFilters);
    setCategoryValue([]);
  };

  const clearFilters = () => {
    setCategoryValue([]);
    setStatusValue(t.statusesData[0]);
    setMaterialValue(t.materialPlaceholder);
    updateUI({ filter: undefined, sort: undefined });
  };

  return (
    <LocalizationProvider language={language}>
      <section className="k-d-flex k-justify-content-between k-align-items-center">
        <span className="k-d-flex k-align-items-center">
          <span className="k-d-flex k-align-items-center k-pr-2">
            <SvgIcon icon={filterIcon} /> {t.filterLabel}
          </span>
          <span className="k-pr-2">
            <MultiSelect
              data={t.categoriesData}
              value={categoryValue}
              placeholder={t.categoryPlaceholder}
              onChange={onCategoryChange}
              style={{ minWidth: '119px' }}
            />
          </span>
          <span className="k-pr-2">
            <DropDownList
              value={materialValue}
              data={[t.materialPlaceholder, ...t.materialsData]}
              onChange={onMaterialChange}
            />
          </span>
        </span>
        <span className="k-d-flex k-align-items-center">
          <span className="k-d-flex k-align-items-center k-pr-2">
            <SvgIcon icon={sortAscIcon} /> {t.sortByLabel}
          </span>
          <span>
            <DropDownList
              data={t.statusesData}
              value={statusValue}
              onChange={onStatusChange}
            />
          </span>
        </span>
        <button className="k-button k-button-flat" onClick={clearFilters}>
          {t.clearFiltersButton}
        </button>
      </section>
    </LocalizationProvider>
  );
};
