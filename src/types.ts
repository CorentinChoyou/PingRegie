export type Signal = 'A' | 'B' | 'C';

export interface SignalMessage {
  type: Signal;
  timestamp: string;
}

export interface ConnectionState {
  isConnected: boolean;
  error: string | null;
  roomId?: string;
}