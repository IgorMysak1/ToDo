import React, { useState, useRef, useEffect } from "react";
import { AppContext } from "../AppProvider";
import "../styles/header.scss";

export const Header = () => {
  const {
    dataOfCategories,
    setDataOfCategories,
    activeCategory,
    setActiveCategory,
    allCategories,
    setAllCategories,
    categoryInOptions,
    setCategoryInOptions,
    enterTaskInput,
  } = React.useContext(AppContext);

  const [selectOpen, setSelectOpen] = useState(false);
  const [addLinkOpen, setAddLinkOpen] = useState(true);

  const [allInputs, setAllInputs] = useState({
    сategory: "",
    task: "",
    link: "",
  });

  const addLinkInp = useRef(null);
  const categoryInp = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      setAddLinkOpen(false);
    }, 3000);
  }, []);

  const deleteCurrCategoryFromCategories = (nameCategory) =>
    allCategories.filter((name) => name !== nameCategory);

  const createCategory = (e) => {
    if (allCategories.includes(e.target.value) || e.target.value === "") {
      invalidValue(e.target);
      return;
    }

    setDataOfCategories({ ...dataOfCategories, [e.target.value]: [] });
    localStorage.setItem(
      "dataOfCategories",
      JSON.stringify({ ...dataOfCategories, [e.target.value]: [] })
    );

    setCategoryInOptions([
      ...deleteCurrCategoryFromCategories(activeCategory),
      e.target.value,
    ]);
    setAllCategories([...allCategories, e.target.value]);
    localStorage.setItem(
      "allCategories",
      JSON.stringify([...allCategories, e.target.value])
    );

    setAllInputs({ ...allInputs, сategory: "" });
  };
  const chooseOption = (nameCategory) => {
    setActiveCategory(nameCategory);
    setCategoryInOptions([...deleteCurrCategoryFromCategories(nameCategory)]);
    setSelectOpen(false);
    enterTaskInput.current.focus();
  };
  const saveNewTask = () => {
    if (allInputs.task === "") {
      invalidValue(document.querySelector(".addTask"));
      return;
    }

    setDataOfCategories({
      ...dataOfCategories,
      [activeCategory]: [
        ...dataOfCategories[activeCategory],
        { name: allInputs.task, link: allInputs.link },
      ],
    });

    localStorage.setItem(
      "dataOfCategories",
      JSON.stringify({
        ...dataOfCategories,
        [activeCategory]: [
          ...dataOfCategories[activeCategory],
          { name: allInputs.task, link: allInputs.link },
        ],
      })
    );
    setAllInputs({ ...allInputs, task: "", link: "" });
    enterTaskInput.current.focus();
  };
  const invalidValue = (e) => {
    e.style.animation = "move 1s";
    setTimeout(() => {
      e.style.animation = "";
    }, 2000);
  };
  return (
    <div className="header">
      <div className="title">
        T <span>o</span> Do
      </div>
      <div className="inp">
        <input
          ref={enterTaskInput}
          onClick={() => setSelectOpen(false)}
          onKeyPress={(e) => e.key === "Enter" && saveNewTask()}
          className="addTask"
          placeholder="Enter task"
          value={allInputs.task}
          onChange={(e) => setAllInputs({ ...allInputs, task: e.target.value })}
        />
        <div className="link">
          <div
            onClick={() => {
              setAddLinkOpen(!addLinkOpen);
              addLinkOpen
                ? enterTaskInput.current.focus()
                : addLinkInp.current.focus();
            }}
            className="linkBtn"
          >
            add
            <img src="img/linkAdd.svg" alt="Link" />
          </div>
          <div
            className={addLinkOpen ? "linkInput" : "linkInput linkInput-open"}
          >
            <input
              onKeyPress={(e) => e.key === "Enter" && saveNewTask()}
              value={allInputs.link}
              ref={addLinkInp}
              placeholder="Paste link"
              onChange={(e) =>
                setAllInputs({ ...allInputs, link: e.target.value })
              }
              type="text"
            />
            <div onClick={saveNewTask} className="linkAdd">
              Add
            </div>
          </div>
        </div>
        <div className="select">
          <div
            onClick={() => {
              setSelectOpen(!selectOpen);
              categoryInp.current.focus();
            }}
            className={selectOpen ? "option option-rounded" : "option"}
          >
            <p className="optionText">{activeCategory}</p>
            <img
              style={selectOpen ? { transform: "rotate(270deg)" } : {}}
              src="img/arrowSelect.svg"
              alt="Arr"
            />
          </div>
          <div className={selectOpen ? "options options-active" : "options"}>
            {categoryInOptions.map((option) => {
              return (
                <div
                  key={option}
                  onClick={() => chooseOption(option)}
                  className="option"
                >
                  <p className="optionText">{option}</p>
                </div>
              );
            })}
            <div className="option">
              <input
                onChange={(e) =>
                  setAllInputs({ ...allInputs, сategory: e.target.value })
                }
                value={allInputs.сategory}
                onKeyPress={(e) => e.key === "Enter" && createCategory(e)}
                className="addCategory"
                placeholder="Add category..."
                type="text"
                maxLength="30"
                ref={categoryInp}
              />
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};
