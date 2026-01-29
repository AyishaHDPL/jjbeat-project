"use client"
import { useState } from "react";
import Navbar from "../component/navbar";
import Sidebar from "../component/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const [collapsed, setCollapsed] = useState<boolean>(false)
  return (
    <div className="min-h-screen flex flex-col mt-18">
      <Navbar setCollapsed={setCollapsed} collapsed={collapsed}/>

      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar collapsed={collapsed}/>

        <main
          className={`
            flex-1 p-4 bg-gray-100 transition-all duration-300
            ${collapsed ? "ml-20" : "ml-64"}
          `}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
