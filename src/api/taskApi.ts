import { supabase } from "../supabase/supabase-client.js";

export  type task = {
    id: string;
    title: string;
    description: string;
    created_at: string

  };

export const manage_fetch_data = async():Promise<task[]> => {
    const {data, error} = await supabase.from("taskCollection").select("*").order("created_at", {ascending:true});
    if(error) throw new Error(error.message);
    return data || [];
}

export const manage_addNewTask = async(task:Omit<task, "id" | "created_at">) => {
    const {error} = await supabase.from("taskCollection").insert(task).single();
    if(error) throw new Error(error.message);
}

export const manage_updateTask = async(id:string, task:Partial<task>) => {
    const {error} = await supabase.from("taskCollection").update(task).eq("id", id);
    if(error) throw new Error(error.message);
}

export const manage_deleteTask = async(id:string) => {
    const {error} = await supabase.from("taskCollection").delete().eq("id", id);
    if(error) throw new Error(error.message);
}