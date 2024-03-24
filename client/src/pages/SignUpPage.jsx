import React, {useState} from "react";
import styled from "styled-components";
import SignUpForm from "../components/SignUp/SignUpForm";
import AgreementsForm from "../components/SignUp/AgreementsForm";


export default function SignUpPage() {
  const [allAgreed, setAllAgreed] = useState(false);
  const [identifyVerified, setIdentifyVerified] = useState(false);
  const handleIdentifyVerify = () => {
    // 본인 인증 로직을 여기에 구현
    // 예시로, 본인 인증이 성공했다고 가정하고 상태를 업데이트합니다.
    setIdentifyVerified(true); // 본인 인증 성공으로 상태 업데이트
    return true;
  };
  return (
    <Container>
      {!allAgreed || !identifyVerified ? (
        <AgreementsForm setAllAgreed={setAllAgreed} onIdentifyVerify={handleIdentifyVerify} />
      ) : (
        <SignUpForm />
      )}
    </Container>
  );
}

const Container = styled.article`
  display: flex;
  justify-content: center;
`;
