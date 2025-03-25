import React, { useState } from 'react';
import { ConnectionStatus } from '../components/ConnectionStatus';
import { MessageDisplay } from '../components/MessageDisplay';
import { useSocket } from '../hooks/useSocket';
import type { SignalMessage } from '../types';

export const Receiver: React.FC = () => {
  const [messages, setMessages] = useState<SignalMessage[]>([]);
  const [roomInput, setRoomInput] = useState('');
  const { connectionState, joinRoom, socket } = useSocket();

  React.useEffect(() => {
    if (socket) {
      socket.on('signal_received', (signal: SignalMessage) => {
        setMessages(prev => [...prev, signal]);
      });
    }
  }, [socket]);

  const handleJoinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (roomInput.trim()) {
      joinRoom(roomInput.trim());
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <ConnectionStatus
        isConnected={connectionState.isConnected}
        error={connectionState.error}
      />
      
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Signal Receiver</h1>

        {!connectionState.roomId && (
          <form onSubmit={handleJoinRoom} className="mb-8">
            <div className="flex gap-4 justify-center">
              <input
                type="text"
                value={roomInput}
                onChange={(e) => setRoomInput(e.target.value)}
                placeholder="Enter Room ID"
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Join Room
              </button>
            </div>
          </form>
        )}

        <MessageDisplay messages={messages} />
      </div>
    </div>
  );
};