import { useContext } from "react";
import TempOrderContext from "./TempOrderProvider";

const useTempOrder = () => {
  return useContext(TempOrderContext);
};

export default useTempOrder;
