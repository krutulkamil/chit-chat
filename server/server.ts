import express, { Application, Request, Response } from "express";
import * as http from 'http';
import {Server} from 'socket.io';
import helmet from 'helmet';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import session from 'express-session';
import 'dotenv/config';

const app: Application = express();
const port = 4000;

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true
    }
});

app.use(helmet());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(express.json());
app.use(session({
    secret: process.env.COOKIE_SECRET!,
    name: "sid",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.ENVIRONMENT === "production" ? true : "auto",
        httpOnly: true,
        // expires: 1000 * 60 * 60 * 24 * 7,
        sameSite: process.env.ENVIRONMENT === "production" ? "none" : "lax",
    }
}));
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoutes)

io.on('connect', (socket) => {})

app.get("/", async (req: Request, res: Response): Promise<Response> => {
        return res.status(200).send({
            message: "Hello World!",
        });
    }
);

try {
    app.listen(port, (): void => {
        console.log(`Connected successfully on port ${port}`);
    });
} catch (error) {
    console.error(`Error occurred: ${(error as Error).message}`);
}