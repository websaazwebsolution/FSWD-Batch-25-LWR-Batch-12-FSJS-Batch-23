import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
// import './TodoApp.css'; // Import the CSS file

function TodoApp() {
    // Get todos from sessionStorage or set an empty array if none exists
    const [todos, setTodos] = useState(() => {
        const savedTodos = sessionStorage.getItem('todos');
        return savedTodos ? JSON.parse(savedTodos) : [];
    });

    // Input value state for the text input field
    const [inputValue, setInputValue] = useState("");

    // Sync todos with sessionStorage whenever the todos array changes
    useEffect(() => {
        sessionStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    // Add a new todo to the list
    const addTodo = () => {
        if (inputValue.trim() !== "") {
            setTodos([...todos, { text: inputValue, completed: false }]);
            setInputValue(""); // Clear the input field
        }
    };

    // Toggle the completion state of a todo
    const toggleTodo = (index) => {
        const updatedTodos = todos.map((todo, i) =>
            i === index ? { ...todo, completed: !todo.completed } : todo
        );
        setTodos(updatedTodos);
    };

    // Delete a todo
    const deleteTodo = (index) => {
        const updatedTodos = todos.filter((_, i) => i !== index);
        setTodos(updatedTodos);
    };

    // Reset all todos
    const resetTodos = () => {
        setTodos([]);
    };

    return (
        <div>
            <Navbar />
            <h1>Todo App</h1>
            <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                type="text"
                placeholder="Add a new task..."
            />
            <button onClick={addTodo}>Add</button>

            <ul>
                {todos.map((todo, index) => (
                    <li key={index} style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
                        {todo.text}
                        <span onClick={() => toggleTodo(index)}>
                            {todo.completed ? " Done" : " Pending"}
                        </span>
                        <button onClick={() => deleteTodo(index)}>Delete</button>
                    </li>
                ))}
            </ul>

            <button onClick={resetTodos}>Reset Todos</button>
        </div>
    );
}

export default TodoApp;
