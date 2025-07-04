import React, { useRef } from "react";

export default function UploadButton({ onUpload, loading }) {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onUpload(file);
    }
  };

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />
      <button
        onClick={handleClick}
        disabled={loading}
        className={`px-6 py-2 rounded-md transition ${
          loading
            ? "bg-gray-400 text-white cursor-not-allowed"
            : "bg-black text-white hover:bg-gray-800"
        }`}
      >
        Upload Image
      </button>
    </div>
  );
}
