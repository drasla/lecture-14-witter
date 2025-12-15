import PostTweetForm from "../components/PostTweetForm.tsx";
import styled from "styled-components";
import Timeline from "../components/Timeline.tsx";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 50px;
`;

function Home() {
    return (
        <Wrapper>
            <PostTweetForm />
            <Timeline />
        </Wrapper>
    );
}

export default Home;
