import styled from "styled-components";
import { auth, storage } from "../firebase.ts";
import { type ChangeEvent, useState } from "react";
import type { TweetType } from "../components/Timeline.tsx";
import { FaUser } from "react-icons/fa";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    width: 100%;
`;

const AvatarUpload = styled.label`
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: #1d9bf0;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    
    // 본인의 영역을 넘어간 자식 요소들을 안 보이도록 처리
    overflow: hidden;
`;

const AvatarInput = styled.input`
    display: none;
`;

const Name = styled.span`
    font-size: 22px;
`;

const TweetList = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const AvatarImage = styled.img`
    width: 100%;
`;

function Profile() {
    const user = auth.currentUser;
    const [avatar, setAvatar] = useState(user?.photoURL);
    const [list, setList] = useState<TweetType[]>([]);

    const onAvatarChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target;
        if (!user) return;

        if (files && files.length === 1) {
            const file = files[0];

            // 파일업로드 1. 파일 경로에 대한 정보를 작성
            const locationRef = ref(storage, `avatars/${user.uid}`);
            // 파일업로드 2. 파일을 업로드하고
            //             만약, 같은 파일명의 파일을 업로드 하더라도, 묻지도 따지지도 않고 덮어쓰기
            const result = await uploadBytes(locationRef, file);
            // 파일업로드 3. 파일 업로드된 경로를 받아옴
            const avatarUrl = await getDownloadURL(result.ref);

            // 업로드가 끝난 URL로 화면에 출력
            setAvatar(avatarUrl);
            // 업로드가 끝난 URL로 사용자 정보를 업데이트
            await updateProfile(user, { photoURL: avatarUrl });
        }
    };

    return (
        <Wrapper>
            <AvatarUpload htmlFor={"avatar"}>
                {avatar ? <AvatarImage src={avatar} /> : <FaUser size={40} />}
            </AvatarUpload>
            <AvatarInput type={"file"} id={"avatar"} accept={"image/*"} onChange={onAvatarChange} />
            <Name>이름</Name>

            <TweetList>트윗 내용들</TweetList>
        </Wrapper>
    );
}

export default Profile;
