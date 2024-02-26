/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import ImageSelector from "../ProductRegister/ImageSelector";
import InputText from "../ProductRegister/InputText";
import { useDaumPostcodePopup } from "react-daum-postcode";
// import usePatchUserData from "../../hooks/usePatchUserData";
import useUserUpdater from "../../hooks/useUserUpdater";
import Loading from "../Commons/Loading";
import useGetUserInfo from "../../hooks/useGetUserInfo";

export default function EditProfile() {
  const userInfo = useSelector((state) => state.user);
  const { data: userData, refetch, isLoading: isLoadingUserInfo } = useGetUserInfo(userInfo.id);
  const [inputs, setInputs] = useState({
    name: "",
    phone: "",
    address: "",
    detailAddress: "",
    postcode: "",
  });

  const [address, setAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [postCode, setPostCode] = useState("");

  const { updateUser, isLoading: isLoadingUpdateUser } = useUserUpdater();
  const open = useDaumPostcodePopup();

  useEffect(() => {
     if (userData) {
      setInputs({
        name: userData.name,
        phone: userData.phone,
        address: userData.address,
        detailAddress: userData.detailAddress,
        postcode: userData.postcode,
      });
    }
  }, [userData]);

  // useEffect(() => {
  //   setInputs({
  //     name: userInfo.name,
  //     phone: userInfo.phone,
  //   });
  //   // setProfileImg([userInfo.profileImg]);
  //   setAddress(userInfo.address);
  //   setDetailAddress(userInfo.detailAddress);
  //   setPostCode(userInfo.postcode);
  // }, [userInfo]);

  // const addressPostHandler = (data) => {
  //   let fullAddress = data.address;
  //   let extraAddress = "";

  //   if (data.addressType === "R") {
  //     if (data.bname !== "") {
  //       extraAddress += data.bname;
  //     }

  //     if (data.buildingName !== "") {
  //       extraAddress +=
  //         extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
  //     }
  //     fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
  //   }

  //   setAddress(fullAddress);
  //   setPostCode(data.zonecode);
  // };

  // const postCodeHandler = (e) => {
  //   e.preventDefault();
  //   open({ onComplete: addressPostHandler });
  // };

  // const inputChangeHandler = (e) => {
  //   setInputs({ ...inputs, [e.target.name]: e.target.value });
  // };

  // if (patchUserData.isLoading || updateUser.isLoading) {
  //   return <Loading />;
  // }

  const handleAddressSelect = (data) => {
    setAddress(data.address);
    setDetailAddress(data.buildingName);
    setPostCode(data.zonecode);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    await updateUser(userInfo.id, {
      ...inputs,
    });
    refetch(); // 사용자 정보를 다시 가져옵니다.
  };

  if (isLoadingUserInfo || isLoadingUpdateUser) {
    return <Loading />;
  }

  return (
    <Container>
      {/* <ImageSelector
        name="profile_image"
        label={"profile Image"}
        changeHandler={setProfileImg}
      /> */}
      <InputWrapper>
        <InputText
          name={"name"}
          label={"User Name"}
          text={"Input User Name"}
          require={false}
          mode={"title"}
          type={"text"}
          value={inputs.name}
          changeHandler={handleInputChange}
        />
        <InputText
          name={"phone"}
          label={"Phone Number"}
          text={"Input phone number"}
          require={false}
          mode={"title"}
          type={"text"}
          value={inputs.phone}
          changeHandler={handleInputChange}
        />
        <InputText
          name={"address"}
          label={"Address"}
          text={"Input Address"}
          require={false}
          mode={"title"}
          type={"text"}
          value={address}
          disabled={true}
        />
        <InputText
          name={"detailAddress"}
          label={"DetailAddress"}
          text={"Input detailAddress"}
          require={false}
          mode={"title"}
          type={"text"}
          value={detailAddress}
          disabled={true}
        />
        <InputText
          name={"postcode"}
          label={"PostCode"}
          text={"Input post code"}
          require={false}
          mode={"title"}
          type={"text"}
          value={postCode}
          disabled={true}
        />
        <AddressPostButton onClick={() => open({onComplete: handleAddressSelect})}>
          Address
        </AddressPostButton>
        <EditPostButton onClick={handleSubmit}>
          Edit
        </EditPostButton>
      </InputWrapper>
    </Container>
  );
}

const Container = styled.section`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 24px;
`;

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const AddressPostButton = styled.button`
  padding: 14px;
  border: none;
  background-color: #383838;
  color: white;
  border-radius: 8px;
`;

const EditPostButton = styled.button`
  padding: 16px;
  border: none;
  background-color: #2d7df4;
  color: white;
  border-radius: 8px;
  font-size: 1rem;
`;
