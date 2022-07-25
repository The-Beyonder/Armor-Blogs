import React, { useState, createContext } from 'react';


export const searchQuery = createContext('blogs');

export const SearchProvider = ({ children }) => {
    const [value, setValue] = useState('');
    return(
        <searchQuery.Provider value={{ value:value, setValue:setValue}}>
            {children}
        </searchQuery.Provider>
    )
}