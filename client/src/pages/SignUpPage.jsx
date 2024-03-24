import React, {useState} from "react";
import styled from "styled-components";
import SignUpForm from "../components/SignUp/SignUpForm";
import AgreementsForm from "../components/SignUp/AgreementsForm";


export default function SignUpPage() {
  const [allAgreed, setAllAgreed] = useState(false);
  // const [identifyVerified, setIdentifyVerified] = useState(false);
  
  // const handleIdentifyVerify = () => {
  //   var IMP = window.IMP;
  //   IMP.init("imp64353736");
    
  //   IMP.certification({ // param
  //     merchant_uid: `mid_${new Date().getTime()}`,
  //     popup : false // PC환경에서는 popup 파라미터가 무시되고 항상 true 로 적용됨
  //   }, function (rsp) { // callback
  //     if (rsp.success) {
  //       console.log('인증 성공', rsp);
  //       setIdentifyVerified(true); 
  //     } else {
  //       console.log("인증에 실패하였습니다. 에러 내용: " +  rsp.error_msg);
  //     }
  //   });
  //   // setIdentifyVerified(true); 
  // };

  return (
    <Container>
      {!allAgreed  ? (
        <AgreementsForm setAllAgreed={setAllAgreed}/>
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
