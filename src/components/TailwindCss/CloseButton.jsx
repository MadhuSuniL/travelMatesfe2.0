import React from 'react';

const CloseButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="close-button absolute top-2 right-2 p-2 text-gray-600 hover:text-gray-800 transition duration-300 ease-in-out"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  );
};

export default CloseButton;
