import React, { useState } from "react";
import { Button } from "../components/Button";
import { AppContext } from "../AppProvider";
import { setLocalStorage } from "../utilits/functions";
import "../styles/task.scss";

export const Task = ({ nameCategory }) => {
  const { dataOfCategories, setDataOfCategories } =
    React.useContext(AppContext);

  const [everyTasksState, setEveryTasksState] = useState([]);

  const updateNumOfElemInState = () => {
    setEveryTasksState(
      new Array(dataOfCategories[nameCategory].length).fill({
        name: "",
        link: "",
        state: false,
      })
    );
  };

  const changeStateTask = (nameTask, linkTask, currentIndex, stateTask) =>
    everyTasksState.map((task, index) =>
      currentIndex === index
        ? {
            name: nameTask,
            link: linkTask,
            state: stateTask,
          }
        : task
    );

  const deleteTask = (currentIndex) => {
    const arr = dataOfCategories[nameCategory].filter((task, index) =>
      currentIndex !== index ? task : null
    );
    //
    const objData = { ...dataOfCategories, [nameCategory]: arr };
    setDataOfCategories(objData);
    //
    setEveryTasksState(arr);
    setLocalStorage("dataOfCategories", objData);
  };

  const confirmChangedTask = (currentIndex) => {
    const arr = dataOfCategories[nameCategory].map((task, index) =>
      currentIndex === index
        ? {
            name: everyTasksState[currentIndex].name,
            link: everyTasksState[currentIndex].link,
          }
        : task
    );
    setEveryTasksState(
      changeStateTask(
        everyTasksState[currentIndex].name,
        everyTasksState[currentIndex].link,
        currentIndex,
        false
      )
    );
    //
    const objData = {
      ...dataOfCategories,
      [nameCategory]: arr,
    };
    setDataOfCategories(objData);
    setLocalStorage("dataOfCategories", objData);
  };
  return (
    <div className="tasks">
      {dataOfCategories[nameCategory].length !== everyTasksState.length
        ? updateNumOfElemInState()
        : dataOfCategories[nameCategory].map((item, index) => {
            return (
              <div
                key={item.name}
                className={
                  everyTasksState[index].state ? "task task-active" : "task"
                }
              >
                <div
                  className={
                    everyTasksState[index].state
                      ? "taskVisible taskVisible-active"
                      : "taskVisible"
                  }
                >
                  {everyTasksState[index].state ? (
                    <input
                      autoFocus
                      className="editName"
                      value={everyTasksState[index].name}
                      onKeyPress={(e) =>
                        e.key === "Enter" && confirmChangedTask(index)
                      }
                      onChange={(e) =>
                        setEveryTasksState([
                          ...changeStateTask(
                            e.target.value,
                            everyTasksState[index].link,
                            index,
                            true
                          ),
                        ])
                      }
                    />
                  ) : item.link ? (
                    <a
                      href={everyTasksState[index].link || item.link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {item.name}
                    </a>
                  ) : (
                    <span>{item.name}</span>
                  )}

                  <div className="taskBtns">
                    {everyTasksState[index].state ? (
                      <Button
                        handlerClick={() => confirmChangedTask(index)}
                        img={"img/tick.svg"}
                      />
                    ) : (
                      <Button
                        handlerClick={() =>
                          setEveryTasksState([
                            ...changeStateTask(
                              item.name,
                              item.link,
                              index,
                              true
                            ),
                          ])
                        }
                        img={"img/edit.svg"}
                      />
                    )}

                    <Button
                      handlerClick={() => deleteTask(index)}
                      img={"img/basket.svg"}
                      bg={"#BD2F2F"}
                    />
                  </div>
                </div>
                <div
                  className={
                    everyTasksState[index].state
                      ? "taskUnVisible taskUnVisible-active"
                      : "taskUnVisible"
                  }
                >
                  <input
                    className="editLink"
                    type="text"
                    value={everyTasksState[index].link}
                    onChange={(e) =>
                      setEveryTasksState([
                        ...changeStateTask(
                          everyTasksState[index].name,
                          e.target.value,
                          index,
                          true
                        ),
                      ])
                    }
                    onKeyPress={(e) =>
                      e.key === "Enter" && confirmChangedTask(index)
                    }
                  />
                </div>
              </div>
            );
          })}
    </div>
  );
};
