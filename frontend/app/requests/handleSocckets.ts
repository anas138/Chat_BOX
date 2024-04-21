import io from "socket.io-client";
export const socketConnection = () => {
  const socket = io("http://localhost:3001");
  return socket;
};

export const socketOn = (endpoint: any, callBack: any) => {
  const socket = socketConnection();
  return socket.on(endpoint, (data: any) => {
    callBack(data);
  });
};

export const socketEmit = (endpoint: any, data: any) => {
  const socket = socketConnection();
  socket.emit(endpoint, data);
};

export const socketDisconnect = () => {
  const socket = socketConnection();
  socket.disconnect();
};
