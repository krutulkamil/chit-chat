import React, {
    createContext,
    FC,
    ReactNode,
    useState,
    useEffect,
} from "react";
import { useNavigate } from "react-router-dom";

interface UserInitialState {
    loggedIn: false | null;
}

interface User {
    loggedIn: boolean
    username?: string
    status?: string
}

interface UserContext {
    user: UserInitialState | User
    setUser: React.Dispatch<React.SetStateAction<UserInitialState | User>>
}

export const AccountContext = createContext<UserContext>({} as UserContext);

interface ComponentProps {
    children: ReactNode
}

const UserContext: FC<ComponentProps> = ({children}): JSX.Element => {
    const navigate = useNavigate();
    const [user, setUser] = useState<UserInitialState | User>({loggedIn: null});
    useEffect(() => {
        fetch("http://localhost:4000/auth/login", {
            credentials: "include"
        }).catch(err => {
            setUser({ loggedIn: false });
            return;
        }).then(res => {
            if (!res || !res.ok || res.status >= 400) {
                setUser({ loggedIn: false });
                return;
            }
            return res.json();
        }).then((data: { username: string, loggedIn: boolean }) => {
            if (data === null) {
                setUser({ loggedIn: false });
                return;
            }
            setUser({ ...data });
            navigate("/home");
        })
    }, []);

    return (
        <AccountContext.Provider value={{ user, setUser }}>
            {children}
        </AccountContext.Provider>
    )
};

export default UserContext;