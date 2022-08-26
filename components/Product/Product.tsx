import Link from "next/link";

import { FaInfoCircle, FaPercentage } from "react-icons/fa";
import {
  CardPrice,
  CardContainer,
  CardTitle,
  Button,
  Price,
  Discount,
} from "./styles";
import Stripe from "stripe";
import Image from "next/image";

import {
  getPriceTotal,
  getProductImage,
  getProductName,
} from "../../utils/computed";

interface Props {
  price: Stripe.Price;
  isOnDiscount: boolean;
}

function Product({ price, isOnDiscount }: Props) {
  return (
    <CardContainer>
      {isOnDiscount && <Discount>-5%</Discount>}
      <Link href={`/produtos/[id]`} as={`/produtos/${price.id}`}>
        <a>
          <CardTitle>{getProductName(price.product)}</CardTitle>
        </a>
      </Link>
      <Link href={`/produtos/[id]`} as={`/produtos/${price.id}`}>
        <div
          style={{
            borderRadius: "1.5rem",
            margin: "2rem 0",
            overflow: "hidden",
            cursor: "pointer",
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
        {getPriceTotal(price) && <Price>{getPriceTotal(price)}</Price>}
      </CardPrice>

      <Link href={`/produtos/[id]`} as={`/produtos/${price.id}`}>
        <Button aria-label="Detalhes">
          Detalhes <FaInfoCircle color="#fff" />
        </Button>
      </Link>
    </CardContainer>
  );
}

export default Product;
