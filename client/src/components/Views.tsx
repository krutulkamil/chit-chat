import {Routes, Route} from "react-router-dom";
import {FC, useContext} from "react";
import Login from "./Login/Login";
import SignUp from "./Login/SignUp";
import {Text} from "@chakra-ui/layout";
import PrivateRoutes from "./PrivateRoutes";
import {AccountContext} from "./AccountContext";
import Home from "./Home/Home";

const Views: FC = (): JSX.Element | null => {

    const {user} = useContext(AccountContext);

    //TODO: React Spinner // Loading screen instead of rendering null

    return user.loggedIn === null ? null : (
        <Routes>
            <Route path="/" element={<Login />}/>
            <Route path="/register" element={<SignUp />}/>
            <Route element={<PrivateRoutes/>}>
                <Route path="/home" element={<Home />}/>
            </Route>
            <Route path="*" element={<Login/>}/>
        </Routes>
    );
};

export default Views;
