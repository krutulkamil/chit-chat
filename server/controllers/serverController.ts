import 'dotenv/config';
import session from "express-session";
import redisClient from "../redis";
import connectRedis from "connect-redis";
import {Socket} from "socket.io";

const RedisStore = connectRedis(session);

export const sessionMiddleware = session({
    secret: process.env.COOKIE_SECRET!,
    name: "sid",
    store: new RedisStore({client: redisClient}),
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === "production" ? true : "auto",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    }
});

export const wrap = (expressMiddleware: Function) => (socket: Socket, next: Function) =>
    expressMiddleware(socket.request, {}, next);

export const corsConfig = {
    origin: "http://localhost:3000",
    credentials: true
}