import React from 'react';

function Overlay({ showOverlay, closeOverlay }) {
  return (
    showOverlay && (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
        <div className="max-w-screen-md w-full bg-white rounded-lg shadow-lg">
          {/* Your overlay content goes here */}
          <button className="p-2 bg-sky-400 text-white rounded-md" onClick={closeOverlay}>
            Close
          </button>
        </div>
      </div>
    )
  );
}

export default Overlay;
