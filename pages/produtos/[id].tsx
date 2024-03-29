import React from "react";

import type { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import Stripe from "stripe";

import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

import { FaAngleLeft, FaAngleRight, FaShoppingCart } from "react-icons/fa";
import {
  getProductName,
  getPriceTotal,
  getProductDescription,
  getProductImage,
  getProductImageArray,
} from "../../utils/computed";
import checkout from "../../utils/checkout";

import Ripples from "react-ripples";
import Header from "../../components/Header/Header";

import styled from "styled-components";
import Head from "next/head";
import Link from "next/link";

interface Props {
  item: Stripe.Price;
}

const Detail = ({ item }: Props) => {
  console.log(item);
  const name = getProductName(item?.product);
  const images =
    [...getProductImageArray(item?.product), getProductImage(item?.product)] ||
    [];
  const title = `Desapegos | ${name}`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content={getProductDescription(item?.product)}
        />
        <meta name="robots" content="index, nofollow" />
        <meta property="og:title" content={name} />
        <meta
          property="og:description"
          content={getProductDescription(item?.product)}
        />
        <meta property="og:image" content={getProductImage(item?.product)} />
      </Head>
      <Header index={2} />

      <div style={{ position: "relative", margin: "5rem 0" }}>
        <Link href={"/produtos"}>
          <GoBackButton>
            <FaAngleLeft />
            Voltar
          </GoBackButton>
        </Link>
        <Container>
          <ProductContainer>
            <LocationSubtitle>
              Detalhes <FaAngleRight />
            </LocationSubtitle>
            <DetailsTitle>{name}</DetailsTitle>
            <LocationSubtitle>
              *Ficha técnica e mais detalhes nas imagens.
            </LocationSubtitle>
            <div style={{ margin: "2rem 0" }}>
              <CarouselProvider
                naturalSlideWidth={1244}
                naturalSlideHeight={700}
                totalSlides={images.length}
                playDirection={"forward"}
                interval={3000}
                isPlaying={true}
                dragEnabled={images.length > 1}
              >
                <Slider style={{ cursor: "grab" }}>
                  {images?.map((url: string, idx: number) => {
                    return (
                      <Slide index={idx} key={idx}>
                        <Image
                          src={`${url}`}
                          alt={`${name} ${idx}`}
                          width={1244}
                          height={800}
                          objectFit="cover"
                        />
                      </Slide>
                    );
                  })}
                </Slider>
                {images?.length > 1 && (
                  <div>
                    <div style={{ position: "relative" }}>
                      <ButtonBack
                        style={{
                          margin: ".5rem 0",
                          backgroundColor: "transparent",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        <FaAngleLeft size={32} />
                      </ButtonBack>
                      <ButtonNext
                        style={{
                          position: "absolute",
                          right: 0,
                          backgroundColor: "transparent",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        <FaAngleRight size={32} />
                      </ButtonNext>
                    </div>
                  </div>
                )}
              </CarouselProvider>
            </div>

            <ContentSection>
              <ContentText>
                <ul>
                  <DetailText>
                    {getProductDescription(item?.product)}
                  </DetailText>
                </ul>
                <PriceText>
                  Valor: <meta itemProp="price" content={getPriceTotal(item)} />
                  {item ? <b>{getPriceTotal(item)}</b> : <b>A negociar</b>}
                </PriceText>
                <Ripples>
                  <NegociateButton
                    onClick={() => checkout(item.id)}
                    aria-label="negociar"
                  >
                    Comprar <FaShoppingCart color="#fff" size={36} />
                  </NegociateButton>
                </Ripples>
              </ContentText>
            </ContentSection>
          </ProductContainer>
        </Container>
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async (_) => {
  const stripe = new Stripe(process.env.SECRET_KEY ?? "", {
    apiVersion: "2020-08-27",
  });

  const res = await stripe.prices.list({
    limit: 100,
    expand: ["data.product"],
  });

  const prices = res.data.filter((price) => price.active);

  const paths = prices.map((p: Stripe.Price) => {
    return {
      params: {
        id: `${p.id}`,
      },
    };
  });

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const stripe = new Stripe(process.env.SECRET_KEY ?? "", {
      apiVersion: "2020-08-27",
    });

    const res = await stripe.prices.retrieve(`${params?.id}`, {
      expand: ["product"],
    });

    return { props: { item: res }, revalidate: 60 };
  } catch (err) {
    return {
      notFound: true,
    };
  }
};

export default Detail;

const ProductContainer = styled.div`
  min-width: 40vw;
`;

const GoBackButton = styled.button`
  position: absolute;

  top: -7.5rem;
  left: 0;

  background: none;
  border: none;

  display: flex;
  align-items: center;

  font-size: 3.6rem;

  color: #2b2929;

  cursor: pointer;
`;

const LocationSubtitle = styled.small`
  font-weight: 300;
  font-size: 1.8rem;
  line-height: 124%;

  display: flex;
  align-items: center;

  color: #2b2929;
`;

const DetailsTitle = styled.h1`
  font-weight: 600;
  font-size: 3.6rem;
  line-height: 120%;

  color: #2b2929;

  max-width: 94vw;

  margin-bottom: 3rem;
`;

const ContentSection = styled.section`
  display: flex;
  align-items: center;
`;

const ContentText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;

  .react-ripples {
    width: 22rem;

    @media only screen and (max-width: 820px) {
      width: 100%;
    }
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;

  margin-bottom: 4.225rem;
`;

const DetailText = styled.li`
  font-size: 2.304rem;
  line-height: 146%;

  max-width: 80rem;
  /* or 29px */

  color: #2b2929;

  list-style: none;

  @media only screen and (max-width: 820px) {
    font-size: 3rem;
  }
`;

const PriceText = styled.div`
  margin: 1.5rem 0;

  font-size: 2.304rem;

  color: #2b2929;

  @media only screen and (max-width: 820px) {
    font-size: 3rem;
  }
`;

const NegociateButton = styled.button`
  font-weight: 600;
  font-size: 2.304rem;
  line-height: 124%;

  color: #fff;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 1.7rem 4.2rem;

  margin-top: 1rem;

  > svg {
    width: 3.2rem;

    margin-left: 0.6rem;
  }

  background: #31873b;
  border-radius: 2rem;

  border: none;

  cursor: pointer;

  transition: 0.2s ease-in;

  width: 22rem;

  :hover {
    background-color: #2a7332;
  }

  @media only screen and (max-width: 820px) {
    width: 100%;

    font-size: 3.4rem;
  }
`;
