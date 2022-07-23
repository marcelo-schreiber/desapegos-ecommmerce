import Link from 'next/link';

import { FaInfoCircle } from 'react-icons/fa';
import { CardPrice, CardContainer, CardTitle, Button, Price } from './styles';
import Stripe from 'stripe';
import Image from 'next/image';

import {
  getPriceTotal,
  getProductImage,
  getProductName,
} from '../../utils/computed';

interface Props {
  price: Stripe.Price;
  key: string;
}

function Product({ price }: Props) {
  return (
    <CardContainer>
      <Link href={`/detalhes/[id]`} as={`/detalhes/${price.id}`}>
        <CardTitle>{getProductName(price.product)}</CardTitle>
      </Link>
      <Link href={`/detalhes/[id]`} as={`/detalhes/${price.id}`}>
        <div
          style={{
            borderRadius: '1.5rem',
            margin: '2rem 0',
            overflow: 'hidden',
            cursor: 'pointer',
          }}
        >
          <Image
            src={`${getProductImage(price.product)}`}
            alt={`${getProductName(price.product)}`}
            width={480}
            height={310}
            objectFit="cover"
          />
        </div>
      </Link>
      <CardPrice>
        Valor: <meta itemProp="price" content={getPriceTotal(price)} />
        {getPriceTotal(price) && (
          <Price>
            <span itemProp="priceCurrency">R$</span>
            {getPriceTotal(price)},00
          </Price>
        )}
      </CardPrice>

      <Link href={`/detalhes/[id]`} as={`/detalhes/${price.id}`}>
        <Button aria-label="detalhes">
          Detalhes <FaInfoCircle color="#fff" />
        </Button>
      </Link>
    </CardContainer>
  );
}

export default Product;
