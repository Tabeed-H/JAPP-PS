import React from "react";

export default function ErrorBox({ message, onClose }) {
  return (
    <div className="bg-red-100 border border-red-400 text-red-800 px-4 py-3 rounded relative shadow max-w-xl mx-auto flex items-start space-x-2">
      <div className="text-sm font-medium flex-1">{message}</div>
      <button
        onClick={onClose}
        className="text-red-500 hover:text-red-700 text-sm ml-4"
      >
        ×
      </button>
    </div>
  );
}
