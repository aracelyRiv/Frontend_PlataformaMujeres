import React, { useState } from "react";
import Checkbox from "../ui/Checkbox";
import Modal from "../ui/Modal";

export default function CheckboxConModal({ 
  id, 
  name,
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
        name={name || id}
        checked={checked}
        onChange={onChange}
        error={error}
        label={
          <span>
            {label}{" "}
            {modalContent && (
              <button
                type="button"
                className="text-sm text-blue-600 hover:underline font-medium"
                onClick={(e) => {
                  e.preventDefault();
                  setIsModalOpen(true);
                }}
              >
                Ver más
              </button>
            )}
          </span>
        }
      />

      {isModalOpen && modalContent && (
        <Modal onClose={() => setIsModalOpen(false)} title="Términos y Condiciones">
          {modalContent}
        </Modal>
      )}
    </>
  );
}