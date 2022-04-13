import {SessionSocket} from "./authController";
import redisClient from "../redis";

export const authorizeUser = (socket: SessionSocket, next: Function) => {
    if (!socket.request.session || !socket.request.session.user) {
        console.log("Bad request");
        next(new Error("Not authorized"));
    } else {
        next();
    }
};

export const initializeUser = async (socket: SessionSocket) => {
    socket.user = {...socket.request.session!.user};
    await redisClient.hset(
        `userid:${socket.user.username}`,
        "userid",
        socket.user.userid
    );
    const friendList = await redisClient.lrange(`friends:${socket.user.username}`, 0, -1);

    socket.emit("friends", friendList);
    console.log(
        "userid:", socket.user.userid,
        "username:", socket.user.username
    )
};

export const addFriend = async (socket: SessionSocket, friendName: string, cb: Function) => {
    if (friendName === socket.user!.username) {
        cb({done: false, errorMsg: "Cannot add self!"});
        return;
    }

    const friendUserID = await redisClient.hget(
        `userid:${friendName}`,
        "userid"
    );

    const currentFriendList = await redisClient.lrange(
        `friends:${socket.user!.username}`, 0, -1
    );

    if (!friendUserID) {
        cb({done: false, errorMsg: "User doesn't exist"});
        return;
    }

    if (currentFriendList && currentFriendList.indexOf(friendName) !== -1) {
        cb({done: false, errorMsg: "Friend already added"});
        return;
    }

    await redisClient.lpush(`friends:${socket.user!.username}`, friendName);
    cb({done: true});
};
