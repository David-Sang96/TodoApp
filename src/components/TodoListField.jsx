import React, { useState } from "react";

const TodoListField = ({ todoData, updateTodo, handleDelete }) => {
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState(todoData.title);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTodo = {
      id: todoData.id,
      title: text,
      completed: todoData.completed,
    };
    updateTodo(newTodo);
    setEdit(false);
  };

  const handleCheckBox = () => {
    const newTodo = {
      id: todoData.id,
      title: text,
      completed: !todoData.completed,
    };
    updateTodo(newTodo);
  };

  return (
    <div className="todoList-container ">
      <div className="todolist">
        <div className="todoList-checkBox">
          <input
            type="checkbox"
            checked={todoData.completed}
            onChange={handleCheckBox}
          />
          {!edit && (
            <div
              className={`${todoData.completed && "line-through"}`}
              onDoubleClick={() => setEdit(true)}
            >
              {todoData.title}
            </div>
          )}
          {edit && (
            <form action="" onSubmit={handleSubmit}>
              <input
                type="text"
                className="todoList-input"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </form>
          )}
        </div>
        <i
          className="fa-solid fa-xmark"
          onClick={() => handleDelete(todoData.id)}
        ></i>
      </div>
    </div>
  );
};

export default TodoListField;
