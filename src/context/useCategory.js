import { useContext } from "react";
import CategoryContext from "./CategoryContext";

const useCategory = () => {
  return useContext(CategoryContext);
};

export default useCategory;
