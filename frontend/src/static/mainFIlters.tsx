export const createLocalizationMainFilters = (t: any) => {
  const localizationMainFilters = [
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
        t('mainFilters.personalValues.visited'),
        t('mainFilters.personalValues.favorites'),
        t('mainFilters.personalValues.personal')
      ]
    }
  ];
  return localizationMainFilters;
};

export const mainFilters = [
  {
    id: 1,
    forLoggedUser: false,
    type: 'Cost',
    values: ['free', 'low cost', 'high cost']
  },
  {
    id: 2,
    forLoggedUser: false,
    type: 'Seasonal',
    values: ['winter', 'summer', 'spring', 'autumn', 'full year', 'seasonal']
  },
  {
    id: 3,
    forLoggedUser: true,
    type: 'Personal',
    values: ['visited', 'favorites', 'personal']
  }
];

export const getFiltersForUser = () =>
  mainFilters.reduce(
    (prev, current) =>
      current.forLoggedUser ? prev : [...prev, ...current.values],
    [] as string[]
  );

export const mainFiltersUa = [
  {
    id: 1,
    forLoggedUser: false,
    type: 'Cost',
    values: ['безкоштовно', 'низька вартість', 'висока вартість']
  },
  {
    id: 2,
    forLoggedUser: false,
    type: 'Seasonal',
    values: ['зима', 'літо', 'весна', 'осінь', 'цілий рік', 'сезоно']
  },
  {
    id: 3,
    forLoggedUser: true,
    type: 'Personal',
    values: ['відвідані', 'улюблені', 'персональні']
  }
];
// eslint-disable-next-line arrow-body-style
export const createSubscriptionsTranslation = (t: any) => {
  return t('mainFilters.subscriptions');
};
