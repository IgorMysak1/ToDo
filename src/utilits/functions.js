export const deleteCurrCategoryFromCategories = (nameCategory, allCategories) =>
  allCategories.filter((name) => name !== nameCategory);

export const getLocalStorage = (key) => JSON.parse(localStorage.getItem(key));

export const setLocalStorage = (key, value) =>
  localStorage.setItem(key, JSON.stringify(value));
