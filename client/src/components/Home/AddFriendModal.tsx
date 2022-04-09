import {Modal} from "@chakra-ui/modal";
import {FC} from "react";
import {
    Button, FormControl, FormErrorMessage, FormLabel, Input,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/react";
import * as Yup from "yup";
import {Form, Formik} from "formik";

interface ComponentProps {
    isOpen: boolean
    onClose: () => void
}

const AddFriendModal: FC<ComponentProps> = ({isOpen, onClose}) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
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
                        onClose();
                        actions.resetForm();
                    }}
                >
                    {formik => (
                        <Form>
                            <ModalBody>
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