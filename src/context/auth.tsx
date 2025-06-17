"use client";
import apiClient from "@/lib/apiClient";
import React, { ReactNode, useContext, useEffect, useState } from "react";

interface AuthContextType {
  user: null | {
    id: number;
    email: string;
    username: string;
  };
  login: (token: string) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = React.createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

//Providerの中で、ログイン関数の定義とか、ユーザーの状態を管理
//childrenはアプリケーション自体を指す
export const AuthProvider = ({ children }: AuthProviderProps) => {
  //トークンがあれば、apiClientのデフォルトヘッダーにAuthorizationをセットする

  //ログインしているすべての人の情報が保存される(?)
  const [user, setUser] = useState<null | {
    id: number;
    email: string;
    username: string;
  }>(null);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      apiClient.defaults.headers["Authorization"] = `Bearer ${token}`;

      apiClient
        .get("/users/find")
        .then((res) => {
          setUser(res.data.user);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  //login関数はローカルストレージにトークンをセットする関数
  const login = async (token: string) => {
    localStorage.setItem("auth_token", token);
    apiClient.defaults.headers["Authorization"] = `Bearer ${token}`;

    //userの情報はログインした時も欲しいから、上のuseEffectと同じ内容を書く
    try {
      apiClient.get("/users/find").then((res) => {
        setUser(res.data.user);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    //headerの中にAuthorizationが付与されたままなので、削除する
    delete apiClient.defaults.headers["Authorization"];
    //removeしてもuser情報は消されていないので消す
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
