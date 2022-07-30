import React from 'react';
import { NextPage } from 'next/types';
import Header from '../components/Header/Header';

import styled from 'styled-components';
import Link from 'next/link';
import Ripples from 'react-ripples';
import Image from 'next/image';

const Home: NextPage = () => {
  return (
    <>
      <Header index={1} />
      <ContentWrapper>
        <TopSideWrapper>
          <SideParagraph>
            Conheça nossos produtos <b>exclusivos</b>
            <div style={{ marginTop: '7rem' }}>
              <Link href="/produtos">
                <Ripples>
                  <ExploreButton>Explorar</ExploreButton>
                </Ripples>
              </Link>
            </div>
          </SideParagraph>
          <ImageWrapper>
            <Image
              src="/shopping.png"
              alt="Mulher comprando na palivendas"
              width={633}
              height={478}
            />
          </ImageWrapper>
        </TopSideWrapper>
      </ContentWrapper>

      <SubTitle>Quem somos</SubTitle>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <AboutSection>
          <b>Todo mundo tem algo que precisa desapegar</b>, mas não tem tempo
          para ficar anunciando ou negociando os desapegos;
        </AboutSection>
        <AboutSection>
          A <h1>Palivendas</h1> é um site de tecnologia que oferece soluções de
          desapegos para que pessoas e empresas possam comprar, vender ou
          oferecer seus serviços;
        </AboutSection>
        <AboutSection>
          Cada pessoa física ou jurídica ficará responsável em fornecer as
          imagens reais, valores, notas fiscais ou recibos e informações
          detalhadas de seus produtos bem como o serviço de entrega.
        </AboutSection>
      </div>
    </>
  );
};

export default Home;

const ContentWrapper = styled.main`
  width: 75vw;

  margin: 0 auto;
`;

const TopSideWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media only screen and (max-width: 1060px) {
    display: block;
  }
`;

const ImageWrapper = styled.div`
  margin: 3.5rem 0;
  display: block;
  /* @media only screen and (max-width: 1060px) {
    display: none;
  } */
`;

const SideParagraph = styled.div`
  font-size: 4.5rem;
  line-height: 133.5%;

  max-width: 50rem;

  margin-bottom: 6.5rem;
`;

const ExploreButton = styled.button`
  font-weight: 600;
  font-size: 3.6rem;

  background-color: #ac6411;

  color: #ffffff;
  border-radius: 2rem;

  padding: 1rem 6rem;
  border: none;

  cursor: pointer;

  transition: background-color 0.2s ease-in;

  :hover {
    background-color: #78460c;
  }
`;

const SubTitle = styled.h3`
  display: block;

  margin-top: 10rem;
  margin-bottom: 2rem;

  font-weight: 600;
  font-size: 4.5rem;
  /* identical to box height, or 60px */
  text-align: center;
`;

const AboutSection = styled.div`
  display: block;
  margin: 0 auto;

  max-width: 50vw;

  font-size: 2.304rem;
  line-height: 155%;

  margin: 2rem 0;

  text-align: justify;

  > h1 {
    display: inline;
    font-size: 2.304rem;
    line-height: 155%;
  }

  @media only screen and (max-width: 1060px) {
    max-width: 80vw;
  }
`;
