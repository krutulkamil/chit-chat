import {SessionSocket} from "./authController";

export const authorizeUser = (socket: SessionSocket, next: Function) => {
    if (!socket.request.session || !socket.request.session.user) {
        console.log("Bad request");
        next(new Error("Not authorized"));
    } else {
        next();
    }
}