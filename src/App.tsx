import GlobalStyle from "./styles/GlobalStyle.tsx";
import { RouterProvider } from "react-router";
import router from "./router/router.tsx";
import styled from "styled-components";
import Spinner from "./components/Spinner.tsx";
import { useEffect, useState } from "react";
import { auth } from "./firebase.ts";

const Wrapper = styled.div`
    height: 100dvh;
    display: flex;
    justify-content: center;
`;

function App() {
    const [isLoading, setIsLoading] = useState(true);

    const init = () => {
        return auth.authStateReady().then(() => setIsLoading(false));
    };

    useEffect(() => {
        // Promise<void>이기 때문에 실패할 확률이 있음. (초기화가 안될 가능성)
        // firebase에 접속을 못하는 상황이 될 수 있으나,
        // 그렇게 되면 아예 이 프로젝트는 구동할 이유가 없기 때문에 catch를 써주지 않았음
        init().then(() => {});
    }, []);

    return (
        <Wrapper>
            <GlobalStyle />
            {isLoading ? <Spinner /> : <RouterProvider router={router} />}
        </Wrapper>
    );
}

export default App;
