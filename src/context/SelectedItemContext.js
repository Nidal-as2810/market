import { createContext, useState } from "react";

const SelectedItemContext = createContext({});

export const SelectedItemProvider = ({ children }) => {
  const [item, setItem] = useState({});

  return (
    <SelectedItemContext.Provider value={{ item, setItem }}>
      {children}
    </SelectedItemContext.Provider>
  );
};

export default SelectedItemContext;
