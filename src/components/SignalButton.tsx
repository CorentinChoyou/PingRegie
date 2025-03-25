import React from 'react';
import type { Signal } from '../types';

interface Props {
  signal: Signal;
  onClick: () => void;
  disabled: boolean;
}

export const SignalButton: React.FC<Props> = ({ signal, onClick, disabled }) => {
  const colors = {
    A: 'bg-blue-500 hover:bg-blue-600',
    B: 'bg-green-500 hover:bg-green-600',
    C: 'bg-purple-500 hover:bg-purple-600',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${colors[signal]}
        text-white font-bold py-4 px-8 rounded-lg
        transform transition-all duration-200
        active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed
        shadow-lg hover:shadow-xl
      `}
    >
      Signal {signal}
    </button>
  );
};