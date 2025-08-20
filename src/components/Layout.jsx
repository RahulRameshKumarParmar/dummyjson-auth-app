import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar.jsx";

function Layout() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <div>
      {!isLoginPage && <Navbar />}
      <div className="container mt-4">
        <Outlet /> {/* ✅ renders child route */}
      </div>
    </div>
  );
}

export default Layout;