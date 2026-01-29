"use client";

import { useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../component/sidebar";
import Navbar from "../component/navbar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const router = useRouter();

  const handleLogoutClick = () => {
    console.log("Logout clicked")
    localStorage.removeItem("login");
    router.push("/auth/login"); 
  };

  return (
    <div className="min-h-screen flex flex-col">

      <Navbar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        onLogoutClick={handleLogoutClick}
        showLogoutConfirm={showLogoutConfirm}
        setShowLogoutConfirm={setShowLogoutConfirm}
      />

      <div className="flex flex-1">
        <Sidebar collapsed={collapsed} />
        <main className={`flex-1 p-6 mt-10 ${collapsed ? "ml-10" : "ml-60"} bg-gray-100`}>{children}</main>
      </div>
      {showLogoutConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="mb-4">Are you sure you want to logout?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleLogoutClick}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
