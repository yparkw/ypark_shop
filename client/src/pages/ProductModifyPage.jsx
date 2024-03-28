import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ProductModifyForm from "../components/ProductRegister/ProductModifyForm";
import useGetItem from "../hooks/useGetItem";
export default function ProductModifyPage() {
  const { id } = useParams();
  console.log("productId", id)
  const { data: productToEdit, isLoading, isError } = useGetItem(id);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error occurred</div>;
  return (
    <Container>
      {productToEdit && <ProductModifyForm productToEdit={productToEdit} />}
    </Container>
  );
}

const Container = styled.article`
  display: flex;
  justify-content: center;
`;
