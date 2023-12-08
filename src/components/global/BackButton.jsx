import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';

const BackButton = ({ onClick }) => {
  return (
    <button
      className="bg-sky-400 text-white rounded-full p-2 px-5 hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
      onClick={onClick}
    >
      <FaArrowLeft />
    </button>
  );
};

export default BackButton;
