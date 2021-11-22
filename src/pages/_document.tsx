import Document, { DocumentProps, DocumentContext, Html, Head, NextScript, Main } from "next/document";
import { ServerStyleSheet } from 'styled-components';
import { ReactNode } from "react";

interface ExtendedDocumentProps extends DocumentProps {
  styleTags: ReactNode
}

class DocumentWithApollo extends Document<ExtendedDocumentProps> {
  constructor(props: ExtendedDocumentProps) {
    super(props);
  }

  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const initialProps = await Document.getInitialProps(ctx);
    const page = ctx.renderPage((App) => (props) =>
      sheet.collectStyles(<App {...props} />),
    );
    const styleTags = sheet.getStyleElement();
    return { ...initialProps, styleTags, ...page };
  }

  render() {
    return (
      <Html>
        <Head>
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default DocumentWithApollo;

/*
  References:
  Apollo:
  https://gist.github.com/Tylerian/16d48e5850b407ba9e3654e17d334c1e
  https://github.com/shshaw/next-apollo-ssr/blob/main/pages/refetch.js
  Styled-components
  https://dev.to/aprietof/nextjs--styled-components-the-really-simple-guide----101c
*/