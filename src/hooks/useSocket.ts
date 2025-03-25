import { useEffect, useRef, useState, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import type { ConnectionState, SignalMessage } from '../types';

// Use environment variable for socket URL, fallback to localhost for development
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3000';

export function useSocket() {
  const socket = useRef<Socket | null>(null);
  const [connectionState, setConnectionState] = useState<ConnectionState>({
    isConnected: false,
    error: null
  });

  useEffect(() => {
    // Only create the socket connection if it doesn't exist
    if (!socket.current) {
      socket.current = io(SOCKET_URL);

      socket.current.on('connect', () => {
        setConnectionState(prev => ({ ...prev, isConnected: true, error: null }));
      });

      socket.current.on('disconnect', () => {
        setConnectionState(prev => ({ ...prev, isConnected: false }));
      });

      socket.current.on('connect_error', (error) => {
        setConnectionState(prev => ({ ...prev, error: error.message }));
      });

      socket.current.on('room_created', (roomId) => {
        setConnectionState(prev => ({ ...prev, roomId }));
      });

      socket.current.on('room_joined', (roomId) => {
        setConnectionState(prev => ({ ...prev, roomId }));
      });

      socket.current.on('connection_established', () => {
        setConnectionState(prev => ({ ...prev, isConnected: true, error: null }));
      });

      socket.current.on('peer_disconnected', () => {
        setConnectionState(prev => ({ ...prev, isConnected: false, error: 'Peer disconnected' }));
      });
    }

    // Cleanup function
    return () => {
      if (socket.current) {
        socket.current.disconnect();
        socket.current = null;
      }
    };
  }, []); // Empty dependency array is fine here as we're using ref

  const createRoom = useCallback(() => {
    socket.current?.emit('create_room');
  }, []);

  const joinRoom = useCallback((roomId: string) => {
    socket.current?.emit('join_room', roomId);
  }, []);

  const sendSignal = useCallback((signal: SignalMessage) => {
    if (connectionState.roomId) {
      socket.current?.emit('signal', {
        roomId: connectionState.roomId,
        signal
      });
    }
  }, [connectionState.roomId]);

  return {
    connectionState,
    createRoom,
    joinRoom,
    sendSignal,
    socket: socket.current
  };
}