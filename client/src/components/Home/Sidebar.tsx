import {Button, Heading, HStack, VStack, Divider, TabList, Tab, Text, Circle, useDisclosure} from "@chakra-ui/react";
import {ChatIcon} from "@chakra-ui/icons";
import React, {useContext} from "react";
import {FriendContext} from "./Home";
import AddFriendModal from "./AddFriendModal";

const Sidebar = () => {
    const {friendList, setFriendList} = useContext(FriendContext);
    const {isOpen, onOpen, onClose} = useDisclosure();

    return (
        <>
            <VStack py="1.4rem">
                <HStack justify="space-evenly" w="100%">
                    <Heading size="md">Add Friend</Heading>
                    <Button onClick={onOpen}>
                        <ChatIcon/>
                    </Button>
                </HStack>
                <Divider/>
                <VStack as={TabList}>
                    {friendList!.map((friend, idx) => (
                        <HStack key={idx} as={Tab}>
                            <Circle bg={friend.connected ? "green.700" : "red.500"} size="20px"/>
                            <Text>{friend.username}</Text>
                        </HStack>
                    ))}
                </VStack>
            </VStack>
            <AddFriendModal isOpen={isOpen} onClose={onClose}/>
        </>
    )
};

export default Sidebar;