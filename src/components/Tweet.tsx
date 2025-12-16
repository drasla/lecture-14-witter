import type { TweetType } from "./Timeline.tsx";
import { auth } from "../firebase.ts";
import styled from "styled-components";

type Props = {
    item: TweetType;
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    border: 1px solid white;
    border-radius: 15px;
`;

const Username = styled.span`
    font-weight: 600;
    font-size: 15px;
`;

const Text = styled.p`
    margin: 10px 0;
    font-size: 18px;
`;

const DeleteBtn = styled.button`
    background-color: tomato;
    color: white;
    font-weight: 600;
    border: 0;
    font-size: 12px;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
`;

function Tweet({ item }: Props) {
    const user = auth.currentUser;

    return (
        <Wrapper>
            <Username>{item.username}</Username>
            <Text>{item.tweet}</Text>
            {/* 접속한 사용자와, 글 작성자가 동일할 때에는 삭제 버튼을 출력 */}
            {user?.uid === item.userId && <DeleteBtn>Delete</DeleteBtn>}
        </Wrapper>
    );
}

export default Tweet;
