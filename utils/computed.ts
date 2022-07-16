export function getProductName(product: any) {
  return product?.name;
}

export function getProductImage(product: any) {
  return product?.images[0];
}

export function getProductDescription(product: any) {
  return product?.description ?? '';
}

export function getProductImageArray(product: any) {
  return product.images;
}

export function getPriceTotal(price: any) {
  return Number(price.unit_amount / 100)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // add commas
}
