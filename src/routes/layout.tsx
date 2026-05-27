import { Outlet } from "react-router";
import Header from "src/widgets/Header/Header";

export default function AppLayout() {
  return (
    <div className="app-shell">
      <Header />
      <main className="content-container">
        <Outlet />
      </main>
    </div>
  );
}
