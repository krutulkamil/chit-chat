import {VStack, Text} from "@chakra-ui/react";
import {TabPanel, TabPanels} from "@chakra-ui/tabs"
import {FriendContext} from "./Home";
import {useContext} from "react";

const Chat = () => {
    const {friendList} = useContext(FriendContext);

    return friendList.length > 0 ? (
        <VStack>
            <TabPanels>
                <TabPanel>friend one</TabPanel>
                <TabPanel>friend two</TabPanel>
            </TabPanels>
        </VStack>
    ) : (
        <VStack
            justify="center"
            pt="5rem" w="100%"
            textAlign="center"
            fontSize="lg"
        >
            <TabPanels>
                <Text>No friends :( Click add friend to start chatting</Text>
            </TabPanels>
        </VStack>
    )
};

export default Chat;