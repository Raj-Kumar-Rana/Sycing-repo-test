import React from 'react';

interface SquareProps {
  value: string | null;
  onClick: () => void;
}

const Square: React.FC<SquareProps> = ({ value, onClick }) => {
  return (
    <button 
      className="square border-2 border-gray-400 w-20 h-20 text-3xl font-bold" 
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default Square;
