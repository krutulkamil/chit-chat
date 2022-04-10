import express, { Application, Request, Response } from "express";
import * as http from 'http';
import {Server} from 'socket.io';
import helmet from 'helmet';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import 'dotenv/config';
import {sessionMiddleware, wrap, corsConfig} from "./controllers/serverController";

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
io.on('connect', (socket) => {
    console.log(socket.id);
    // @ts-ignore
    console.log(socket.request.session.user.username);
});

// connect!
try {
    server.listen(port, (): void => {
        console.log(`Connected successfully on port ${port}`);
    });
} catch (error) {
    console.error(`Error occurred: ${(error as Error).message}`);
}