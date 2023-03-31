import { useContext } from "react";
import SelectedItemContext from "./SelectedItemContext";

const useSelectedItem = () => {
  return useContext(SelectedItemContext);
};

export default useSelectedItem;
