import { getCurrentUser } from "@/lib/appwrite/api";
import { INITIAL_STATE, INITIAL_USER } from "@/lib/constants/auth";
import SplashScreen from "@/components/splash-screen";
import { IContextType, IUser } from "@/types";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext<IContextType>(INITIAL_STATE);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser>(INITIAL_USER);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const checkAuthUser = async () => {
    try {
      setIsLoading(true);
      const currentAccount = await getCurrentUser();
      if (currentAccount) {
        setUser({
          accountid: currentAccount.$id,
          username: currentAccount.username,
          email: currentAccount.email,
          displayName: currentAccount.displayName,
          dob: currentAccount.dob,
        });

        setIsAuthenticated(true);

        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    setUser,
    isLoading,
    isAuthenticated,
    setIsLoading,
    setIsAuthenticated,
    checkAuthUser,
  };

  useEffect(() => {
    if (
      localStorage.getItem("cookieFallback") === "[]" ||
      localStorage.getItem("cookieFallback") === null ||
      localStorage.getItem("cookieFallback") === undefined
    ) {
      console.log("cookieFallback", localStorage.getItem("cookieFallback"));

      console.log("[In authcontext useeffect]: Alreadylogged out");

      setIsAuthenticated(false);
      return;
    }
    checkAuthUser();
  }, []);

  return (
    <AuthContext.Provider value={value}>
      {isLoading ? <SplashScreen /> : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
