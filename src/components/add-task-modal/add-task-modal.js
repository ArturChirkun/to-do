import { useState, useContext, useEffect } from "react";
import Modal from "react-modal";
import "./add-task-modal.css";
import { CategoryList } from "../category-list/category-list";
import CustomButton from "../custom-buttom/custom-button";
import { ThemeProvider, ThemeContext } from "../../context/context";

export const AddTaskModal = ({ closeModal, modalIsOpen, addNewTask }) => {
  const { theme } = useContext(ThemeContext);
  useEffect(()=> {
      console.log(theme)
  }, [theme])
  const arrOfCategory = ["Finance", "School", "Home", "Work", "Sport"];
  const [inputTask, setInputTask] = useState("");
  const [taskCategory, setTaskCategory] = useState("");
  const handleInputChange = (e) => {
    setInputTask(e.target.value);
  };
  const handleAddNewTask = (inputTask, taskCategory) => {
    return () => {
      addNewTask(inputTask, taskCategory);
      setTaskCategory("");
    };
  };

  const handleRadioFocus = (e) => {
    setTaskCategory(e);
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      className="modal"
      appElement={document.getElementsByClassName("body")}
    >
      <ThemeProvider>
          <div data-theme={theme} className='modal-content'>
        <h1 className="header-modal"> Add new task</h1>
        <input
          type="text"
          placeholder="enter your task"
          value={inputTask}
          onChange={handleInputChange}
          className="new-task"
        />
        <CategoryList
          categories={arrOfCategory}
          handleRadioFocus={handleRadioFocus}
        />
        <div className="button-group">
          <CustomButton onClick={handleAddNewTask(inputTask, taskCategory)}>
            {" "}
            Add{" "}
          </CustomButton>
          <CustomButton onClick={closeModal}> Close</CustomButton>
        </div>
        </div>
      </ThemeProvider>
    </Modal>
  );
};
