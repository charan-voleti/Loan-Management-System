import {
  createContext,
  useContext,
  useState,
} from "react";

import type {
  ReactNode,
} from "react";
import {
  loginUser,
} from "../api/auth.api";

import {
  saveToken,
  removeToken,
} from "../utils/token";


interface AuthContextType {

  user: any;

  login: (
    email: string,
    password: string
  ) => Promise<void>;

  logout: () => void;
}


const AuthContext =
createContext<
  AuthContextType | undefined
>(undefined);


export const AuthProvider = ({
  children,
}: {
  children: ReactNode;
}) => {

const storedUser =
  localStorage.getItem("user");

const [user, setUser] =
  useState<any>(
    storedUser
      ? JSON.parse(storedUser)
      : null
  );

  // LOGIN
  const login = async (
    email: string,
    password: string
  ) => {

    try {

      const data =
        await loginUser(
          email,
          password
        );

      saveToken(data.token);

localStorage.setItem(
  "user",
  JSON.stringify(data.user)
);

setUser(data.user);



    } catch (error) {

      console.log(
        "Login Error:",
        error
      );
    }
  };


  // LOGOUT
  const logout = () => {

  removeToken();

localStorage.removeItem(
  "user"
);

setUser(null);
  };


  return (

    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >

      {children}

    </AuthContext.Provider>
  );
};


export const useAuth = () => {

  const context =
    useContext(AuthContext);

  if (!context) {

    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};