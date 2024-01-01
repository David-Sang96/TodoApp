import React, { useState } from "react";

const InputField = ({ addTodo }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTodo = {
      id: Math.floor(Math.random() * 100),
      title: text,
      completed: false,
    };
    addTodo(newTodo);
    setText("");
  };

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          className="addTodo-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </form>
    </div>
  );
};

export default InputField;
