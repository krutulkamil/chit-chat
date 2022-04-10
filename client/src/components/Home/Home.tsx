import {Grid, GridItem, Tabs} from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import React, {createContext, ReactNode, useState} from "react";
import useSocketSetup from "./useSocketSetup";

const initialData = [
    {
        username: "Kamil Krutul",
        connected: false
    },
    {
        username: "Karolina Skibińska",
        connected: true
    },
    {
        username: "John Doe",
        connected: true
    }
];

interface User {
    username: string;
    connected: boolean;
}

export type FriendsContext = {
    friendList: User[]
    setFriendList: React.Dispatch<React.SetStateAction<User[]>>
}

export const FriendContext = createContext<FriendsContext>({} as FriendsContext);

const Home = () => {
    const [friendList, setFriendList] = useState<User[] | []>(initialData);
    useSocketSetup();

    return (

        <FriendContext.Provider value={{friendList, setFriendList}}>
            <Grid templateColumns="repeat(10, 1fr)" h="100vh" as={Tabs}>
                <GridItem colSpan={3} borderRight="1px solid grey">
                    <Sidebar/>
                </GridItem>
                <GridItem colSpan={7}>
                    <Chat/>
                </GridItem>
            </Grid>
        </FriendContext.Provider>
    )
};

export default Home;