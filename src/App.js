import "./App.css";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCircleCheck } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [completed, setCompleted] = useState(() => {
    const savedCompleted = localStorage.getItem("completed");
    return savedCompleted ? JSON.parse(savedCompleted) : [];
  });
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [moveFrom, setMoveFrom] = useState(null);
  const [moveTo, setMoveTo] = useState(null);

  useEffect(() => {
    document.title = "To-Do List";
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem("completed", JSON.stringify(completed));
  }, [completed]);

  const addTodo = (e) => {
    e.preventDefault();
    if (title && description) {
      setTodos([...todos, { title, description }]);
      setTitle("");
      setDescription("");
    }
  };

  const completeTodo = (index) => {
    const todoToComplete = todos[index];
    setCompleted([...completed, { ...todoToComplete }]);
    deleteTodo(index);
  };

  const deleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const deleteCompleted = (index) => {
    const newCompleted = [...completed];
    newCompleted.splice(index, 1);
    setCompleted(newCompleted);
  };

  const handleSort = () => {
    if (moveFrom !== null && moveTo !== null && moveFrom !== moveTo) {
      const newTodos = [...todos];
      const [movedItem] = newTodos.splice(moveFrom, 1);
      newTodos.splice(moveTo, 0, movedItem);
      setTodos(newTodos);
    }
    setMoveFrom(null);
    setMoveTo(null);
  };

  return (
    <div className="App">
      <div className="AddListPart">
        <h1 className="header">To-Do List</h1>
        <div className="FormDisplay">
          <div className="Form">
            <form onSubmit={addTodo}>
              <input
                type="text"
                placeholder="What Task?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <textarea
                placeholder="What you are gonna do?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={5}
              />
              <div className="AddTaskButtonDiv">
                <button className="AddTaskButton" type="submit">
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {todos.length > 0 || completed.length > 0 ? (
        <div>
          <div className="TwoDiv">
            <div className="ToDoPart">
              <div className="TaskPart">
                <h1 className="header">To-Do</h1>
                {todos.map((todo, index) => (
                  <div
                    key={index}
                    className="EachTaskPart1"
                    draggable
                    onDragStart={() => {
                      setMoveFrom(index);
                      console.log("Moving from", moveFrom);
                    }}
                    onDragEnter={() => {
                      setMoveTo(index);
                      console.log("Moving To", moveTo);
                    }}
                    onDragEnd={handleSort}
                    onDragOver={(e) => e.preventDefault()}
                  >
                    <div className="TaskDetails">
                      <h2>{todo.title}</h2>
                      <p>{todo.description}</p>
                    </div>
                    <div className="icons">
                      <button
                        className="complete-btn"
                        onClick={() => completeTodo(index)}
                      >
                        <FontAwesomeIcon icon={faCircleCheck} />
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() => deleteTodo(index)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="CompletedPart">
              <div className="TaskPart">
                <h1 className="header">Completed</h1>
                {completed.map((todo, index) => (
                  <div key={index} className="EachTaskPart2">
                    <div>
                      <h2>{todo.title}</h2>
                      <p>{todo.description}</p>
                    </div>
                    <div className="icons">
                      <button
                        className="delete-btn"
                        onClick={() => deleteCompleted(index)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
      <div className="Footer">
        <p>Developed by G S Sathiyanarayan</p>
        <p>Vish Gyana Technology Solutions</p>
      </div>
    </div>
  );
}

export default App;
