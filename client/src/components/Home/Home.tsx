import {Grid, GridItem, Tabs} from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import React, {createContext, useContext, useEffect, useState} from "react";
import useSocketSetup from "./useSocketSetup";
import socketConn from "../../socket"
import {AccountContext} from "../AccountContext";
import {Socket} from "socket.io-client";

export interface User {
    username: string
    connected: string
    userid: string
}

export interface FriendsContext {
    friendList: User[]
    setFriendList: React.Dispatch<React.SetStateAction<User[]>>
}

export interface Message {
    content: string
    from: string | null
    to: string
}

export interface MessageContext {
    messages: Message[]
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>
}

export interface SocketContext {
    socket: Socket
}

export const FriendContext = createContext<FriendsContext>({} as FriendsContext);
export const MessagesContext = createContext<MessageContext>({} as MessageContext);
export const SocketContext = createContext<SocketContext>({} as SocketContext);

const Home = () => {
    const [friendList, setFriendList] = useState<User[] | []>([]);
    const [messages, setMessages] = useState<Message[] | []>([]);
    const [friendIndex, setFriendIndex] = useState(0);
    const {user} = useContext(AccountContext);

    const [socket, setSocket] = useState(() => socketConn(user));
    useEffect(() => {
        setSocket(() => socketConn(user));
    }, [user]);
    useSocketSetup(setFriendList, setMessages, socket);

    return (
        <FriendContext.Provider value={{friendList, setFriendList}}>
            <SocketContext.Provider value={{socket}}>
                {/*// @ts-ignore*/}
                <Grid templateColumns="repeat(10, 1fr)" h="100vh" as={Tabs} onChange={(index) => setFriendIndex(index)}>
                    <GridItem colSpan={3} borderRight="1px solid grey">
                        <Sidebar/>
                    </GridItem>
                    <GridItem colSpan={7} maxH="100vh">
                        <MessagesContext.Provider value={{messages, setMessages}}>
                            {/*// @ts-ignore*/}
                            <Chat userid={friendList[friendIndex]?.userid}/>
                        </MessagesContext.Provider>
                    </GridItem>
                </Grid>
            </SocketContext.Provider>
        </FriendContext.Provider>
    )
};

export default Home;