import React, { useState, useEffect } from "react";
import { Button } from "../components/Button";
import { Task } from "../components/Task";
import { AppContext } from "../AppProvider";
import {
  deleteCurrCategoryFromCategories,
  setLocalStorage,
} from "../utilits/functions";
import "../styles/categoryList.scss";

export const CategoryList = () => {
  const {
    dataOfCategories,
    setDataOfCategories,
    activeCategory,
    setActiveCategory,
    allCategories,
    setAllCategories,
    setCategoryInOptions,
    enterTaskInput,
  } = React.useContext(AppContext);

  const [listCategories, setListCategories] = useState([]);

  const focusOnEnterTask = (currentCategory) => {
    setCategoryInOptions(
      deleteCurrCategoryFromCategories(currentCategory, allCategories)
    );
    setActiveCategory(currentCategory);
    enterTaskInput.current.focus();
  };
  const deleteCategory = (currentCategory, e) => {
    if (currentCategory === allCategories[0]) {
      e.target.closest(".button").classList.add("invalid");
      setTimeout(() => {
        e.target.closest(".button").classList.remove("invalid");
      }, 1500);
      return;
    }
    if (activeCategory === currentCategory) setActiveCategory(allCategories[0]);
    //
    setAllCategories(
      deleteCurrCategoryFromCategories(currentCategory, allCategories)
    );
    setLocalStorage(
      "allCategories",
      deleteCurrCategoryFromCategories(currentCategory, allCategories)
    );
    //
    const obj = { ...dataOfCategories };
    delete obj[currentCategory];
    setDataOfCategories({ ...obj });
    localStorage.setItem("dataOfCategories", JSON.stringify({ ...obj }));
    localStorage.setItem("activeCategory", JSON.stringify(allCategories[0]));
  };
  const changeStateCategory = (indexCat, stateCat, valueCat) =>
    listCategories.map((taskState, taskIndex) =>
      taskIndex === indexCat
        ? {
            value: valueCat,
            state: stateCat,
          }
        : taskState
    );

  const confirmChangedCategory = (currIndex, currentCategory) => {
    if (listCategories[currIndex] === "") {
      console.log("*_*");
      return;
    }
    //
    const finallyValue = listCategories[currIndex].value || currentCategory;
    if (currentCategory === finallyValue) {
      setListCategories(changeStateCategory(currIndex, false, currentCategory));
      return;
    }
    //
    const arr = allCategories.map((category, index) =>
      currIndex === index ? finallyValue : category
    );
    setAllCategories(arr);
    setLocalStorage("allCategories", arr);
    //
    const updateObj = { ...dataOfCategories };
    updateObj[finallyValue] = updateObj[currentCategory];
    delete updateObj[currentCategory];
    setDataOfCategories(updateObj);
    setLocalStorage("dataOfCategories", updateObj);
    //
    setActiveCategory(finallyValue);
    setListCategories([...changeStateCategory(currIndex, false, finallyValue)]);
  };
  useEffect(() => {
    setListCategories(
      new Array(allCategories.length).fill({
        value: "",
        state: false,
      })
    );
  }, [allCategories]);
  return (
    <div className="categoryList">
      {allCategories.map((category, index) => {
        return (
          <div key={category} className="nameCategory">
            {!!listCategories?.at(index)?.state ? (
              <div className="titleCategory titleCategory-active">
                <input
                  type="text"
                  value={listCategories[index].value}
                  onKeyPress={(e) =>
                    e.key === "Enter" && confirmChangedCategory(index, category)
                  }
                  autoFocus
                  onChange={(e) =>
                    setListCategories([
                      ...changeStateCategory(index, true, e.target.value),
                    ])
                  }
                />
                <Button
                  handlerClick={() => confirmChangedCategory(index, category)}
                  img={"img/tick.svg"}
                />
                <Button
                  handlerClick={(e) => deleteCategory(e, category)}
                  img={"img/basket.svg"}
                />
              </div>
            ) : (
              <div className="titleCategory">
                <p>{category}</p>
                <img
                  onClick={() =>
                    setListCategories([
                      ...changeStateCategory(
                        index,
                        true,
                        listCategories[index].value || category
                      ),
                    ])
                  }
                  src="img/dots.svg"
                  alt="..."
                />
              </div>
            )}

            {Object.keys(dataOfCategories[category]).length ? (
              <Task nameCategory={category} />
            ) : (
              <div className="noTasks">
                <div className="noTasksText">
                  <span>Oooops....</span>
                  <span>There are so empty</span>
                </div>
                <div className="noTasksBtns">
                  <Button
                    handlerClick={() => focusOnEnterTask(category)}
                    img={"img/enterTask.svg"}
                  />
                  <Button
                    handlerClick={(e) => deleteCategory(category, e)}
                    img={"img/basket.svg"}
                  />
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
