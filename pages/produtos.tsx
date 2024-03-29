import type { GetServerSideProps, NextPage } from "next";

import Head from "next/head";
import { useEffect, useState } from "react";
import Stripe from "stripe";
import styled from "styled-components";
import Header from "../components/Header/Header";
import Product from "../components/Product/Product";
import { RoupasBebe } from "../data/cars";
import { getProductArchived, getProductId, getProductType } from "../utils/computed";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const getServerSideProps: GetServerSideProps = async (_) => {
  const stripe = new Stripe(process.env.SECRET_KEY ?? "", {
    apiVersion: "2020-08-27",
  });

  const res = await stripe.prices.list({
    limit: 100,
    expand: ["data.product"],
  });

  const firstPromotionCode = await stripe.promotionCodes.list({});

  const prom = await stripe.promotionCodes.retrieve(
    firstPromotionCode.data[0].id,
    {
      expand: ["coupon.applies_to"],
    }
  );

  const prices = [
    ...res.data.filter((price) => price.active && getProductArchived(price.product)),
    RoupasBebe,
  ];

  const pricesSom = prices.filter(
    (price) => getProductType(price.product) === "som"
  );

  const pricesModa = prices.filter(
    (price) => getProductType(price.product) === "moda"
  );
  const pricesJogos = prices.filter(
    (price) => getProductType(price.product) === "eletronico"
  );
  const pricesAnuncio = prices.filter(
    (price) => getProductType(price.product) === "anuncio"
  );

  const pricesUtilidade = prices.filter(
    (price) => getProductType(price.product) === "eletrodomesticos"
  );

  const pricesCarros = prices.filter(
    (price) => getProductType(price.product) === "carros"
  );

  const productsIds = prom.coupon.applies_to?.products;
  // productsIds?.some((name) => name === price.id)

  return {
    props: {
      prices,
      pricesSom,
      pricesModa,
      pricesJogos,
      pricesUtilidade,
      pricesAnuncio,
      pricesCarros,
      productsIds,
    },
  };
};

type Props = {
  prices: Stripe.Price[];
  pricesSom: Stripe.Price[];
  pricesModa: Stripe.Price[];
  pricesJogos: Stripe.Price[];
  pricesUtilidade: Stripe.Price[];
  pricesCarros: Stripe.Price[];
  pricesAnuncio: Stripe.Price[];
  productsIds: string[];
};

const Products: NextPage<Props> = ({
  prices,
  pricesSom,
  pricesModa,
  pricesJogos,
  pricesCarros,
  pricesUtilidade,
  pricesAnuncio,
  productsIds,
}) => {
  const [products, setProducts] = useState(prices);

  useEffect(() => {
    toast.info("Utilize o cupom PALI5, para receber 5% em certos produtos", {
      autoClose: 10000,
    });
  }, []);

  return (
    <>
      <Head>
        <title>Desapegos | Produtos</title>
        <meta name="title" content="desapegos: Produtos exclusivos" />
      </Head>

      <Header index={2} />

      <FilterContainer>
        <h2 onClick={() => setProducts(prices)}>Todos</h2>
        <h2 onClick={() => setProducts(pricesSom)}>Som e áudio</h2>
        <h2 onClick={() => setProducts(pricesModa)}>Moda e Beleza</h2>
        <h2 onClick={() => setProducts(pricesJogos)}>Eletrônicos e Jogos</h2>
        <h2 onClick={() => setProducts(pricesCarros)}>Carros</h2>
        <h2 onClick={() => setProducts(pricesAnuncio)}>Anúncios e Serviços</h2>
        <h2 onClick={() => setProducts(pricesUtilidade)}>Eletrodomésticos</h2>
      </FilterContainer>
      <ProductsContainer>
        {products.map((p) => {
          return productsIds?.some(
            (name) => name === getProductId(p.product)
          ) ? (
            <Product key={p.id} price={p} isOnDiscount={true} />
          ) : (
            <Product key={p.id} price={p} isOnDiscount={false} />
          );
        })}
      </ProductsContainer>
      <ToastContainer />
      {products.length === 0 && (
        <p style={{ fontSize: "5rem", textAlign: "center", marginTop: "4rem" }}>
          Ainda não há produtos dessa categoria.
        </p>
      )}
    </>
  );
};

const FilterContainer = styled.ul`
  margin: 0 0.5rem 8rem 0.5rem;

  display: flex;
  align-items: center;
  justify-content: center;

  > h2 {
    text-align: center;
    cursor: pointer;
    font-size: 1.85rem;
    font-weight: normal;
    margin: 0.1rem 2rem;

    :hover {
      text-decoration: underline;
      text-underline-offset: 5;
    }
  }

  @media only screen and (max-width: 1120px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.8rem;

    > h2 {
      margin: 0;
    }
  }
`;

const ProductsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  grid-gap: 14rem;

  @media only screen and (max-width: 1230px) {
    grid-template-columns: 1fr;
  }

  margin-bottom: 8.45rem;
`;

export default Products;
