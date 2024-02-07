import { Button } from "@/components/ui/button";
import { INITIAL_USER } from "@/lib/constants/auth";
import { useUserContext } from "@/hooks/use-user-context";

import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { mutate: signOut, isSuccess, isError } = useSignOutAccount();
  const { setIsAuthenticated, setUser } = useUserContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (isError) console.log("error signing out");
    if (isSuccess) {
      setIsAuthenticated(false);
      setUser(INITIAL_USER);
      navigate("/login");
    }
  }, [isSuccess, isError]);

  return (
    <div className="flex justify-center items-center h-[100vh]">
      <div className="flex flex-col justify-center items-center">
        home page
        <Button
          onClick={() => {
            signOut();
          }}
        >
          Sign out
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
