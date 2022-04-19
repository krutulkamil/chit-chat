import {io} from "socket.io-client";
import {User} from "./components/Home/Home";
import {UserInitialState} from "./components/AccountContext";

const socket = (user: any) => io("http://localhost:4000", {
    autoConnect: true,
    withCredentials: true
});

export default socket;