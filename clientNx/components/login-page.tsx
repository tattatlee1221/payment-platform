"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertCircle } from "lucide-react";
import axios from "axios";  // 加入 axios

interface LoginPageProps {
  onLogin: (loginName: string, password: string) => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [loginName, setLoginName] = useState("");
  const [password, setPassword] = useState("");
  const [isRobot, setIsRobot] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!loginName || !password) {
      setError("請填寫所有必填欄位");
      return;
    }

    if (!isRobot) {
      setError("請確認您不是機器人");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/login`,  // 用環境變數
        { loginName, password }
      );
      if (response.data.success) {
        onLogin(loginName, password);  // 成功後調用 onLogin
      } else {
        setError("登入失敗，請檢查帳號或密碼");
      }
    } catch (err) {
      setError("伺服器錯誤，請稍後再試");
    }
  };


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      <div className="w-full max-w-[600px] mx-auto">
        <h1 className="text-2xl font-bold text-center mb-8">登入支付平台</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="請輸入登入名稱"
                value={loginName}
                onChange={(e) => setLoginName(e.target.value)}
                className="w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <Input
                type="password"
                placeholder="請輸入密碼"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>


            <div className="flex items-center space-x-2">
              <Checkbox
                id="robot"
                checked={isRobot}
                onCheckedChange={(checked) => setIsRobot(checked as boolean)}
              />
              <label
                htmlFor="robot"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                我不是機器人
              </label>
            </div>
          </div>

          {error && (
            <div className="flex items-center text-red-500 text-sm">
              <AlertCircle className="clientNx4 w-4 mr-1" />
              <span>{error}</span>
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white shadow-md transition-all duration-200 transform hover:scale-[1.02]"
          >
            登入
          </Button>
        </form>
      </div>
    </div>
  );
}