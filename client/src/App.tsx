import React, {FC} from 'react';
import ToggleColorMode from "./components/ToggleColorMode";
import Views from "./components/Views";
import UserContext from "./components/AccountContext";

const App: FC = (): JSX.Element => {
    return (
        <UserContext>
            <Views />
            <ToggleColorMode />
        </UserContext>
    )
}

export default App;
