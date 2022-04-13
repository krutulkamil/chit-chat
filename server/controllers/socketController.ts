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
    socket.join(socket.user.userid);
    await redisClient.hset(
        `userid:${socket.user.username}`,
        "userid",
        socket.user.userid,
        "connected",
        "true"
    );
    const friendList = await redisClient.lrange(`friends:${socket.user.username}`, 0, -1);

    const parsedFriendList = await parseFriendList(friendList);
    const friendRooms = parsedFriendList.map(friend => friend.userid);

    if (friendRooms.length > 0) {
        socket.to(friendRooms).emit("connected", true, socket.user!.username);
    }

    console.log(`${socket.user.username} friends:`, parsedFriendList);
    socket.emit("friends", parsedFriendList);
};

export const addFriend = async (socket: SessionSocket, friendName: string, cb: Function) => {
    if (friendName === socket.user!.username) {
        cb({done: false, errorMsg: "Cannot add self!"});
        return;
    }

    const friend = await redisClient.hgetall(`userid:${friendName}`);

    const currentFriendList = await redisClient.lrange(
        `friends:${socket.user!.username}`, 0, -1
    );

    if (!friend) {
        cb({done: false, errorMsg: "User doesn't exist"});
        return;
    }

    if (currentFriendList && currentFriendList.indexOf(friendName) !== -1) {
        cb({done: false, errorMsg: "Friend already added"});
        return;
    }

    await redisClient.lpush(`friends:${socket.user!.username}`, [friendName, friend.userid].join("."));
    cb({done: true});

    const newFriend = {
        username: friendName,
        userid: friend.userid,
        connected: friend.connected,
    };

    cb({ done: true, newFriend });
};

export const onDisconnect = async (socket: SessionSocket) => {
    await redisClient.hset(
        `userid:${socket.user!.username}`,
        "connected",
        "false"
    );
    const friendList = await redisClient.lrange(`friends:${socket.user!.username}`, 0, -1)
    const friendRooms = await parseFriendList(friendList)
        .then(friends => friends.map((friend) => friend.userid));

    socket.to(friendRooms).emit("connected", false, socket.user!.username);
};

const parseFriendList = async (friendList: string[]) => {
    const newFriendList = [];
    for (let friend of friendList) {
        const parsedFriend = friend.split(".");

        const friendConnected = await redisClient.hget(`userid:${parsedFriend[0]}`, "connected");

        newFriendList.push({
            username: parsedFriend[0],
            userid: parsedFriend[1],
            connected: friendConnected
        });
    }
    return newFriendList;
}