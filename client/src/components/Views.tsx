import {Routes, Route} from "react-router-dom";
import {FC, useContext} from "react";
import Login from "./Login/Login";
import SignUp from "./Login/SignUp";
import {Text} from "@chakra-ui/layout";
import PrivateRoutes from "./PrivateRoutes";
import {AccountContext} from "./AccountContext";

const Views: FC = (): JSX.Element | null => {
    const ctx = useContext(AccountContext);
    if (!ctx) return null;
    const {user} = ctx;

    //TODO: React Spinner // Loading screen instead of rendering null

    return user.loggedIn === null ? null : (
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/register" element={<SignUp/>}/>
            <Route element={<PrivateRoutes/>}>
                <Route path="/home" element={<Text>Welcome Home!</Text>}/>
            </Route>
            <Route path="*" element={<Login/>}/>
        </Routes>
    );
};

export default Views;
