import { Outlet, Navigate } from "react-router-dom";
import {FC, useContext} from "react";
import {AccountContext} from "./AccountContext";

const useAuth = () => {
    const {user} = useContext(AccountContext);
    return user && user.loggedIn;
}

const PrivateRoutes: FC = (): JSX.Element => {
    const isAuth = useAuth();
    return isAuth ? <Outlet /> : <Navigate to="/"/>
};

export default PrivateRoutes;