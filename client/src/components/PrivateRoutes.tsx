import { Outlet, Navigate } from "react-router-dom";
import {FC, useContext} from "react";
import {AccountContext} from "./AccountContext";

const useAuth = () => {
    const ctx = useContext(AccountContext);
    if (!ctx) return null;
    const {user} = ctx;

    return user && user.loggedIn;
}

const PrivateRoutes: FC = (): JSX.Element => {
    const isAuth = useAuth();
    return isAuth ? <Outlet /> : <Navigate to="/"/>
};

export default PrivateRoutes;