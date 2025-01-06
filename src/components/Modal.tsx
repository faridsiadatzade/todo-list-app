import React, { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-500">
      <div className="bg-[#37052569] rounded-lg shadow-lg p-6 w-96 z-1000">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button className="hover:text-white text-xl" onClick={onClose}>
            ✖
          </button>
        </div>
        <div className="space-y-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
