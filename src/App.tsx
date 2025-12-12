import GlobalStyle from "./styles/GlobalStyle.tsx";
import { RouterProvider } from "react-router";
import router from "./router/router.tsx";
import styled from "styled-components";
import Spinner from "./components/Spinner.tsx";
import { useState } from "react";

const Wrapper = styled.div`
    height: 100dvh;
    display: flex;
    justify-content: center;
`;

function App() {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <Wrapper>
            <GlobalStyle />
            {isLoading ? <Spinner /> : <RouterProvider router={router} />}
        </Wrapper>
    );
}

export default App;
