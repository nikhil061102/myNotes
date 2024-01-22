import React, { createContext, useContext, useState } from 'react';

const SortingContext = createContext();

export const SortingProvider = ({ children }) => {
  const [selectedOption, setSelectedOption] = useState('datetime');

  const setSortingOption = (option) => {
    setSelectedOption(option);
  };

  return (
    <SortingContext.Provider value={{ selectedOption, setSortingOption }}>
      {children}
    </SortingContext.Provider>
  );
};

export const useSorting = () => {
  const context = useContext(SortingContext);
  return context;
};
