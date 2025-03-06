// src/services/ws.js
import { WS_BASE_URL } from '../utils/constants';

class WebSocketService {
  constructor() {
    this.socket = null;
    this.listeners = new Map();
  }

  connect() {
    this.socket = new WebSocket(WS_BASE_URL);

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const listeners = this.listeners.get(data.type) || [];
      listeners.forEach(callback => callback(data.payload));
    };

    this.socket.onclose = () => {
      setTimeout(() => this.connect(), 5000);
    };
  }

  subscribe(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(callback);
  }

  unsubscribe(event, callback) {
    const listeners = this.listeners.get(event);
    if (listeners) {
      this.listeners.set(
        event,
        listeners.filter(cb => cb !== callback)
      );
    }
  }
}

export const ws = new WebSocketService();