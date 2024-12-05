import React, { useState } from 'react';
import './Start.css'; // Asegúrate de tener este archivo CSS

const Start = () => {
  const [barcode, setBarcode] = useState('');

  const handleScan = (e) => {
    setBarcode(e.target.value);
  };

  return (
    <div className="scanner-container">
      <h1>Barcode Scanner</h1>
      <input
        type="text"
        placeholder="Scan barcode here"
        value={barcode}
        onChange={handleScan}
        autoFocus
      />
    </div>
  );
};

export default Start;
