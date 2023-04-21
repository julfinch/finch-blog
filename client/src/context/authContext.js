import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    //During login. we will check our localStorage first, we will get it and assign it to the
    // variable currentUser, if none, then it will be null

    //We use PARSE because localStorage will give us string and we want to convert it 
    //to an array
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

    const login = async(inputs)  => {
        const res = await axios.post("/auth/login", inputs);
        setCurrentUser(res.data);
    };

    const logout = async(inputs) => {
        await axios.post("/auth/logout");
        setCurrentUser(null);
    };

    //Everytime we login, we will set a new currentUser inside localStorage
    //We will make a currentUser as a string, thus, the stringify function.
    useEffect(() => {
      localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser])
    
    return (
        <AuthContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}