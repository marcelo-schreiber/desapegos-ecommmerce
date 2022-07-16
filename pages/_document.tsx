import Document, {
  DocumentContext,
  DocumentInitialProps,
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const originalRenderPage = ctx.renderPage;

    // Run the React rendering logic synchronously
    ctx.renderPage = () =>
      originalRenderPage({
        // Useful for wrapping the whole react tree
        enhanceApp: (App) => App,
        // Useful for wrapping in a per-page basis
        enhanceComponent: (Component) => Component,
      });

    // Run the parent `getInitialProps`, it now includes the custom `renderPage`
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render() {
    return (
      <Html lang="pt-br">
        <Head>
          <meta name="title" content="Palishop Vendas" />
          <meta
            name="keywords"
            content="compra, melhor, venda, barato, eletrodomésticos, palishop vendas, palishop, usado, semi novo, frete"
          />
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          <meta name="author" content="Marcelo Schreiber" />
          <meta name="language" content="Portuguese" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <meta name="theme-color" content="#534FC8" />
          <link rel="mask-icon" href="/maskable_icon_x1" color="#534FC8" />
          <meta
            name="description"
            content="Negocie, compre e venda os melhores e mais Baratos produtos exclusivos da Palishop Vendas, você pode negociar produtos Usados, semi novos e novos com Frete Grátis."
          />

          <meta property="og:site_name" content="PALISHOP VENDAS" />
          <meta property="og:locale" content="pt-br" />
          <meta property="og:type" content="website" />
          <meta name="robots" content="index, follow" />
          <link rel="apple-touch-icon" href="/logo192.png" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap"
            rel="stylesheet"
            as="style"
          />
          <link rel="manifest" href="/manifest.json" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
