export function getProductName(product: any) {
  return product?.name;
}

export function getProductId(product: any) {
  return product?.id;
}

export function getProductImage(product: any) {
  return product?.images[0];
}

export function getProductDescription(product: any) {
  return product?.description ?? '';
}

export function getProductImageArray(product: any) {
  const metadata = Object.freeze(product?.metadata);

  const imgArr = Object.keys(metadata)
    .filter((key) => !key.includes('tipo'))
    .map((key) => metadata[`${key}`]);

  return product?.metadata ? imgArr : [];
}

export function getProductType(product: any) {
  const metadata = Object.freeze(product?.metadata);

  const productType = Object.keys(metadata)
    .filter((key) => key.includes('tipo'))
    .map((key) => metadata[`${key}`]);

  return product?.metadata ? productType[0] : [];
}

export function getPriceTotal(price: any) {
  return price
    ? Number(price.unit_amount / 100).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      })
    : 'A negociar'; // add commas
}
