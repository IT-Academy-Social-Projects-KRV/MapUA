import { useTranslation } from 'react-i18next';

export const filters = () => {
  const { t } = useTranslation();
  const arr = [
    {
      id: 1,
      forLoggedUser: false,
      type: t('mainFilters.cost'),
      values: [
        t('mainFilters.costValues.free'),
        t('mainFilters.costValues.lowCost'),
        t('mainFilters.costValues.highCost')
      ]
    },
    {
      id: 2,
      forLoggedUser: false,
      type: t('mainFilters.seasonal'),
      values: [
        t('mainFilters.seasonalValues.winter'),
        t('mainFilters.seasonalValues.summer'),
        t('mainFilters.seasonalValues.spring'),
        t('mainFilters.seasonalValues.autumn'),
        t('mainFilters.seasonalValues.fullYear'),
        t('mainFilters.seasonalValues.seasonal')
      ]
    },

    {
      id: 3,
      forLoggedUser: true,
      type: t('mainFilters.personal'),
      values: [
        t('mainFilters.personslValues.visited'),
        t('mainFilters.personslValues.favorites'),
        t('mainFilters.personslValues.personal')
      ]
    }
  ];
  return arr;
};
