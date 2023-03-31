import { createContext, useState } from "react";

const SelectedSubContext = createContext({});

export const SelectedSubProvider = ({ children }) => {
  const [sub, setSub] = useState({});

  return (
    <SelectedSubContext.Provider value={{ sub, setSub }}>
      {children}
    </SelectedSubContext.Provider>
  );
};

export default SelectedSubContext;
