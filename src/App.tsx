// TaskManager.tsx
import React, { useEffect, useState } from 'react';
import './app.css'
import { supabase } from './supabase/supabase-client';

const App: React.FC = () => {
  type task = {
    id: string;
    title: string;
    description: string;
    created_at: string

  };
  const [newTask, setTask]          = useState({ title: "", description: "" });
  const [allTask, setAllTask]       = useState<task[]>([]);

  useEffect(() => {
    let isMounted = true;

    const fetch_data = async() => {
      const {error, data} = await supabase
        .from("taskCollection")
        .select("*")
        .order("created_at", {ascending: true});
      if(error){
        console.log('error :>> ', error);

      }else if(isMounted){
        setAllTask(data)
      }
    }

    fetch_data();
    
    return () => {
      isMounted = false;
    }
  }, []);

  const handleAddTask = async(e : any) => {
    e.preventDefault();
    try {
      await supabase.from("taskCollection").insert(newTask).single();
      alert("Data added successfully");
      setTask({
        title: "",
        description: ""
      })

    } catch (error) {
      alert("Error occurred!");
    }
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
            <button className="edit-button">
              Edit
            </button>
            <button className="delete-button">
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