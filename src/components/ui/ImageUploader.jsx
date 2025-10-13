import React from "react";

export default function ImageUploader({ label, onChange, className = "" }) {
  return (
    <div className={`flex flex-col gap-2 w-full ${className}`}>
      {label && <span className="text-sm font-medium text-gray-700">{label}</span>}
      <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:bg-gray-50">
        <span className="text-sm text-gray-500">Haz clic o arrastra una imagen</span>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => onChange(e.target.files[0])}
        />
      </label>
    </div>
  );
}