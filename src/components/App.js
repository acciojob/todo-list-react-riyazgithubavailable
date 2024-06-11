import React, { useState } from 'react';
import './styles.css'; // CSS file for styling

function ToDoApp() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState('');

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, newTask]);
      setNewTask('');
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handleEditClick = (index, value) => {
    setEditIndex(index);
    setEditValue(value);
  };

  const handleSaveClick = (index) => {
    if (editValue.trim() !== '') {
      const updatedTasks = [...tasks];
      updatedTasks[index] = editValue;
      setTasks(updatedTasks);
      setEditIndex(null);
      setEditValue('');
    }
  };

  return (
    <div className="todo-app">
      <div className="add-tasks-section">
        <input
          type="text"
          placeholder="Add a new task"
          value={newTask}
          onChange={handleInputChange}
        />
        <button onClick={addTask}>Add</button>
      </div>
      <div className="tasks-section">
        {tasks.map((task, index) => (
          <div className="task" key={index}>
            {editIndex === index ? (
              <>
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
                <button onClick={() => handleSaveClick(index)}>Save</button>
              </>
            ) : (
              <>
                <span>{task}</span>
                <button className="edit" onClick={() => handleEditClick(index, task)}>Edit</button>
              </>
            )}
            <button className="delete" onClick={() => deleteTask(index)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ToDoApp;
