// TaskManager.tsx
import React, { useEffect, useState } from 'react';
import './App.css'
import { manage_addNewTask, manage_deleteTask, manage_fetch_data, manage_updateTask, type task } from './api/taskApi.js';

const App: React.FC = () => {

  const [newTask, setTask]          = useState({ title: "", description: "" });
  const [allTask, setAllTask]       = useState<task[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);;

    // Add item in supabase
  const handleAddTask = async(e : any) => {
    e.preventDefault();

    try {
      if(selectedId){
        await manage_updateTask(selectedId, newTask);
        alert("Update Successful");

      }else {
        await manage_addNewTask(newTask);
        alert("New Task added");

      }
       setTask({ title: "", description: "" });
        setSelectedId(null);
        loadTasks();

    } catch (error) {
    };
      alert("Error occurred!");
  }
  
  // fetch data from supabase
  const loadTasks = async() => {
    try {
      const tasks = await manage_fetch_data();
      setAllTask(tasks);

    } catch (error:any) {
      console.log('error.message :>> ', error.message);
    }
  }

  useEffect(() => {
    loadTasks();

  }, []);

  // delete item from database
  const handleDeleteTask = async(id: string) => {
    try {
      await manage_deleteTask(id);
      alert("Task deleted successfully");
      loadTasks();

    } catch (error:any) {
      console.log(error.message);
    }
  }

  // populate input fields with existing data to update it
  const handlePopulateInputFields = (task: task) => {
      setTask({title: task.title, description: task.description});
      setSelectedId(task.id);
  }; 

  return (
    <div className="container">
      <h1 className="header">Task Manager CRUD</h1>
      
      <form onSubmit={handleAddTask} className="form">
        <input
          type="text"
          placeholder="Task Title"
          name='title'
          value={newTask.title}
          onChange={(e) => setTask(prev => ({...prev, title: e.target.value}) )}
          className="input"
        />
        <textarea
          placeholder="Task Description"
          name='description'
          value={newTask.description}
          onChange={(e) => setTask(prev => ({...prev, description:e.target.value}))}
          className="textarea"
          rows={3}
        />
        <div className="button-container">
          <button type='submit' className="add-button">
            Add Task
          </button>
        </div>
      </form>

      <div className="task-list">
        {
          allTask.map((task) => <div key={task.id} className="task-card">
          <div className="task-content">
            <h3 className="task-title">{task?.title}</h3>
            <p className="task-description">{task?.description}</p>
          </div>
          <div className="task-actions">
            <button onClick={()=>handlePopulateInputFields(task)} className="edit-button">
              Edit
            </button>
            <button onClick={()=>handleDeleteTask(task.id)} className="delete-button">
              Delete
            </button>
          </div>
        </div>)
        }
      </div>
    </div>
  );
};

export default App;