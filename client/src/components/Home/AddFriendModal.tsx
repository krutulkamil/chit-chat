import {
    Modal, ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/modal";
import {FC, useState, useCallback, useContext} from "react";
import {
    Button, FormControl, FormErrorMessage, FormLabel, Input, Heading
} from "@chakra-ui/react";
import * as Yup from "yup";
import {Form, Formik} from "formik";
import socket from "../../socket";
import {FriendContext, User} from "./Home";

interface ComponentProps {
    isOpen: boolean
    onClose: () => void
}

const AddFriendModal: FC<ComponentProps> = ({isOpen, onClose}) => {
    const [error, setError] = useState("");
    const closeModal = useCallback(
        () => {
            setError("");
            onClose();
        }, [onClose],
    );
    const {setFriendList} = useContext(FriendContext);
    return (
        <Modal isOpen={isOpen} onClose={closeModal} isCentered>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>Add a friend!</ModalHeader>
                <ModalCloseButton/>
                <Formik
                    initialValues={{friendName: ""}}
                    validationSchema={Yup.object({
                        friendName: Yup.string()
                            .required("Username required!")
                            .min(6, "Username too short!")
                            .max(28, "Username too long!"),
                    })}

                    onSubmit={(values, actions) => {
                        socket.emit("add_friend", values.friendName, ({
                                                                          errorMsg,
                                                                          done,
                                                                          newFriend
                                                                      }: { errorMsg: string, done: boolean, newFriend: User }) => {
                            if (done) {
                                setFriendList(c => [newFriend, ...c])
                                closeModal();
                                return;
                            }
                            setError(errorMsg);
                        });
                        actions.resetForm();
                    }}
                >
                    {formik => (
                        <Form>
                            <ModalBody>
                                <Heading as="p" color="red.500" textAlign="center" fontSize="lg">{error}</Heading>
                                <FormControl isInvalid={formik.touched.friendName && Boolean(formik.errors.friendName)}>
                                    <FormLabel fontSize="md">Friend's name</FormLabel>
                                    <Input
                                        placeholder="Enter friend's username..."
                                        autoComplete="off"
                                        {...formik.getFieldProps("friendName")}
                                    />
                                    <FormErrorMessage>{formik.errors.friendName}</FormErrorMessage>
                                </FormControl>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    colorScheme="blue"
                                    mr={3}
                                    type="submit"
                                >
                                    Submit
                                </Button>
                            </ModalFooter>
                        </Form>
                    )}
                </Formik>
            </ModalContent>
        </Modal>
    )
};

export default AddFriendModal;