import React, { useState, useEffect } from 'react';

const Toast = ({ message, duration }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let timeoutId;

    if (!isVisible) {
      setIsVisible(true);
      timeoutId = setTimeout(() => setIsVisible(false), duration);
    }

    return () => clearTimeout(timeoutId);
  }, [duration, isVisible]);

  return (
    <div
      className={`toast fixed bottom-0 right-0 mb-4 mr-4 bg-sky-500 text-white py-2 px-4 rounded-full z-50 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      onAnimationEnd={() => !isVisible && setIsVisible(false)}
    >
      <div className="toast-message">{message}</div>
    </div>
  );
};

export default Toast;
