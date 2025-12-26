import { ReactNode } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const currentUser = typeof window !== "undefined" ? localStorage.getItem("sd_current_user") : null;

  // Allow access to the auth page without being signed in
  if (!currentUser && location.pathname !== "/auth") {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">{children}</main>
      <Footer />
    </div>
  );
}
