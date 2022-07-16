/* eslint-disable @next/next/no-img-element */
import type { GetServerSideProps, NextPage } from 'next';

import Stripe from 'stripe';
import Product from '../components/Product/Product';
import Header from '../components/Header/Header';
import styled from 'styled-components';
import Head from 'next/head';

export const getServerSideProps: GetServerSideProps = async (_) => {
  const stripe = new Stripe(process.env.SECRET_KEY ?? '', {
    apiVersion: '2020-08-27',
  });

  const res = await stripe.prices.list({ expand: ['data.product'] });

  const prices = res.data.filter((price) => price.active);

  return {
    props: { prices },
  };
};

type Props = {
  prices: Stripe.Price[];
};

const Products: NextPage<Props> = ({ prices }) => {
  return (
    <>
      <Head>
        <title>Palishop Vendas | Produtos</title>
      </Head>
      <Header index={2} />
      <ProductsContainer>
        {prices.map((p) => (
          <Product key={p.id} price={p} />
        ))}
      </ProductsContainer>
    </>
  );
};

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
