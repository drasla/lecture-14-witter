import styled from "styled-components";

const Wrapper = styled.div`
    height: 100dvh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Circle = styled.div`
    width: 40px;
    height: 40px;
    border: 8px solid rgba(255, 255, 255, 0.8);
    border-top-color: rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    // animation: 키프레임명 시간 [애니메이션방식] [반복횟수];
    animation: spin 2s linear infinite;
    
    // animation의 진행 사항을 기재할 때 @keyframes 로 선언
    // 진행도는 0% ~ 100%로 표기할 수 있음
    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }

        50% {
            transform: rotate(360deg);
        }
        
        100% {
            transform: rotate(0deg);
        }
    }
`;

function Spinner() {
    return (
        <Wrapper>
            <Circle />
        </Wrapper>
    );
}

export default Spinner;
