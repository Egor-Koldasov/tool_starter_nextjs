import { GetServerSidePropsContext } from "next";
import { lensPath, set } from "ramda";
import { Get } from "type-fest"
import { RootState } from "../../state/rootContext"
import { RootStateUpdate, useUpdateModule } from "../../state/useUpdateModule"
import { isApiError } from "../apiClient";
import { logError } from "../log";
import { FilteredPaths } from "../types/FilteredPaths"
import { ExtractNotPartial, NotPartial } from "../types/NotPartial";

export interface QuerySchema {
  loading: boolean
  loaded: boolean
  error: NotPartial<Error> | null
}
type Query = ExtractNotPartial<QuerySchema>
export type Data = object | null;

// Use "Schema" types for initial state, use regular types for anything else
export interface ApiStateSchema<QueryData> {
  query: QuerySchema
  data: NotPartial<QueryData> | null
}
export type ApiState<QueryData> = ExtractNotPartial<ApiStateSchema<QueryData>>

export const queryInit = () => ({
  query: {
    loading: false,
    loaded: false,
    error: null,
  },
  data: null,
})

export type QueryPath = FilteredPaths<RootState, Query>
export type DataPath = FilteredPaths<RootState, Data>
export type ResourcePath = FilteredPaths<RootState, ApiState<object>>

type ResourcePathSplit = {queryPath: QueryPath, dataPath?: DataPath}
type ResourcePathOption = ResourcePath | ResourcePathSplit;
type SplitResourcePath<Path extends ResourcePathOption> =
  Path extends 'string' ? {queryPath: `${Path}.query`, dataPath: `${Path}.data`} :
    Path extends ResourcePathSplit ? Path :
      never;

const splitResourcePath = (path: ResourcePathOption): ResourcePathSplit => {
  if (typeof path === 'string') return {queryPath: `${path}.query`, dataPath: `${path}.data`};
  return path;
}


type QueryResult<QueryDataPath extends DataPath | undefined> = QueryDataPath extends DataPath ? Get<RootState, QueryDataPath> : void;
type UseQueryOptions<QueryDataPath extends DataPath | undefined, QueryArgs extends any[]> = {
  path: {queryPath: QueryPath, dataPath: QueryDataPath} | ResourcePath
  query: (...args: QueryArgs) => Promise<QueryResult<QueryDataPath>>
}
type SsrQueryOptions<QueryDataPath extends DataPath | undefined, QueryArgs extends any[]> = UseQueryOptions<QueryDataPath, [GetServerSidePropsContext]> & {
  path: {dataPath: QueryDataPath} | ResourcePath
}

const wrapError = (error: unknown): Error => {
  if (error instanceof Error) return error;
  return new Error(String(error));
}

export const getErrorMessage = (error: unknown): string | null => {
  if (!error) return null;
  if (error instanceof Error) {
    if (isApiError(error)) {
      return String(error.response?.data.message);
    }
    return error.message;
  }
  return String(error);
}

export type QueryHookResult<Data> = {success: true, data: Data} | {success: false, error: Error}

export const useQuery =
  <
    QueryDataPath extends DataPath | undefined,
    QueryArgs extends any[],
  >
  (options: UseQueryOptions<QueryDataPath, QueryArgs>) => {
      const path = splitResourcePath(options.path);
      const updateQuery = useUpdateModule<QueryPath, Get<RootState, QueryPath>>(path.queryPath);
      const updateData =
        path.dataPath ?
          useUpdateModule<typeof path.dataPath, Get<RootState, typeof path.dataPath>>(path.dataPath) :
          null;
      type Data = QueryResult<QueryDataPath>;
      return async (...args: QueryArgs): Promise<QueryHookResult<Data>> => {
        try {
          updateQuery({loading: true});
          const data = await options.query(...args);
          updateQuery({loading: false, loaded: true, error: null});
          if (updateData && data !== undefined) updateData(data); // https://github.com/microsoft/TypeScript/issues/46915
          return {success: true, data}
        } catch (error) {
          logError(error);
          const errorWrapped = wrapError(error);
          updateQuery({error: errorWrapped, loading: false});
          return {success: false, error: errorWrapped}
        }
      }
  }

export const ssrQuery =
  <QueryDataPath extends DataPath>
  (options: UseQueryOptions<QueryDataPath, [GetServerSidePropsContext | undefined]>) => {
    const dataPath: DataPath = typeof options.path === 'string' ? `${options.path}.data` : options.path.dataPath;
    return async (ctx?: GetServerSidePropsContext) => {
      const data = await options.query(ctx);
      const stateUpdate: RootStateUpdate = set(lensPath(dataPath.split('.')), data, {});
      return { props: { initState: stateUpdate } };
    }
  }

export const makeStateQueries =
  <QueryDataPath extends DataPath> (options: UseQueryOptions<QueryDataPath, [GetServerSidePropsContext | undefined]>) => {
    return {
      useQuery: () => useQuery(options),
      ssrQuery: ssrQuery(options),
    };
  }
