import React, { useState } from "react";
import "./App.css";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");

  function addTask() {
    const trimmedTask = task.trim();
    if (!trimmedTask) return;

    const newTodo = {
      id: Date.now(),
      text: trimmedTask,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setTask("");
  }

  function toggleDone(id) {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  function removeTask(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function clearCompleted() {
    setTodos(todos.filter((todo) => !todo.completed));
  }

  const tasksLeft = todos.filter((todo) => !todo.completed).length;

  return (
    <div className="todo-container">
      <h2>MY TODO LIST</h2>

      <div className="input-group">
        <input
          type="text"
          placeholder="What needs to be done?"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          className="todo-input"
        />
        <button onClick={addTask} className="btn add-btn">
          Add
        </button>
      </div>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`todo-item ${todo.completed ? "done" : ""}`}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleDone(todo.id)}
              className="todo-checkbox"
            />
            <span className="todo-text">{todo.text}</span>
            <button
              onClick={() => removeTask(todo.id)}
              className="btn delete-btn"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      <div className="footer">
        <span
  style={{
    color: tasksLeft === 0 ? "#000000ff" : "#333", // red if 0, dark grey otherwise
    fontWeight: "bold",
  }}
>
  {tasksLeft} Task{tasksLeft !== 1 ? "s" : ""} Left
</span>
        <button onClick={clearCompleted} className="btn clear-btn">
          Clear Completed
        </button>
      </div>
    </div>
  );
}

export default TodoList;