import React from "react";

export default function EdadRangeFilter({ value = [0, 100], onChange, min = 0, max = 100 }) {
  const handleChange = (e, idx) => {
    const newEdad = [...value];
    newEdad[idx] = Number(e.target.value);
    onChange(newEdad);
  };

  const pct = (v) => ((v - min) / (max - min)) * 100;
  const leftPct = pct(value[0]);
  const rightPct = pct(value[1]);

  const leftStyle = {
    background: `linear-gradient(90deg, var(--primary-strong) 0%, var(--primary-strong) ${leftPct}%, #e6e6e6 ${leftPct}%, #e6e6e6 100%)`,
    accentColor: "var(--primary-strong)",
  };

  const rightStyle = {
    background: `linear-gradient(90deg, var(--primary-strong) 0%, var(--primary-strong) ${rightPct}%, #e6e6e6 ${rightPct}%, #e6e6e6 100%)`,
    accentColor: "var(--primary-strong)",
  };

  return (
    <div>
      <label className="block text-sm text-gray-700 mb-1">Edad:</label>
      <div className="flex items-center gap-3 mb-3">
        <span className="text-xs">{value[0]}</span>
        <input
          type="range"
          min={min}
          max={max}
          value={value[0]}
          onChange={e => handleChange(e, 0)}
          className="w-1/2 custom-range"
          style={leftStyle}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={value[1]}
          onChange={e => handleChange(e, 1)}
          className="w-1/2 custom-range"
          style={rightStyle}
        />
        <span className="text-xs">{value[1]}</span>
      </div>
    </div>
  );
}