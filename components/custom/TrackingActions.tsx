// components/custom/TrackingActions.tsx
'use client';

import React from 'react';

interface TrackingActionsProps {
  trackingCode: string;
}

export default function TrackingActions({
  trackingCode,
}: TrackingActionsProps) {
  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(trackingCode)
        .then(() => {
          // Optional: Show a toast notification here
          console.log('Tracking code copied to clipboard');
        })
        .catch((err) => {
          console.error('Failed to copy text: ', err);
        });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex items-center gap-3">
      <button
        className="text-xs bg-emerald-50 border border-emerald-100 text-emerald-700 px-2 py-1 rounded hover:bg-emerald-100 transition-colors"
        onClick={handleCopy}
        type="button"
      >
        Copy
      </button>
      <button
        className="text-xs bg-green-50 border border-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-100 transition-colors"
        onClick={handlePrint}
        type="button"
      >
        Print
      </button>
    </div>
  );
}
