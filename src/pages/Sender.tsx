import React, { useEffect, useState, useCallback } from 'react';
import { SignalButton } from '../components/SignalButton';
import { ConnectionStatus } from '../components/ConnectionStatus';
import { SendConfirmation } from '../components/SendConfirmation';
import { useSocket } from '../hooks/useSocket';
import type { Signal } from '../types';

export const Sender: React.FC = () => {
  const { connectionState, createRoom, sendSignal } = useSocket();
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    // Create room only once when component mounts
    createRoom();
  }, []); // Empty dependency array ensures this runs only once

  const handleSignal = useCallback((signal: Signal) => {
    sendSignal({
      type: signal,
      timestamp: new Date().toISOString(),
    });
    setShowConfirmation(true);
  }, [sendSignal]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <ConnectionStatus
        isConnected={connectionState.isConnected}
        error={connectionState.error}
      />
      
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Signal Sender</h1>
        
        {connectionState.roomId && (
          <div className="mb-8 text-center">
            <p className="text-gray-600">Room ID:</p>
            <code className="bg-gray-100 px-4 py-2 rounded-lg text-lg">
              {connectionState.roomId}
            </code>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SignalButton
            signal="A"
            onClick={() => handleSignal('A')}
            disabled={!connectionState.isConnected}
          />
          <SignalButton
            signal="B"
            onClick={() => handleSignal('B')}
            disabled={!connectionState.isConnected}
          />
          <SignalButton
            signal="C"
            onClick={() => handleSignal('C')}
            disabled={!connectionState.isConnected}
          />
        </div>
      </div>

      <SendConfirmation 
        show={showConfirmation} 
        onHide={() => setShowConfirmation(false)} 
      />
    </div>
  );
};