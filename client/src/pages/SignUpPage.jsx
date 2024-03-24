import React, {useState} from "react";
import styled from "styled-components";
import SignUpForm from "../components/SignUp/SignUpForm";
import AgreementsForm from "../components/SignUp/AgreementsForm";


export default function SignUpPage() {
  const [allAgreed, setAllAgreed] = useState(false);
  return (
    <Container>
      {!allAgreed
        ? <AgreementsForm allAgreed={allAgreed} setAllAgreed={setAllAgreed}/>
        : <SignUpForm/>
      }
    </Container>
  );
}

const Container = styled.article`
  display: flex;
  justify-content: center;
`;
