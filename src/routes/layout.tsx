import { Outlet, Navigate } from "react-router-dom";
import Header from "src/widgets/Header/Header";

export default function AppLayout() {
  const isAuthenticated = !!localStorage.getItem("accessToken");

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="app-shell">
      <Header />
      <main className="content-container">
        <Outlet />
      </main>
    </div>
  );
}
