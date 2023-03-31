import axios from "../api/axios";
import useAuth from "./useAuth";
import useTempOrder from "./useTempOrder";

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const { setTempOrder } = useTempOrder();

  const refresh = async () => {
    const response = await axios.get("/refresh");
    const tempResponse = await axios.get("/order/" + response.data.username, {
      headers: { Authorization: `Bearer ` + response.data.accessToken },
    });
    setTempOrder(tempResponse.data);
    setAuth((prev) => {
      return {
        ...prev,
        token: response.data.accessToken,
        roles: response.data.roles,
        username: response.data.username,
      };
    });
    return response.data.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
