import {IncomingMessage} from "http";
import {attemptLogin} from "./express/attemptLogin";
import {attemptRegister} from "./express/attemptRegister";
import {handleLogin} from "./express/handleLogin";
import {rateLimiter} from "./express/rateLimiter";
import {validateForm} from "./express/validateForm";
import {SessionData} from "express-session";
import {Socket} from "socket.io";

export interface User {
    username: string;
    id: number;
    userid: string;
}

declare module 'express-session' {
    interface SessionData {
        user: User;
    }
}

export interface SessionIncomingMessage extends IncomingMessage {
    session?: SessionData
}

export interface SessionSocket extends Socket {
    request: SessionIncomingMessage
    user?: User;
}

export {attemptLogin, attemptRegister, handleLogin, rateLimiter, validateForm};