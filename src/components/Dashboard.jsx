import React, { useState, useEffect } from "react";
import { createProject, getProjects, getLogs } from "../../api";
import { FaTag } from "react-icons/fa";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectName, setProjectName] = useState("");
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    getProjects().then((res) => setProjects(res.data));
  }, []);

  const handleCreateProject = async () => {
    if (projectName.trim() === "")
      return alert("Project name cannot be empty!");
    await createProject(projectName);
    getProjects().then((res) => setProjects(res.data));
    setProjectName("");
  };

  const handleSelectProject = async (projectID) => {
    const project = projects.find((proj) => proj.projectID === projectID);
    setSelectedProject(project);
    try {
      const logData = await getLogs(projectID);
      setLogs(Array.isArray(logData.data) ? logData.data : []);
    } catch (error) {
      console.error("Error fetching logs:", error);
      setLogs([]);
    }
  };

  const getLevelTag = (level) => {
    const levelColors = {
      error: "#ff4d4f",
      warn: "#faad14",
      info: "#1890ff",
      http: "#13c2c2",
      verbose: "#722ed1",
      debug: "#52c41a",
      silly: "#eb2f96",
    };

    const color = levelColors[level] || "#777";

    return (
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          fontWeight: "bold",
          textTransform: "uppercase",
        }}
      >
        <FaTag style={{ color }} /> {level}
      </span>
    );
  };

  const styles = {
    container: {
      display: "flex",
      flexWrap: "wrap",
      gap: "20px",
      padding: "20px",
      maxWidth: "1200px",
      margin: "auto",
      fontFamily: "'Poppins', sans-serif",
      justifyContent: "center",
    },
    card: {
      flex: "1 1 300px",
      background: "linear-gradient(135deg, #1e3c72, #2a5298)",
      color: "#fff",
      padding: "20px",
      borderRadius: "12px",
      boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)",
      minWidth: "280px",
    },
    input: {
      width: "100%",
      padding: "12px",
      marginBottom: "12px",
      border: "none",
      borderRadius: "5px",
      fontSize: "16px",
      boxSizing: "border-box",
    },
    button: {
      width: "100%",
      padding: "12px",
      background: "#ff5a9e",
      color: "#fff",
      fontWeight: "bold",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      transition: "0.3s",
    },
    select: {
      width: "100%",
      padding: "12px",
      border: "none",
      borderRadius: "5px",
      fontSize: "16px",
      cursor: "pointer",
      boxSizing: "border-box",
      appearance: "none",
    },
    tableContainer: {
      marginTop: "20px",
      background: "#fff",
      padding: "20px",
      borderRadius: "12px",
      boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)",
      overflowX: "auto", // ✅ Only scrolls horizontally if needed
      width: "100%", // ✅ Full width
    },
    tableWrapper: {
      overflowX: "auto",
      width: "100%", // ✅ Ensures full width
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
    },
    th: {
      background: "#1e3c72",
      color: "#fff",
      padding: "14px",
      fontSize: "16px",
      textAlign: "left",
      borderBottom: "3px solid #ddd",
    },
    td: {
      padding: "14px",
      fontSize: "15px",
      borderBottom: "1px solid #ddd",
      textAlign: "left",
      wordBreak: "break-word", // Prevents text from overflowing
    },
    trEven: {
      background: "#f5f5f5",
    },
    trOdd: {
      background: "#e8f0ff",
    },
    noData: {
      textAlign: "center",
      padding: "20px",
      fontSize: "16px",
      color: "#777",
    },
    selectWrapper: {
      display: "flex",
      flexDirection: "column", // ✅ Stacks elements on small screens
      gap: "10px",
      alignItems: "center",
    },
  };

  return (
    <div style={styles.container}>
      {/* Left Panel: Create Project */}
      <div style={styles.card}>
        <h2>Create New Project</h2>
        <input
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="Enter Project Name"
          style={styles.input}
        />
        <button onClick={handleCreateProject} style={styles.button}>
          Create Project
        </button>
      </div>

      {/* Right Panel: Select Project */}
      <div style={styles.card}>
        <h2>Select a Project</h2>
        <div style={styles.selectWrapper}>
          <select
            onChange={(e) => handleSelectProject(e.target.value)}
            style={styles.select}
          >
            <option value="">-- Select Project --</option>
            {projects.map((proj) => (
              <option key={proj.projectID} value={proj.projectID}>
                {proj.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Log Table */}
      {selectedProject && (
        <div style={{ width: "100%" }}>
          <div style={styles.tableContainer}>
            <h2>Logs for {selectedProject.name}</h2>
            <div style={styles.tableWrapper}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Message</th>
                    <th style={styles.th}>File</th>
                    <th style={styles.th}>Method</th>
                    <th style={styles.th}>Project ID</th>
                    <th style={styles.th}>Level</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.length > 0 ? (
                    logs.map((log, index) => (
                      <tr
                        key={index}
                        style={index % 2 === 0 ? styles.trEven : styles.trOdd}
                      >
                        <td style={styles.td}>{log.message}</td>
                        <td style={styles.td}>{log.metadata?.file || "N/A"}</td>
                        <td style={styles.td}>
                          {log.metadata?.method || "N/A"}
                        </td>

                        <td style={styles.td}>
                          {projects.find(
                            (p) => p.projectID === log.metadata?.projectID
                          )?.name || "N/A"}
                        </td>

                        <td style={styles.td}>{getLevelTag(log.level)}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" style={styles.noData}>
                        No logs available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
