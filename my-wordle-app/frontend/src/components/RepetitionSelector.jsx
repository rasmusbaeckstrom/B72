import React from 'react';

export default function RepetitionSelector({ value, onChange }) {
  return (
    <div>
      <label>
        Allow letter repetition:
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
        />
      </label>
    </div>
  );
}
