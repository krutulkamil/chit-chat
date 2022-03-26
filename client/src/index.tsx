import {ColorModeScript} from "@chakra-ui/color-mode";
import {ChakraProvider} from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import theme from "./theme";
import {BrowserRouter} from "react-router-dom";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <ChakraProvider theme={theme}>
                <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
                <App/>
            </ChakraProvider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
);