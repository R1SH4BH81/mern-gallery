import React, { useRef, useState } from "react";
import API from "../api";

export default function UploadButton({ onUploadSuccess }) {
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = async (e) => {
    if (!e.target.files.length) return;
    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    try {
      await API.post("/files/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onUploadSuccess();
    } catch (err) {
      setError("Upload failed");
    } finally {
      setLoading(false);
      inputRef.current.value = null;
    }
  };

  return (
    <>
      <input
        type="file"
        ref={inputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
        accept="image/*,video/*"
      />
      <button
        onClick={() => inputRef.current.click()}
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          width: 60,
          height: 60,
          borderRadius: "50%",
          backgroundColor: "#007bff",
          color: "white",
          fontSize: 30,
          border: "none",
          cursor: "pointer",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        }}
        disabled={loading}
        title="Upload Image or Video"
      >
        +
      </button>
      {error && (
        <p style={{ color: "red", position: "fixed", bottom: 90, right: 20 }}>
          {error}
        </p>
      )}
    </>
  );
}
