import { createContext, useState } from "react";

const TempOrderContext = createContext({});

export const TempOrderProvider = ({ children }) => {
  const [tempOrder, setTempOrder] = useState([]);

  return (
    <TempOrderContext.Provider value={{ tempOrder, setTempOrder }}>
      {children}
    </TempOrderContext.Provider>
  );
};

export default TempOrderContext;
