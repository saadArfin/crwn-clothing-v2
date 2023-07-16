import { createSelector } from "reselect";
//Through the use of this library we are doing caching.

const selectCategoryReducer = (state) => {
  console.log('selector 1');
  return state.categories;

}

export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories,
);



export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) => categories.reduce((acc, category) =>{//Here the transformation business logic of reducer should live. Rather than doing it in firebase.utils file. It's regarded as good practice but it could be kept there also.
    const {title, items} = category;
    acc[title.toLowerCase()] = items;
    return acc;
  }, {})
);

