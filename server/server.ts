import express, { Application, Request, Response } from "express";
import * as http from 'http';
import {Server, Socket} from 'socket.io';
import helmet from 'helmet';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import 'dotenv/config';
import {sessionMiddleware, wrap, corsConfig} from "./controllers/serverController";
import {SessionSocket} from "./controllers/authController";
import {authorizeUser} from "./controllers/socketController";

// express config
const app: Application = express();
const port = 4000;

// socket.io config
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

// socket.io
io.use(wrap(sessionMiddleware));
io.use(authorizeUser);
io.on('connect', (socket: SessionSocket) => {
    console.log("USERID:", socket.user!.userid);
    console.log("USERNAME:", socket.user!.username);
});

// connect!
try {
    server.listen(port, (): void => {
        console.log(`Connected successfully on port ${port}`);
    });
} catch (error) {
    console.error(`Error occurred: ${(error as Error).message}`);
}