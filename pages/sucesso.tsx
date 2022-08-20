import { NextPage } from "next/types";
import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import styled from "styled-components";
import Ripples from "react-ripples";
import Head from "next/head";
import Link from "next/link";

const Success: NextPage = () => {
  return (
    <>
      <Head>
        <title>Desapegos | Compra realizada</title>
      </Head>
      <Wrapper>
        <Div>
          <FaCheckCircle size={225} />
          <Thankyou>Obrigado!</Thankyou>
          <SideText>Pagamento realizado com sucesso.</SideText>
          <SideParagraph>
            Entraremos em contato com detalhes sobre a entrega em até 2 dias
            úteis.
          </SideParagraph>
          <Ripples>
            <Link href="/produtos">
              <Button>
                <a>Início</a>
              </Button>
            </Link>
          </Ripples>
        </Div>
      </Wrapper>
    </>
  );
};
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 10rem;
`;

const Button = styled.button`
  font-size: 3rem;

  padding: 2.2rem 8.5rem;

  border-radius: 15px;

  color: #fff;
  border: none;

  cursor: pointer;

  transition: 0.2s ease-in;

  margin: 0;

  background-color: #c28c3a;

  :hover {
    background-color: #886229;
  }
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SideParagraph = styled.div`
  font-size: 4rem;
  line-height: 133.5%;

  font-weight: lighter;

  max-width: 65rem;

  text-align: center;

  margin-bottom: 6.5rem;
`;

const SideText = styled.div`
  font-size: 2rem;

  font-weight: lighter;

  text-align: center;

  margin-bottom: 6.5rem;
`;

const Thankyou = styled.h1`
  font-size: 6rem;
  margin: 5px 0;
  font-weight: lighter;
`;

export default Success;
