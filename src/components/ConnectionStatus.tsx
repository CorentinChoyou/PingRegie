import React from 'react';
import { Wifi, WifiOff } from 'lucide-react';

interface Props {
  isConnected: boolean;
  error: string | null;
}

export const ConnectionStatus: React.FC<Props> = ({ isConnected, error }) => {
  return (
    <div className="fixed top-4 right-4 flex items-center gap-2">
      {isConnected ? (
        <div className="flex items-center text-green-600">
          <Wifi className="w-5 h-5 mr-1" />
          <span>Connected</span>
        </div>
      ) : (
        <div className="flex items-center text-red-600">
          <WifiOff className="w-5 h-5 mr-1" />
          <span>Disconnected</span>
        </div>
      )}
      {error && (
        <div className="text-red-600 text-sm ml-2">
          Error: {error}
        </div>
      )}
    </div>
  );
};