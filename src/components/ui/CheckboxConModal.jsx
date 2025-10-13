import React, { useState } from "react";
import Checkbox from "../ui/Checkbox";
import Modal from "../ui/Modal";

export default function CheckboxConModal({ 
  id, 
  label, 
  modalContent, 
  checked, 
  onChange, 
  error 
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Checkbox
        id={id}
        checked={checked}
        onChange={onChange}
        error={error}
        label={
          <span>
            {label}{" "}
            {modalContent && (
              <a
                href="#"
                className="text-sm text-blue-600 hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                  setIsModalOpen(true);
                }}
              >
                Ver términos
              </a>
            )}
          </span>
        }
      />

      {isModalOpen && modalContent && (
        <Modal onClose={() => setIsModalOpen(false)} title="Términos y Condiciones">
          <div className="p-4 text-sm text-gray-700">{modalContent}</div>
        </Modal>
      )}
    </>
  );
}