import { useContext } from "react";
import SelectedSubContext from "./SelectedSubContext";

const useSub = () => {
  return useContext(SelectedSubContext);
};

export default useSub;
