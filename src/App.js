import { useCallback, useEffect, useState } from "react";
import "./App.css";
import ButtonGroup from "./components/ButtonGroup";
import CheckBtn from "./components/CheckBtn";
import InputField from "./components/InputField";
import TodoListField from "./components/TodoListField";

function App() {
  const [todoData, setTodoData] = useState([]);
  const [filter, setFilter] = useState(todoData);

  const dataFromServer = async () => {
    const response = await fetch("http://localhost:3001/todos");
    const data = await response.json();
    setTodoData(data);
    setFilter(data);
  };

  useEffect(() => {
    dataFromServer();
  }, []);

  const addTodo = async (newTodo) => {
    await fetch("http://localhost:3001/todos", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newTodo),
    });
    setFilter((prevState) => [...prevState, newTodo]);
    setTodoData((prevState) => [...prevState, newTodo]);
  };

  const updateTodo = async (newTodo) => {
    await fetch(`http://localhost:3001/todos/${newTodo.id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newTodo),
    });
    setTodoData((prevState) =>
      prevState.map((item) => {
        return item.id === newTodo.id ? newTodo : item;
      })
    );
    setFilter((prevState) =>
      prevState.map((item) => {
        return item.id === newTodo.id ? newTodo : item;
      })
    );
  };

  const handleDelete = async (id) => {
    console.log(filter);
    console.log(id);
    await fetch(`http://localhost:3001/todos/${id}`, {
      method: "DELETE",
    });
    setFilter((prevState) => prevState.filter((item) => item.id !== id));
    setTodoData((prevState) => prevState.filter((item) => item.id !== id));
  };

  const handleCheckAll = () => {
    filter.forEach((item) => {
      item.completed = true;
      updateTodo(item);
    });
  };

  const handleClearCompleted = () => {
    filter.forEach((item) => {
      if (item.completed) {
        handleDelete(item.id);
      }
    });
  };
  console.log(filter);

  const filterBy = useCallback(
    (selectedBtn) => {
      if (selectedBtn === "All") {
        setFilter(todoData);
      } else if (selectedBtn === "Active") {
        const fil = todoData.filter((item) => {
          return item.completed === false;
        });
        setFilter(fil);
      } else if (selectedBtn === "Completed") {
        setFilter(
          filter.filter((item) => {
            return item.completed;
          })
        );
      }
    },
    [todoData]
  );

  let remainingCount = filter.filter((item) => !item.completed).length;

  return (
    <div className="todo-container">
      <h3>Todo App</h3>
      <InputField addTodo={addTodo} />
      {filter.map((item) => (
        <TodoListField
          todoData={item}
          key={item.id}
          updateTodo={updateTodo}
          handleDelete={handleDelete}
        />
      ))}
      <hr style={{ marginTop: 10 }} />
      <CheckBtn
        handleCheckAll={handleCheckAll}
        remainingCount={remainingCount}
      />
      <hr />
      <ButtonGroup
        handleClearCompleted={handleClearCompleted}
        filterBy={filterBy}
      />
    </div>
  );
}
export default App;
