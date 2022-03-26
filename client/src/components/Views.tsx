import {Routes, Route} from "react-router-dom";
import {FC} from "react";
import Login from "./Login/Login";
import SignUp from "./Login/SignUp";

const Views: FC = (): JSX.Element => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="*" element={<Login />} />
        </Routes>
    );
};

export default Views;
