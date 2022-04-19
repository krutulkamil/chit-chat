import {Dispatch, SetStateAction, useContext, useEffect} from "react";
import {AccountContext} from "../AccountContext";
import {Message, User} from "./Home";
import {Socket} from "socket.io-client";

const useSocketSetup = (setFriendList: Dispatch<SetStateAction<[] | User[]>>, setMessages: Dispatch<SetStateAction<[] | Message[]>>,socket: Socket) => {
    const {setUser} = useContext(AccountContext);

    useEffect(() => {
        socket.connect();
        socket.on('friends', (friendList: User[]) => {
            setFriendList(friendList);
        });

        socket.on('messages', (messages: Message[]) => {
            setMessages(messages);
        });

        socket.on("dm", message => {
            setMessages(prevMsgs => [message, ...prevMsgs]);
        })

        socket.on("connected", (status: string, username: string) => {
            setFriendList(prevFriends => {
                return [...prevFriends].map(friend => {
                    if (friend.username === username) {
                        friend.connected = status;
                    }
                    return friend;
                });
            });
        });

        socket.on("connect_error", () => {
            setUser({loggedIn: false});
        });

        return () => {
            socket.off("connect_error");
            socket.off("connected");
            socket.off("friends");
            socket.off("messages");
            socket.off("dm");
        };

    }, [setUser, setFriendList, setMessages, socket]);
};

export default useSocketSetup;