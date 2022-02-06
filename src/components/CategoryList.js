import React, { useState } from "react";
import { Button } from "../components/Button";
import { Task } from "../components/Task";
import { AppContext } from "../AppProvider";
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
  const [everyCatState, setEveryCatState] = useState([
    ...new Array(3).fill({
      value: "",
      state: false,
    }),
  ]);

  const deleteCurrCategoryFromCategories = (currentCategory) =>
    allCategories.filter((name) => name !== currentCategory);

  const updateNumOfElemInState = () => {
    setEveryCatState([
      ...new Array(allCategories.length).fill({
        value: "",
        state: false,
      }),
    ]);
  };
  const focusOnEnterTask = (currentCategory) => () => {
    setCategoryInOptions([
      ...deleteCurrCategoryFromCategories(currentCategory),
    ]);
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

    setAllCategories([...deleteCurrCategoryFromCategories(currentCategory)]);
    localStorage.setItem(
      "allCategories",
      JSON.stringify([...deleteCurrCategoryFromCategories(currentCategory)])
    );

    const obj = { ...dataOfCategories };
    delete obj[currentCategory];
    setDataOfCategories({ ...obj });
    localStorage.setItem("dataOfCategories", JSON.stringify({ ...obj }));

    localStorage.setItem("activeCategory", JSON.stringify(allCategories[0]));
  };
  const changeStateCategory = (indexCat, stateCat, valueCat) => {
    return everyCatState.map((taskState, taskIndex) =>
      taskIndex === indexCat
        ? {
            value: valueCat,
            state: stateCat,
          }
        : taskState
    );
  };
  const confirmChangedCategory = (currIndex, currentCategory) => {
    if (everyCatState[currIndex] === "") {
      console.log("Dupa");
      return;
    }
    const finallyValue = everyCatState[currIndex].value || currentCategory;
    if (currentCategory === finallyValue) {
      setEveryCatState([
        ...changeStateCategory(currIndex, false, currentCategory),
      ]);
      return;
    }
    const arr = allCategories.map((category, index) =>
      currIndex === index ? finallyValue : category
    );
    setAllCategories([...arr]);
    localStorage.setItem("allCategories", JSON.stringify(arr));

    const obj = { ...dataOfCategories };
    obj[everyCatState[currIndex].value] = obj[currentCategory];
    delete obj[currentCategory];
    setDataOfCategories({ ...obj });
    localStorage.setItem("dataOfCategories", JSON.stringify(obj));

    setActiveCategory(finallyValue);
    setEveryCatState([
      ...changeStateCategory(currIndex, false, everyCatState[currIndex].value),
    ]);
  };
  return (
    <div className="categoryList">
      {allCategories.map((category, index) => {
        return (
          <div key={category} className="nameCategory">
            {allCategories.length === everyCatState.length ? (
              everyCatState[index].state ? (
                <div className="titleCategory titleCategory-active">
                  <input
                    type="text"
                    value={everyCatState[index].value}
                    onKeyPress={(e) =>
                      e.key === "Enter" &&
                      confirmChangedCategory(index, category)
                    }
                    autoFocus
                    onChange={(e) =>
                      setEveryCatState([
                        ...changeStateCategory(index, true, e.target.value),
                      ])
                    }
                  />
                  <Button
                    handlerClick={() => confirmChangedCategory(index, category)}
                    img={"/img/tick.svg"}
                  />
                  <Button
                    handlerClick={(e) => deleteCategory(category, e)}
                    img={"/img/basket.svg"}
                  />
                </div>
              ) : (
                <div className="titleCategory">
                  <p>{category}</p>
                  <img
                    onClick={() =>
                      setEveryCatState([
                        ...changeStateCategory(
                          index,
                          true,
                          everyCatState[index].value || category
                        ),
                      ])
                    }
                    src="img/dots.svg"
                    alt="..."
                  />
                </div>
              )
            ) : (
              updateNumOfElemInState()
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
                    handlerClick={focusOnEnterTask(category)}
                    img={"/img/enterTask.svg"}
                  />
                  <Button
                    handlerClick={(e) => deleteCategory(category, e)}
                    img={"/img/basket.svg"}
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
