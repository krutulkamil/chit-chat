import {SessionSocket} from "./authController";
import redisClient from "../redis";

export const authorizeUser = (socket: SessionSocket, next: Function) => {
    if (!socket.request.session || !socket.request.session.user) {
        console.log("Bad request");
        next(new Error("Not authorized"));
    } else {
        socket.user = {...socket.request.session.user};
        redisClient.hset(`userid:${socket.user.username}`, "userid", socket.user.userid)
        next();
    }
};
