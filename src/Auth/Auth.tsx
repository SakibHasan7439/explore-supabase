import React, { useState, type ChangeEvent } from 'react';
import { manage_userSignIn, manage_userSignUp } from '../api/userAuthentication.js';

const Auth = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async(e:any) => {
        e.preventDefault();
        const userCredential = {email, password};
        if(!isSignUp) {
            await manage_userSignUp(userCredential);
            alert("SignUp successful");

        }else {
            await manage_userSignIn(userCredential);
            alert("Sign in successful!");
        }
    }

    return (
        <div className='container'>
            <div className="header">
                User Authentication
            </div>
            <form onSubmit={handleSubmit} className='form'>
                <input 
                    type="email" 
                    name="email" 
                    placeholder='Enter your email' 
                    className='input'
                    value={email}
                    onChange={(e: ChangeEvent<HTMLInputElement>)=>setEmail(e.target.value)}
                />
                <input 
                    type="password" 
                    name="password"
                    placeholder='Enter your password'
                    className='input'
                    value={password}
                    onChange={(e: ChangeEvent<HTMLInputElement>)=>setPassword(e.target.value)} 
                />
                <div className="button-container">
                <button type='submit' className="add-button">
                    {isSignUp ? 'Sign in' : 'Sign up'}
                </button>
                </div>
            </form>
            <div className='button-container'>
                <button 
                    className='status-change-btn'
                    onClick={() =>{
                        setIsSignUp(!isSignUp)
                    }}>
                    {isSignUp ? "Switch to  Sign In" :"Switch to Sign Up"}
                </button>
            </div>
        </div>
    );
};

export default Auth;