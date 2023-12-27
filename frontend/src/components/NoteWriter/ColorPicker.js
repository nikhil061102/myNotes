import React, { useState } from 'react';

const ColorPicker = () => {
  const [selectedColor, setSelectedColor] = useState("#ffffff");

  const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
  };

  return (
      <input
        type="color"
        id="favcolor"
        name="favcolor"
        value={selectedColor}
        onChange={handleColorChange}
        style={{ width: '50px', height: '50px', cursor: 'pointer' }}
      />
  );
};

export default ColorPicker;
