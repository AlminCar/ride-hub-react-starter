import React, { useState } from "react";
import { CostBreakdown } from "./CostBreakdown";

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  breakdown, // Pass breakdown as a prop if available
}) => {
  const [showBreakdown, setShowBreakdown] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg p-6 min-w-[300px] relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        <p className="mb-4">{message}</p>
        {breakdown && !showBreakdown && (
          <button
            className="mb-4 px-3 py-1 bg-blue-100 text-blue-700 rounded"
            onClick={() => setShowBreakdown(true)}
          >
            Show Cost Breakdown
          </button>
        )}
        {breakdown && showBreakdown && (
          <div className="mb-4">
            <CostBreakdown breakdown={breakdown} />
          </div>
        )}
        <div className="flex justify-end">
          <button className="mr-2 px-4 py-2 rounded border" onClick={onClose}>
            Cancel
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
