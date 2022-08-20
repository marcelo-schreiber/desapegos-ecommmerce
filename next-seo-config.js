const title = "Desapegos: compre no melhor preço de Curitiba";
const description =
  "Negocie e compre os melhores e mais Baratos produtos da desapegos, você pode negociar produtos Usados, semi novos e novos com Frete Grátis.";

export const SEO = {
  title,
  description,
  canonical: "https://desapegos.vercel.app",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://desapegos.online",
    title,
    description,
    images: [
      {
        url: "https://desapegos.online/logo192.png",
        alt: title,
        width: 192,
        height: 192,
      },
      {
        url: "https://desapegos.online/logo512.png",
        alt: title + " segunda",
        width: 512,
        height: 512,
      },
    ],
  },
};
