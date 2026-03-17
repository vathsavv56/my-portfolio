import React from "react";
import "../index.css";

interface ToastProps {
  message: string;
  imageUrl: string;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, imageUrl, onClose }) => {
  return (
    <div
      className="fixed top-6 right-6 z-50 flex items-center bg-[#232323] text-white px-4 py-3 rounded-lg shadow-lg min-w-65 max-w-xs border border-[#444] animate-fade-in"
      style={{ fontFamily: "Hanken Grotesk, sans-serif" }}
    >
      <img
        src={imageUrl}
        alt="toast-img"
        className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-[#444]"
      />
      <div className="flex-1">
        <span className="block text-lg font-semibold mb-1">{message}</span>
      </div>
      <button
        onClick={onClose}
        className="ml-3 text-gray-400 hover:text-white focus:outline-none"
        aria-label="Close"
      >
        ✕
      </button>
    </div>
  );
};

export default Toast;
