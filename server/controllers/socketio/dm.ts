import {SessionSocket} from "../authController";
import redisClient from "../../redis";

export interface Message {
    to: string
    from: string
    content: string
}

export const dm = async (socket: SessionSocket, message: Message) => {
    message.from = socket.user!.userid;
    const messageString = [message.to, message.from, message.content].join(".");

    await redisClient.lpush(`chat:${message.to}`, messageString);
    await redisClient.lpush(`chat:${message.from}`, messageString);

    socket.to(message.to).emit("dm", message);
};