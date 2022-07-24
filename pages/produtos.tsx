/* eslint-disable @next/next/no-img-element */
import type { GetServerSideProps, NextPage } from 'next';

import Stripe from 'stripe';
import Product from '../components/Product/Product';
import Header from '../components/Header/Header';
import styled from 'styled-components';
import Head from 'next/head';
import { getProductType } from '../utils/computed';
import { useState } from 'react';

export const getServerSideProps: GetServerSideProps = async (_) => {
  const stripe = new Stripe(process.env.SECRET_KEY ?? '', {
    apiVersion: '2020-08-27',
  });

  const res = await stripe.prices.list({
    limit: 100,
    expand: ['data.product'],
  });

  const prices = res.data.filter((price) => price.active);
  const pricesSom = prices.filter(
    (price) => getProductType(price.product) === 'som'
  );

  const pricesModa = prices.filter(
    (price) => getProductType(price.product) === 'moda'
  );
  const pricesJogos = prices.filter(
    (price) => getProductType(price.product) === 'eletronico'
  );
  const pricesUtilidade = prices.filter(
    (price) => getProductType(price.product) === 'utilidade'
  );
  const pricesAnuncio = prices.filter(
    (price) => getProductType(price.product) === 'anuncio'
  );

  return {
    props: {
      prices,
      pricesSom,
      pricesModa,
      pricesJogos,
      pricesUtilidade,
      pricesAnuncio,
    },
  };
};

type Props = {
  prices: Stripe.Price[];
  pricesSom: Stripe.Price[];
  pricesModa: Stripe.Price[];
  pricesJogos: Stripe.Price[];
  pricesUtilidade: Stripe.Price[];
  pricesAnuncio: Stripe.Price[];
};

const Products: NextPage<Props> = ({
  prices,
  pricesSom,
  pricesModa,
  pricesJogos,
  pricesUtilidade,
  pricesAnuncio,
}) => {
  const [products, setProducts] = useState(prices);
  return (
    <>
      <Head>
        <title>Palivendas | Produtos</title>
        <meta name="title" content="Palivendas: Produtos" />
      </Head>
      <Header index={2} />
      <FilterContainer>
        <a href="javascript: void(0)" onClick={() => setProducts(prices)}>
          Todos
        </a>
        <a href="javascript: void(0)" onClick={() => setProducts(pricesSom)}>
          Som e áudio
        </a>
        <a href="javascript: void(0)" onClick={() => setProducts(pricesModa)}>
          Moda e Beleza
        </a>
        <a href="javascript: void(0)" onClick={() => setProducts(pricesJogos)}>
          Eletrônicos e Jogos
        </a>
        <a
          href="javascript: void(0)"
          onClick={() => setProducts(pricesUtilidade)}
        >
          Utilidades domésticas
        </a>
        <a
          href="javascript: void(0)"
          onClick={() => setProducts(pricesAnuncio)}
        >
          Anúncios e Serviços
        </a>
      </FilterContainer>
      <ProductsContainer>
        {products.map((p) => (
          <Product key={p.id} price={p} />
        ))}
      </ProductsContainer>
      {products.length === 0 && (
        <p style={{ fontSize: '5rem', textAlign: 'center', marginTop: '4rem' }}>
          Ainda não há produtos dessa categoria.
        </p>
      )}
    </>
  );
};

const FilterContainer = styled.ul`
  margin: 0 0.5rem 8rem 0.5rem;
  font-size: 1.85rem;
  text-align: center;

  > a {
    margin: 0 2rem;

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

    > a {
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
