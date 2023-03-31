import { createContext, useState } from "react";

const CategoryContext = createContext([]);

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

  return (
    <CategoryContext.Provider value={{ categories, setCategories }}>
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryContext;
