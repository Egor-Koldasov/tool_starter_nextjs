import {ApolloCache, DocumentNode, gql, useMutation} from '@apollo/client'
import { Get, PartialDeep } from 'type-fest'
import { AuthResponse, Mutation, MutationLoginArgs, Query } from '../generated-types/schema'
import get from '../lib/data/get'

export const ME = gql`
  query Me {
    me {
      id,
      email
    }
  }
`

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      success
      message
      me {
        id
        email
      }
    }
  }
`
type FetchRes<Response> = {
  data?: Response
}
type GetUpdate<Response, Path extends Paths<Query>> = (res: FetchRes<Response>, prevState?: Get<Query, Path>) => PartialDeep<Get<Query, Path>>;

const updateCache = <Response extends Mutation | undefined | null, Path extends Paths<Query>>(updatePath: Path, getUpdate: GetUpdate<Response, Path>, fragment: DocumentNode) => {
  return (cache: ApolloCache<any>, res: FetchRes<Response>) => {
    cache.modify({
      fields: {
        [updatePath]: (currentState: Get<Query, Path>) => {
          console.log({currentState});
          const updateRef = cache.writeFragment({
            data: getUpdate(res, currentState),
            fragment
          })
          return updateRef;
        }
      }
    })
  }
}

const mapCachePath = <CachePath extends Paths<Query>, Response extends Mutation | null, ResultPath extends Paths<Response>>(cachePath: CachePath, resultPath: ResultPath, fragment: DocumentNode) => {
  return updateCache<Response, CachePath>(cachePath, (res) => (get(res.data!, resultPath) as any), fragment);
}

export const useLogin = () => useMutation<{login: AuthResponse}, MutationLoginArgs>(LOGIN, {
  // update: updateCache('me', (res) => res.data?.login.me, gql`fragment on User {id, email}`)
  update: mapCachePath('me', 'login.me', gql`fragment on User {id, email}`)
})