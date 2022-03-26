import {
    VStack,
    ButtonGroup,
    FormControl,
    FormLabel,
    Button,
    FormErrorMessage,
    Input,
    Heading
} from "@chakra-ui/react";
import {Form, Formik} from "formik";
import * as Yup from "yup";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    return (
        <Formik
            initialValues={{ username: "", password: "" }}
            validationSchema={Yup.object({
                username: Yup.string()
                    .required("Username required!")
                    .min(6, "Username too short!")
                    .max(28, "Username too long!"),
                password: Yup.string()
                    .required("Password required!")
                    .min(6, "Password too short!")
                    .max(28, "Password too long!"),
            })}
            onSubmit={(values, actions) => {
                alert(JSON.stringify(values, null, 2));
                actions.resetForm();
            }}
        >
            {formik => (
                <VStack
                    as={Form}
                    w={{base: "90%", md: "500px"}}
                    m="auto"
                    justify="center"
                    h="100vh"
                    spacing="1rem"
                >
                    <Heading>Log In</Heading>

                    <FormControl isInvalid={formik.touched.username && Boolean(formik.errors.username)}>
                        <FormLabel fontSize="lg">Username</FormLabel>
                        <Input
                            placeholder="Enter username"
                            autoComplete="off"
                            size="lg"
                            {...formik.getFieldProps("username")}
                        />
                        <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={formik.touched.password && Boolean(formik.errors.password)}>
                        <FormLabel fontSize="lg">Password</FormLabel>
                        <Input
                            type="password"
                            placeholder="Enter password"
                            autoComplete="off"
                            size="lg"
                            {...formik.getFieldProps("password")}
                        />
                        <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
                    </FormControl>

                    <ButtonGroup pt="1rem">
                        <Button colorScheme="teal" type="submit">Log In</Button>
                        <Button onClick={() => navigate('/register')}>Create Account</Button>
                    </ButtonGroup>
                </VStack>
            )}
        </Formik>
    );
};

export default Login;
