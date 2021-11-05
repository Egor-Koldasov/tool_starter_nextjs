import Document, { DocumentProps, DocumentContext } from "next/document";
import { getDataFromTree } from "@apollo/client/react/ssr";
import { getApolloClient } from "../lib/apolloClient";
import { NEXT_DATA } from "next/dist/next-server/lib/utils";

interface ApolloDocumentProps extends DocumentProps {
  apolloState: StringKeyObject
}
interface ApolloNextData extends NEXT_DATA {
  apolloState: StringKeyObject,
}

class DocumentWithApollo extends Document<ApolloDocumentProps> {
  constructor(props: ApolloDocumentProps) {
    super(props);
    const { __NEXT_DATA__, apolloState } = props;
    (__NEXT_DATA__ as ApolloNextData).apolloState = apolloState;
  }

  static async getInitialProps(ctx: DocumentContext) {
    const apolloClient = getApolloClient();
    const initialProps = await Document.getInitialProps(ctx);
    // this renders twice, maybe consider forking and extending next if this gives noticable improvement
    await getDataFromTree(<ctx.AppTree pageProps={{}} />);
    const apolloState = apolloClient.extract();
    return { ...initialProps, apolloState };
  }
}

export default DocumentWithApollo;

/*
  References:
  https://gist.github.com/Tylerian/16d48e5850b407ba9e3654e17d334c1e
  https://github.com/shshaw/next-apollo-ssr/blob/main/pages/refetch.js
*/