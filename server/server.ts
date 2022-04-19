import express, { Application } from "express";
import * as http from 'http';
import {Server, Socket} from 'socket.io';
import helmet from 'helmet';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import 'dotenv/config';
import {sessionMiddleware, wrap, corsConfig} from "./controllers/serverController";

import {SessionSocket} from "./controllers/authController";
import {addFriend, authorizeUser, dm, initializeUser, onDisconnect} from "./controllers/socketController";
import {Message} from "./controllers/socketio/dm";

// express config
const app: Application = express();
const port = 4000;

// socketio config
const server = http.createServer(app);
const io = new Server(server, {
    cors: corsConfig
});

// middlewares
app.use(helmet());
app.use(cors(corsConfig));
app.use(express.json());
app.use(sessionMiddleware);

// routes
app.use("/auth", authRoutes);

// socketio
io.use(wrap(sessionMiddleware));
io.use(authorizeUser);
io.on('connect', (socket: SessionSocket) => {
    initializeUser(socket);

    socket.on("add_friend", (friendName, cb) => {
        addFriend(socket, friendName, cb);
    });

    socket.on("dm", (message: Message) => {
        dm(socket, message)
    });

    socket.on("disconnecting", () => onDisconnect(socket));
});

// connect!
try {
    server.listen(port, (): void => {
        console.log(`Connected successfully on port ${port}`);
    });
} catch (error) {
    console.error(`Error occurred: ${(error as Error).message}`);
}