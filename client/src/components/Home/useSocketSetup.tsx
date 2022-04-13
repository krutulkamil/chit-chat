import {Dispatch, SetStateAction, useContext, useEffect} from "react";
import socket from "../../socket";
import {AccountContext} from "../AccountContext";
import {User} from "./Home";

const useSocketSetup = (setFriendList: Dispatch<SetStateAction<[] | User[]>>) => {
    const {setUser} = useContext(AccountContext);

    useEffect(() => {
        socket.connect();
        socket.on('friends', friendList => {
            setFriendList(friendList);
        });

        socket.on("connected", (status, username) => {
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
        };

    }, [setUser, setFriendList]);
};

export default useSocketSetup;