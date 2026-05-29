"use client";
import { SessionProvider } from "next-auth/react";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }) {
  return (
    <SessionProvider>
      <div style={{ display: "flex", minHeight: "100vh", background: "#f4f7fb" }}>
        {/* Sidebar — fixed 240px */}
        <AdminSidebar />

        {/* Main content — offset by sidebar width */}
        <main style={{
          marginLeft: "240px",
          flex: 1,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}>
          {children}
        </main>
      </div>
    </SessionProvider>
  );
}
