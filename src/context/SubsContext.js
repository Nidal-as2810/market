import { createContext, useState } from "react";

const SubsContext = createContext({});

export const SubsProvider = ({ children }) => {
  const [subs, setSubs] = useState([]);

  return (
    <SubsContext.Provider value={{ subs, setSubs }}>
      {children}
    </SubsContext.Provider>
  );
};

export default SubsContext;
