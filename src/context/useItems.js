import { useContext } from "react";
import ItemsContext from "./ItemsContext";

const useItems = () => {
  return useContext(ItemsContext);
};

export default useItems;
