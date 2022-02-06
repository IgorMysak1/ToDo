import React, { useState, useEffect, useRef } from "react";

export const AppContext = React.createContext({});

export const AppProvider = ({ children }) => {
  const [dataOfCategories, setDataOfCategories] = useState({
    All: [],
  });
  const [activeCategory, setActiveCategory] = useState("All");
  const [allCategories, setAllCategories] = useState(["All"]);
  const [categoryInOptions, setCategoryInOptions] = useState([]);

  let dataOfCategoriesFromStorage = JSON.parse(
    localStorage.getItem("dataOfCategories")
  );
  let allCategoriesFromStorage = JSON.parse(
    localStorage.getItem("allCategories")
  );
  useEffect(() => {
    if (dataOfCategoriesFromStorage == null) {
      localStorage.setItem("dataOfCategories", JSON.stringify({ All: [] }));
      localStorage.setItem("allCategories", JSON.stringify(["All"]));
      setActiveCategory("All");
    } else {
      setDataOfCategories({ ...dataOfCategoriesFromStorage });
      setAllCategories([...allCategoriesFromStorage]);
      setActiveCategory(allCategoriesFromStorage[0]);
    }
  }, []);
  const deleteCurrCategoryFromCategories = (nameCategory) =>
    allCategories.filter((name) => name !== nameCategory);
  useEffect(() => {
    setCategoryInOptions([...deleteCurrCategoryFromCategories(activeCategory)]);
  }, [allCategories]);

  const enterTaskInput = useRef(null);
  return (
    <AppContext.Provider
      value={{
        dataOfCategories,
        setDataOfCategories,
        activeCategory,
        setActiveCategory,
        allCategories,
        setAllCategories,
        categoryInOptions,
        setCategoryInOptions,
        enterTaskInput,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
