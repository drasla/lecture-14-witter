import type { TweetType } from "./Timeline.tsx";
import { auth, db, storage } from "../firebase.ts";
import styled from "styled-components";
import { deleteDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router";
import { deleteObject, ref } from "firebase/storage";

type Props = {
    item: TweetType;
};

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
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

const Column = styled.div`
`;

const Photo = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 15px;
`;

function Tweet({ item }: Props) {
    const navigate = useNavigate();

    const user = auth.currentUser;

    const onDelete = async () => {
        // 사용자에게 삭제할건지를 재확인
        const ok = confirm("정말 이 트윗을 삭제하실건가요?");
        if (!ok) return;

        try {
            // 재확인 시 진짜 삭제한다면 firestore에서 삭제 처리
            await deleteDoc(doc(db, "tweets", item.id));

            if (item.photo || user?.uid) {
                // 파일 경로에 user.uid가 들어갔어야 함
                // 이는 2개 변수에서 값을 뽑아올 수 있는데
                // 1. 우리가 상단에서 준비한 user라는 값을 통해서 user.uid 를 가져오면 되나
                //    user는 User | null 타입이라 null이 아닐 때를 조건으로 걸어줘야 함
                // 2. 글정보 (item) 에서 item.userId에 사용자 정보가 존재함
                const photoRef = ref(storage, `tweets/${item.userId}/${item.id}`);

                // 준비된 파일 정보를 통해 storage에 삭제 요청
                await deleteObject(photoRef);
            }

            // 이후 새로고침
            navigate(0);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Wrapper>
            <Column>
                <Username>{item.username}</Username>
                <Text>{item.tweet}</Text>
                {/* 접속한 사용자와, 글 작성자가 동일할 때에는 삭제 버튼을 출력 */}
                {user?.uid === item.userId && <DeleteBtn onClick={onDelete}>Delete</DeleteBtn>}
            </Column>

            {item.photo && <Column><Photo src={item.photo} /></Column>}
        </Wrapper>
    );
}

export default Tweet;
