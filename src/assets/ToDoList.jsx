import React, { useState } from 'react';

function ToDoList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [editingIndex, setEditingIndex] = useState(-1);
    const [editedTask, setEditedTask] = useState('');

    function handleInputChange(event) {
        setNewTask(event.target.value);
    }

    function addTask() {
        const trimmedTask = newTask.trim();
        if (trimmedTask) {
            setTasks([...tasks, trimmedTask]);
            setNewTask('');
        }
    }

    function deleteTask(index) {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    }

    function moveTaskUp(index) {
        if (index === 0) return; 
        const updatedTasks = [...tasks];
        [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
        setTasks(updatedTasks);
    }

    function moveTaskDown(index) {
        if (index === tasks.length - 1) return;
        const updatedTasks = [...tasks];
        [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
        setTasks(updatedTasks);
    }

    function startEditing(index, task) {
        setEditingIndex(index);
        setEditedTask(task);
    }

    function saveEditedTask(index) {
        const updatedTasks = [...tasks];
        updatedTasks[index] = editedTask;
        setTasks(updatedTasks);
        setEditingIndex(-1);
        setEditedTask('');
    }

    function cancelEditing() {
        setEditingIndex(-1);
        setEditedTask('');
    }

    return (
        <div className="to-do-list">
            <h1>To-Do List</h1>
            <div>
                <input
                    type="text"
                    placeholder="Enter a task..."
                    value={newTask}
                    onChange={handleInputChange}
                />
                <button className="add-button" onClick={addTask}>Add</button>
            </div>
            <ol>
                {tasks.map((task, index) => (
                    <li key={index}>
                        {index === editingIndex ? (
                            <div>
                                <input
                                    type="text"
                                    value={editedTask}
                                    onChange={(event) => setEditedTask(event.target.value)}
                                />
                                <button className="save-button" onClick={() => saveEditedTask(index)}>Save</button>
                                <button className="cancel-button"onClick={cancelEditing}>Cancel</button>
                            </div>
                        ) : (
                            <div className="outside">
                                
                                <span className="text">{task}</span>
                                <div className="flex-container">
                                <button className="delete-button" onClick={() => deleteTask(index)}>Delete</button>
                                <button className="move-button" onClick={() => moveTaskUp(index)}>↑</button>
                                <button className="move-button" onClick={() => moveTaskDown(index)}>↓</button>
                                <button className="edit-button" onClick={() => startEditing(index, task)}>Edit</button>
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ol>
        </div>
    );
}

export default ToDoList;
