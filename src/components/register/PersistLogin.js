import { Outlet } from "react-router";
import { useState, useEffect } from "react";
import useRefreshToken from "../../context/useRefreshToken";
import useAuth from "../../context/useAuth";

function PersistLogin() {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    !auth?.token ? verifyRefreshToken() : setIsLoading(false);
  }, []);

  return <>{isLoading ? <p>Loading</p> : <Outlet />}</>;
}

export default PersistLogin;
