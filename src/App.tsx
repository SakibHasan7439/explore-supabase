// TaskManager.tsx
import React, { useEffect, useState } from 'react';
import './App.css'
import { supabase } from './supabase/supabase-client.js';

const App: React.FC = () => {
  type task = {
    id: string;
    title: string;
    description: string;
    created_at: string

  };
  const [newTask, setTask]          = useState({ title: "", description: "" });
  const [allTask, setAllTask]       = useState<task[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);;

    // Add item in supabase
  const handleAddTask = async(e : any) => {
    e.preventDefault();
    try {
      if(selectedId){
        const {error} = await supabase.from("taskCollection").update({
          title: newTask.title,
          description: newTask.description
        }).eq("id", selectedId);

        if(error){
          console.log('error found while updating task :>> ', error);
        }else {
          alert("Updating successful");
        }

      }else {
        await supabase.from("taskCollection").insert(newTask).single();
        alert("Data added successfully");
        setTask({
          title: "",
          description: ""
        })

      }

    } catch (error) {
    };
      alert("Error occurred!");
    }
  
  // fetch data from supabase
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

  // delete item from database
  const handleDeleteTask = async(id: string) => {
    const {error} = await supabase.from("taskCollection").delete().eq("id", id);

    if(error){
      console.log('error  :>> ', error.message );
    }else {
      alert("Task deleted successfully");
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