import React, { useEffect, useState } from "react";
import { FaCopy } from "react-icons/fa";
import { getProjects } from "../../api";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getProjects();
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleCopy = (projectID) => {
    navigator.clipboard.writeText(projectID);
    alert("✅ Project ID copied!"); // ✅ Simple message, no localhost
  };

  // Updated Styles
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      gap: "10px", // ✅ Removed extra margin
      padding: "20px",
      maxWidth: "1200px",
      margin: "auto",
      fontFamily: "'Poppins', sans-serif",
      justifyContent: "center",
      alignItems: "center", // ✅ Align everything properly
    },
    card: {
      background: "linear-gradient(135deg, #1e3c72, #2a5298)",
      color: "#fff",
      padding: "8px 12px", // 🔹 Reduced padding for a smaller look
      borderRadius: "8px", // 🔹 Slightly smaller border radius
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)", // 🔹 Softer shadow
      width: "100%", // 🔹 Makes it as small as its content
      minWidth: "150px", // 🔹 Prevents it from becoming too tiny
      textAlign: "center",
      fontSize: "16px", // 🔹 Reduced font size
      fontWeight: "600", // 🔹 Slightly less bold for a modern look
    },
    tableContainer: {
      background: "#fff",
      padding: "20px",
      borderRadius: "12px",
      boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)",
      overflowX: "auto",
      width: "100%",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      color: "#333",
    },
    th: {
      background: "#1e3c72",
      color: "#fff",
      padding: "12px",
      fontSize: "14px",
      textAlign: "left",
      borderBottom: "3px solid #ddd",
    },
    td: {
      padding: "12px",
      fontSize: "14px",
      borderBottom: "1px solid #ddd",
      textAlign: "left",
      color: "#333",
    },
    trEven: {
      background: "#f5f5f5",
    },
    trOdd: {
      background: "#e8f0ff",
    },
    copyButton: {
      padding: "6px 12px",
      background: "linear-gradient(135deg, #ff5a9e, #ff2d55)",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      transition: "0.3s",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
    },
    noData: {
      fontSize: "14px", // ✅ Smaller text
      textAlign: "center",
      padding: "10px",
      color: "#777",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2> Projects</h2>
      </div>

      {loading ? (
        <p style={styles.noData}>⏳ Loading projects...</p>
      ) : projects.length === 0 ? (
        <p style={styles.noData}>🚫 No projects available</p> // ✅ Smaller, properly aligned
      ) : (
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>#</th>
                <th style={styles.th}>Project Name</th>
                <th style={styles.th}>Project ID</th>
                <th style={styles.th}>Copy</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, index) => (
                <tr
                  key={project.projectID}
                  style={index % 2 === 0 ? styles.trEven : styles.trOdd}
                >
                  <td style={styles.td}>{index + 1}</td>
                  <td style={styles.td}>{project.name}</td>
                  <td style={styles.td}>{project.projectID}</td>
                  <td style={styles.td}>
                    <button
                      onClick={() => handleCopy(project.projectID)}
                      style={styles.copyButton}
                    >
                      <FaCopy size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Projects;
