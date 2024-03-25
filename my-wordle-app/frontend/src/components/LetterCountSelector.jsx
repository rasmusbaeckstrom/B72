import React from 'react';

export default function LetterCountSelector({ value, onChange }) {
  return (
    <div>
      <label>
        Number of letters (3-10):
        <input
          type="number"
          min="3"
          max="10"
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
        />
      </label>
    </div>
  );
}
