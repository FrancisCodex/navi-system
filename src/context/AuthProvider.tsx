import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_WITH_CREDENTIALS = { withCredentials: true };

interface AuthContextType {
  user: any;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string, userType: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const cachedUser = localStorage.getItem("user");
        if (cachedUser) {
          setUser(JSON.parse(cachedUser));
          setLoading(false);
          return;
        }

        const response = await axios.get(`${API_BASE_URL}/user`, {
          ...API_WITH_CREDENTIALS,
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(response.data);
        localStorage.setItem("user", JSON.stringify(response.data)); // Cache user data
      } catch (err) {
        console.error("Auth check failed", err);
        localStorage.removeItem("user");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (email: string, password: string, userType: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/login`,
        { email, password, user_type: userType },
        API_WITH_CREDENTIALS
      );

      console.log("Login response", response.data);

      setUser(response.data.user);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user)); // Cache user data
      toast.success("Login successful");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
      toast.error("Login failed");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.post(`${API_BASE_URL}/logout`, null, {
        ...API_WITH_CREDENTIALS,
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser(null);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      toast.success("Logout successful");
    } catch (err) {
      toast.error("Logout failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};