"use client";
import React from 'react';
import { useBarcode } from 'next-barcode';
import Image from 'next/image';

function App() {
  const { inputRef } = useBarcode({
    value: 'next-barcode',
    options: {
      background: '#ffff00',
    }
  });

  return <Image fill alt="Bar Code" ref={inputRef} />;
};

export default App;