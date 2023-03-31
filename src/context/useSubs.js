import { useContext } from "react";
import SubsContext from "./SubsContext";

const useSubs = () => {
  return useContext(SubsContext);
};

export default useSubs;
