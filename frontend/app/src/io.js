import { io } from "socket.io-client";
const con_PORT = 'localhost:5000/';

const socket = io(con_PORT);

export default socket
