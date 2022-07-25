const title = 'Palivendas: compre no melhor preço de Curitiba';
const description =
  'Negocie e compre os melhores e mais Baratos produtos da Palivendas, você pode negociar produtos Usados, semi novos e novos com Frete Grátis.';

export const SEO = {
  title,
  description,
  canonical: 'https://palivendas.vercel.app',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://palivendas.cf',
    title,
    description,
    images: [
      {
        url: 'https://palivendas.cf/logo192.png',
        alt: title,
        width: 192,
        height: 192,
      },
      {
        url: 'https://palivendas.cf/logo512.png',
        alt: title + ' segunda',
        width: 512,
        height: 512,
      },
    ],
  },
};
