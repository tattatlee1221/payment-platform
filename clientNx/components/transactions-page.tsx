"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Badge } from "@/components/ui/badge";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/transactions")
      .then((response) => setTransactions(response.data))
      .catch((error) => console.error("獲取交易失敗", error));
  }, []);

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold text-center mb-6">交易記錄</h1>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">交易日期</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">商家 ID</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">交易編號</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">商家參考</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">貨幣</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">金額</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">狀態</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction: any, index: number) => (
              <tr key={index} className="border-b hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4 text-sm">{transaction.dt}</td>
                <td className="py-3 px-4 text-sm">{transaction.merchId}</td>
                <td className="py-3 px-4 text-sm">{transaction.transId}</td>
                <td className="py-3 px-4 text-sm">{transaction.clientRef}</td>
                <td className="py-3 px-4 text-sm">{transaction.ccy}</td>
                <td className="py-3 px-4 text-sm">{transaction.amt.toFixed(2)}</td>
                <td className="py-3 px-4 text-sm">
                  <Badge
                    className={
                      transaction.transSts === "Completed"
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-orange-500 hover:bg-orange-600"
                    }
                  >
                    {transaction.transSts}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}