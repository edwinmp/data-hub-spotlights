import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';

const ASSETS_SOURCE_URL = process.env.ASSETS_SOURCE_URL || 'http://159.65.56.142/';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <link href={ `${ASSETS_SOURCE_URL}assets/css/screen.min.css` } rel="stylesheet"/>
          <link href="https://fonts.googleapis.com/css?family=PT+Sans:400,400i,700" rel="stylesheet"/>
          <noscript><link href={ `${ASSETS_SOURCE_URL}assets/icons/icon.fallback.css` } rel="stylesheet"/></noscript>
          <script src={ `${ASSETS_SOURCE_URL}assets/js/libs/modernizr.js` }/>
          <link rel="icon" type="image/png" href={ `${ASSETS_SOURCE_URL}assets/favicons/favicon.png` } sizes="16x16"/>
        </Head>
        <body className="body">
          <Main />
          <NextScript />
          <script src={ `${ASSETS_SOURCE_URL}assets/js/app.bundle.js` }/>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
