import Document, { DocumentProps, DocumentContext, Html, Head, NextScript, Main } from "next/document";
import { getDataFromTree } from "@apollo/client/react/ssr";
import { getApolloClient } from "../lib/apolloClient";
import { NEXT_DATA } from "next/dist/shared/lib/utils";
import { ServerStyleSheet } from 'styled-components';
import { ReactNode } from "react";

interface ExtendedDocumentProps extends DocumentProps {
  apolloState: StringKeyObject
  styleTags: ReactNode
}
interface ApolloNextData extends NEXT_DATA {
  apolloState: StringKeyObject,
}

class DocumentWithApollo extends Document<ExtendedDocumentProps> {
  constructor(props: ExtendedDocumentProps) {
    super(props);
    const { __NEXT_DATA__, apolloState } = props;
    (__NEXT_DATA__ as ApolloNextData).apolloState = apolloState;
  }

  static async getInitialProps(ctx: DocumentContext) {
    const apolloClient = getApolloClient();
    const sheet = new ServerStyleSheet();
    const initialProps = await Document.getInitialProps(ctx);
    // this renders twice, maybe consider forking and extending next if this gives noticable improvement
    await getDataFromTree(sheet.collectStyles(<ctx.AppTree pageProps={{}} />));
    const apolloState = apolloClient.extract();
    const styleTags = sheet.getStyleElement();
    return { ...initialProps, apolloState, styleTags };
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