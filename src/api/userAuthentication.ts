import { supabase } from "../supabase/supabase-client.js";

export type userCredential = {
    email: string,
    password: string
};

export const manage_userSignUp = async(userCredential: userCredential) => {
    const {error} = await supabase.auth.signUp(userCredential);
    if(error) {
        console.log("error found: ", error.message);
    }
};

export const manage_userSignIn = async(userCredential: userCredential) => {
    const {error} = await supabase.auth.signInWithPassword(userCredential);
    if(error) {
        console.log("error found: ", error.message);
    }
}

export const manage_user_logout = async() => {
    const {error} = await supabase.auth.signOut();
    if(error) {
        console.log("error found: ", error.message);
    }
}