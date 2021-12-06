import Document, { DocumentProps, DocumentContext, Html, Head, NextScript, Main } from "next/document";
import { ServerStyleSheet } from 'styled-components';
import { ReactNode } from "react";

interface ExtendedDocumentProps extends DocumentProps {
  styleTags?: ReactNode
}

class DocumentExtended extends Document<ExtendedDocumentProps> {
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

export default DocumentExtended;

/*
  References:
  Styled-components
  https://dev.to/aprietof/nextjs--styled-components-the-really-simple-guide----101c
*/