import React from 'react';
import { format } from 'date-fns';
import type { SignalMessage } from '../types';

interface Props {
  messages: SignalMessage[];
}

export const MessageDisplay: React.FC<Props> = ({ messages }) => {
  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-4 min-h-[400px] h-[60vh]">
      <h2 className="text-lg font-semibold mb-4">Received Signals</h2>
      
      <div className="h-full overflow-y-auto space-y-2">
        {messages.length === 0 ? (
          <p className="text-gray-500 text-center">No signals received yet</p>
        ) : (
          <>
            {[...messages].reverse().map((msg, index) => (
              <div
                key={index}
                className={`
                  p-3 rounded-lg animate-fade-in
                  ${msg.type === 'A' ? 'bg-blue-100' : ''}
                  ${msg.type === 'B' ? 'bg-green-100' : ''}
                  ${msg.type === 'C' ? 'bg-purple-100' : ''}
                `}
              >
                <div className="font-medium">Signal {msg.type}</div>
                <div className="text-sm text-gray-600">
                  {format(new Date(msg.timestamp), 'HH:mm:ss.SSS')}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};