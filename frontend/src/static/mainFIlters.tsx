export const mainFilters = [
  {
    id: 1,
    forLoggedUser: false,
    type: 'Cost',
    values: ['Free', 'Low cost', 'High cost']
  },
  {
    id: 2,
    forLoggedUser: false,
    type: 'Seasonal',
    values: ['Winter', 'Summer', 'Spring', 'Autumn', 'Full year', 'Seasonal']
  },
  {
    id: 3,
    forLoggedUser: true,
    type: 'Personal',
    values: ['Visited', 'Favorites', 'Personal']
  }
];
