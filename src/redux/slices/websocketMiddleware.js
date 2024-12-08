import {
    websocketConnected,
    websocketStartConnect,
    websocketStartDisconnect,
    websocketDisconnected,
    websocketMessageReceived,
    websocketSendMessage,
    websocketError,
} from "./websocketSlice";

export const createWebSocketMiddleware = (url) => {
let socket;

return (store) => (next) => (action) => {
    const { dispatch } = store;

    if (websocketStartConnect.match(action)) {
        if (socket) socket.close();
        socket = new WebSocket(url);

        socket.onopen = () => dispatch(websocketConnected());
        socket.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                dispatch(websocketMessageReceived(data));
            } catch (e) {
                console.warn("Non-JSON message received:", event.data);
            }
        };
        socket.onclose = () => dispatch(websocketDisconnected());
        socket.onerror = (error) => dispatch(websocketError(error));
    }

    if (websocketSendMessage.match(action)){
        console.log(socket, socket.readyState)
        if (socket && socket.readyState === WebSocket.OPEN) {
            console.log(action.payload)
            socket.send(JSON.stringify(action.payload));
        } else {
            console.error("WebSocket is not connected.");
        }
    }

    if (websocketStartDisconnect.match(action)) {
        if (socket) socket.close();
    }

    return next(action);
};
};
