import React from "react";

export default function RepetitionSelector({ value, onChange }) {
  return (
    <div>
      <label>
        Allow letter repetition in random word:
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
        />
      </label>
    </div>
  );
}
