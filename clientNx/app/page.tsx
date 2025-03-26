"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import LoginPage from "@/components/login-page";
import AppLayout from "@/components/app-layout";
import TransactionsPage from "@/components/transactions-page";
import SettingsPage from "@/components/settings-page";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activePage, setActivePage] = useState("transactions");
  const router = useRouter();

  const handleLogin = async (loginName: string, password: string) => {
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        loginName,
        password,
      });
      if (response.data.success) {
        setIsAuthenticated(true);
        setActivePage("transactions");
      }
    } catch (error) {
      console.error("登入失敗", error);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    router.push("/");
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <AppLayout
      activePage={activePage}
      onNavigate={setActivePage}
      onLogout={handleLogout}
    >
      {activePage === "transactions" ? (
        <TransactionsPage />
      ) : (
        <SettingsPage onLogout={handleLogout} />
      )}
    </AppLayout>
  );
}