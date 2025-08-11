import React, { useRef, useState } from "react";
import API from "../api";
import "./Upload.css";

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
      <div
        onClick={() => inputRef.current.click()}
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
        }}
        disabled={loading}
        title="Upload Image or Video"
      >
        <div className="input-div">
          <input className="input" name="file" type="file" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            strokeLinejoin="round"
            strokeLinecap="round"
            viewBox="0 0 24 24"
            strokeWidth="2"
            fill="none"
            stroke="currentColor"
            className="icon"
          >
            <polyline points="16 16 12 12 8 16"></polyline>
            <line y2="21" x2="12" y1="12" x1="12"></line>
            <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path>
            <polyline points="16 16 12 12 8 16"></polyline>
          </svg>
        </div>
      </div>
      {error && (
        <p style={{ color: "red", position: "fixed", bottom: 90, right: 20 }}>
          {error}
        </p>
      )}
    </>
  );
}
