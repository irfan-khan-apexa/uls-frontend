import React, { useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";

const SidebarLayout = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={{ ...styles.sidebar, width: isOpen ? "250px" : "0px" }}>
        <div style={styles.sidebarContent}>
          <h2 style={styles.logo}>ULS</h2>

          <ul style={styles.menu}>
            <li
              style={
                location.pathname === "/dashboard"
                  ? styles.activeMenu
                  : styles.menuItem
              }
            >
              <Link to="/dashboard" style={styles.link}>
                Dashboard
              </Link>
            </li>
            <li
              style={
                location.pathname === "/projects"
                  ? styles.activeMenu
                  : styles.menuItem
              }
            >
              <Link to="/projects" style={styles.link}>
                Projects
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Navbar */}
      <div style={{ ...styles.navbar, marginLeft: isOpen ? "250px" : "0px" }}>
        <div style={styles.navLeft}>
          <button
            style={styles.toggleButton}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? "❮" : "❯"}
          </button>
          <h3 style={styles.navTitle}>Dashboard</h3>
        </div>
        {/* <button onClick={handleLogout} style={styles.logoutButton}>
          Logout
        </button> */}
      </div>

      {/* Main Content */}
      <div style={{ ...styles.content, marginLeft: isOpen ? "250px" : "0px" }}>
        <div style={styles.pageContent}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    display: "flex",
    height: "100vh",
    overflow: "hidden",
  },
  sidebar: {
    background: "#1E3A5F",
    color: "white",
    height: "100vh",
    position: "fixed",
    left: 0,
    top: 0,
    transition: "width 0.3s ease-in-out",
    overflowX: "hidden",
    boxShadow: "2px 0px 10px rgba(0,0,0,0.2)",
    zIndex: 1000,
  },
  sidebarContent: {
    padding: "20px",
  },
  logo: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  menu: {
    listStyle: "none",
    padding: 0,
  },
  menuItem: {
    padding: "12px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    marginBottom: "10px",
    transition: "0.2s",
    fontSize: "16px",
  },
  activeMenu: {
    background: "#FF8C00",
    padding: "12px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    marginBottom: "10px",
    fontWeight: "bold",
    transition: "0.2s",
    fontSize: "16px",
  },
  link: {
    textDecoration: "none",
    color: "white",
    display: "block",
  },
  navbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "#1E3A5F",
    color: "white",
    height: "60px",
    padding: "0 20px",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    transition: "margin-left 0.3s ease-in-out",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    zIndex: 999,
  },
  navLeft: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  toggleButton: {
    background: "transparent",
    border: "none",
    color: "white",
    fontSize: "18px",
    cursor: "pointer",
  },
  navTitle: {
    fontSize: "20px",
    fontWeight: "bold",
  },
  logoutButton: {
    background: "#FF4C4C",
    border: "none",
    color: "white",
    padding: "8px 15px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  content: {
    flexGrow: 1,
    paddingTop: "60px",
    width: "100%",
    overflowY: "auto", // ✅ Allows page scrolling
    height: "100vh", // ✅ Takes full viewport height
  },
  pageContent: {
    padding: "20px",
    minHeight: "100vh", // ✅ Ensures full height is utilized
  },
};

export default SidebarLayout;
