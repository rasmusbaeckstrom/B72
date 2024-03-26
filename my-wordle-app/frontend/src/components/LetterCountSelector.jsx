import React from 'react';

export default function LetterCountSelector({ value, onChange }) {
  const handleInputChange = (e) => {
    const newValue = parseInt(e.target.value);
    if (newValue >= 3 && newValue <= 10) {
      onChange(newValue);
    }
  };

  return (
    <div>
      <label>
        Number of letters in random word (3-10):
        <input
          type="number"
          min="3"
          max="10"
          value={value}
          onChange={handleInputChange}
        />
      </label>
    </div>
  );
}
