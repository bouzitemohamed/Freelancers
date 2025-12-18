import { createContext, useEffect, useState } from "react";
import { getMe } from "../api/user";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function validateToken() {
      setLoading(true);
      const token = window.localStorage.getItem("token");

      if (!token) {
        setAuth(false);
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const res = await getMe(); // call backend
        if (res.status === "ok") {
          setAuth(true);
          setUser(res.user);
        } else {
          // token invalid/expired
          window.localStorage.removeItem("token");
          setAuth(false);
          setUser(null);
        }
      } catch (error) {
        // network or 401 error
        window.localStorage.removeItem("token");
        setAuth(false);
        setUser(null);
      }

      setLoading(false);
    }

    validateToken();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth, user, setUser, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
