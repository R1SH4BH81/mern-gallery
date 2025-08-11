import React, { useState } from "react";
import Gallery from "../components/Gallery";
import UploadButton from "../components/UploadButton";

export default function Home() {
  const [reloadGallery, setReloadGallery] = useState(false);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>My Gallery</h1>
      <Gallery key={reloadGallery} />
      <UploadButton onUploadSuccess={() => setReloadGallery((r) => !r)} />
    </div>
  );
}
