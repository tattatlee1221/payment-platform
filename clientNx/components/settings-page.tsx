"use client";

import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle } from "lucide-react";

interface SettingsPageProps {
  onLogout: () => void;
}

export default function SettingsPage({ onLogout }: SettingsPageProps) {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/forget-password", { email });
      setSuccessMessage(response.data.message);
      setEmail("");
    } catch (error) {
      setSuccessMessage("提交失敗");
    }
  };

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold text-center mb-6">設置</h1>
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">忘記密碼</h2>
        <form onSubmit={handleResetPassword} className="space-y-4">
          <div>
            <Input
              type="email"
              placeholder="輸入您的郵箱"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
              required
            />
          </div>
          {successMessage && (
            <div className="flex items-center text-green-600">
              <CheckCircle className="h-4 w-4 mr-1" />
              <span>{successMessage}</span>
            </div>
          )}
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white shadow-md transition-all duration-200"
          >
            提交
          </Button>
        </form>
      </div>
      <Button
        onClick={onLogout}
        className="w-full bg-gray-500 hover:bg-gray-600 text-white shadow-md transition-all duration-200"
      >
        登出
      </Button>
    </div>
  );
}