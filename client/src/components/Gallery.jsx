import React, { useEffect, useState } from "react";
import API from "../api";

export default function Gallery() {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await API.get("/files");
        setFiles(res.data);
      } catch (err) {
        setError("Failed to load gallery");
      }
    };
    fetchFiles();
  }, []);

  if (error) return <p>{error}</p>;
  if (!files.length) return <p>No files uploaded yet.</p>;

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 10,
        justifyContent: "center",
      }}
    >
      {files.map((file) => {
        // Extract filename from path (Windows path)
        const parts = file.path.split("\\");
        const filename = parts[parts.length - 1]; // get last part

        // Construct URL relative to uploads static folder
        const url = `http://localhost:5000/uploads/${filename}`;

        if (file.fileType === "image") {
          return (
            <img
              key={file._id}
              src={url}
              alt=""
              style={{ maxWidth: 200, borderRadius: 5 }}
            />
          );
        }
        if (file.fileType === "video") {
          return (
            <video
              key={file._id}
              controls
              style={{ maxWidth: 200, borderRadius: 5 }}
            >
              <source src={url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          );
        }
        return null;
      })}
    </div>
  );
}
