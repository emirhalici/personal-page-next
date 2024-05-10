import { Html, Head, Main, NextScript } from "next/document";

// add meta tags, css, scripts, etc. to the <head> of the page
export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Emir Halici</title>
        <meta name="description" content="Emir Halici's personal website" />
        <link rel="icon" href="" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
