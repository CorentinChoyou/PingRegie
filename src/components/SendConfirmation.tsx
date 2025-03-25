import React, { useEffect } from 'react';
import { CheckCircle } from 'lucide-react';

interface Props {
  show: boolean;
  onHide: () => void;
}

export const SendConfirmation: React.FC<Props> = ({ show, onHide }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onHide();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [show, onHide]);

  if (!show) return null;

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white px-8 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-fade-in z-50">
      <CheckCircle className="w-8 h-8" />
      <span className="text-xl font-semibold">Signal sent successfully!</span>
    </div>
  );
};