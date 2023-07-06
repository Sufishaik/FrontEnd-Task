import io from "socket.io-client";
const con_PORT = 'http://localhost:5000/';

let socket;
export default socket = io(con_PORT);