import { useState } from 'react';
import CloseButton from './CloseButton';

const Modal = ({ isOpen, onClose, title, children, footer }) => {
  return (
    <div
      className={`fixed inset-0 flex items-start justify-center z-50 transition-opacity ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="modal-overlay absolute inset-0 bg-black opacity-50 transition-opacity"></div>

      <div className="tra modal-container bg-white w-11/12 md:max-w-md mx-auto rounded-md shadow-xl z-50 overflow-y-auto transform transition-transform mt-10">
        {/* Modal Header */}
        <div className="modal-header py-4 flex justify-between px-5">
          <h3 className="text-xl font-semibold">{title}</h3>
          <CloseButton onClick={onClose} />
        </div>
        {/* Modal Content */}
        <div className="modal-content py-4 px-6">{children}</div>
        {/* Modal Footer */}
        {footer && <div className="modal-footer py-4">{footer}</div>}
      </div>
    </div>
  );
};

export default Modal;
