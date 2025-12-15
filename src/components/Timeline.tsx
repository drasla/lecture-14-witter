import styled from "styled-components";
import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase.ts";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

type TweetType = {
    id: string;
    tweet: string;
    createdAt: number;
    userId: string;
    username: string;
};

function Timeline() {
    const [tweets, setTweets] = useState<TweetType[]>([]);

    const fetchTweets = async () => {
        // firestore에서 데이터를 검색해오는 명령(query)를 작성
        // query(콜렉션정보, 검색조건)
        // orderBy : 생성일자 기준으로 내림차순 정렬
        // 내림차순 : desc , 오름차순 : asc
        const tweetsQuery = query(collection(db, "tweets"), orderBy("createdAt", "desc"));

        // 작성된 query문으로 실제 요청
        const snapshot = await getDocs(tweetsQuery);

        // 도착된 데이터를 가공
        const tweets = snapshot.docs.map((item) => {
            const { tweet, createdAt, userId, username } = item.data();
            return {
                tweet,
                createdAt,
                userId,
                username,
                id: item.id,
            }
        });
        setTweets(tweets);
    };

    useEffect(() => {
        fetchTweets().then(() => {})
    }, []);

    return <Wrapper>
        {tweets.map((item, index) => {
            return <div key={index}>{item.tweet}</div>
        })}
    </Wrapper>;
}

export default Timeline;
