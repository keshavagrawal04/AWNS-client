import {useState, useEffect} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkLoggedIn = async () => {
    try {
      const userData = await AsyncStorage.getItem("user");

      if (userData) {
        setIsLoggedIn(true);
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error("Failed to fetch user or tokens from storage:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);

  const login = async userData => {
    try {
      await AsyncStorage.setItem("user", JSON.stringify(userData));
      setIsLoggedIn(true);
      setUser(userData);
    } catch (error) {
      console.error("Failed to save user or tokens to storage:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("user");
      setIsLoggedIn(false);
      setUser(null);
    } catch (error) {
      console.error("Failed to remove user or tokens from storage:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    user,
    isLoggedIn,
    isLoading,
    login,
    logout,
  };
};

export default useAuth;
