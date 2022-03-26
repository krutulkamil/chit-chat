import React, {FC} from 'react';
import ToggleColorMode from "./components/ToggleColorMode";
import Views from "./components/Views";

const App: FC = (): JSX.Element => {
    return (
        <>
            <Views />
            <ToggleColorMode />
        </>
    )
}

export default App;
