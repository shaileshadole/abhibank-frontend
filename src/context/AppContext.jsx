import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);

    return (
        <AppContext.Provider value={{ loading, setLoading}}>
            {children} 
        </AppContext.Provider>
    );
};