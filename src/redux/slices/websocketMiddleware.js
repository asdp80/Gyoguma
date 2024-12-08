// src/redux/websocketMiddleware.js
import {
    websocketConnected,
    websocketDisconnected,
    websocketMessageReceived,
    websocketSendMessage,
} from './websocketSlice';

const websocketMiddleware = (store) => {
    let socket = null;
    let reconnectInterval = null;

    const connectWebSocket = () => {
        const wsUrl = 'ws://example.com/chat'; // WebSocket 서버 URL
        socket = new WebSocket(wsUrl);

        socket.onopen = () => {
            console.log('WebSocket connected');
            store.dispatch(websocketConnected());
            clearInterval(reconnectInterval); // 연결 성공 시 재연결 중단
        };

        socket.onmessage = (event) => {
            store.dispatch(websocketMessageReceived(JSON.parse(event.data)));
        };

        socket.onclose = () => {
            console.log('WebSocket disconnected, attempting to reconnect...');
            store.dispatch(websocketDisconnected());

            // 일정 시간 후 재연결 시도
            reconnectInterval = setInterval(() => {
                if (!socket || socket.readyState === WebSocket.CLOSED) {
                connectWebSocket();
                }
            }, 5000); // 5초 간격으로 재연결
        };

        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
    };

    return (next) => (action) => {
        switch (action.type) {
            case 'websocket/connect':
                if (!socket || socket.readyState === WebSocket.CLOSED) {
                    connectWebSocket();
            }
            break;

        case websocketSendMessage.type:
            if (socket && socket.readyState === WebSocket.OPEN) {
                socket.send(JSON.stringify(action.payload));
            }
            break;

        case 'websocket/disconnect':
            if (socket) {
                socket.close();
            }
            socket = null;
            clearInterval(reconnectInterval);
            break;

        default:
            break;
        }

        return next(action);
    };
};

export default websocketMiddleware;
