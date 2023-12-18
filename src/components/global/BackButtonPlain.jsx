import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';

const BackButton = ({ onClick }) => {
  return (
    <button
      className="bg-transparent text-gray-700 rounded-full p-2 px-5"
      onClick={onClick}
    >
      <FaArrowLeft />
    </button>
  );
};

export default BackButton;
