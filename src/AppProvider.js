import React, { useState, useEffect, useRef } from "react";
import {
  deleteCurrCategoryFromCategories,
  getLocalStorage,
  setLocalStorage,
} from "./utilits/functions";
export const AppContext = React.createContext({});

export const AppProvider = ({ children }) => {
  const [dataOfCategories, setDataOfCategories] = useState({
    All: [],
  });
  const [activeCategory, setActiveCategory] = useState("All");
  const [allCategories, setAllCategories] = useState(["All"]);
  const [categoryInOptions, setCategoryInOptions] = useState([]);

  let dataOfCategoriesFromStorage = getLocalStorage("dataOfCategories");
  let allCategoriesFromStorage = getLocalStorage("allCategories");
  useEffect(() => {
    if (dataOfCategoriesFromStorage == null) {
      setLocalStorage("dataOfCategories", { All: [] });
      setLocalStorage("allCategories", ["All"]);
      setActiveCategory("All");
    } else {
      setDataOfCategories({ ...dataOfCategoriesFromStorage });
      setAllCategories([...allCategoriesFromStorage]);
      setActiveCategory(allCategoriesFromStorage[0]);
    }
  }, []);

  useEffect(() => {
    setCategoryInOptions([
      ...deleteCurrCategoryFromCategories(activeCategory, allCategories),
    ]);
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
