import { Get } from "type-fest"
import { RootState } from "../../state/state-root"
import { useUpdateModule } from "../../state/state-update"
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

export type QueryPaths = FilteredPaths<RootState, Query>
export type DataPaths = FilteredPaths<RootState, Data>
export type ResourcePaths = FilteredPaths<RootState, ApiState<object>>

type ResourcePathSplit = {queryPath: QueryPaths, dataPath: DataPaths}
type ResourcePath = ResourcePaths | ResourcePathSplit;
type SplitResourcePath<Path extends ResourcePath> =
  Path extends ResourcePathSplit ? ResourcePathSplit :
    Path extends ResourcePaths ? {queryPath: `${Path}.query`, dataPath: `${Path}.data`} :
      never;

const splitResourcePath = (path: ResourcePath): ResourcePathSplit => {
  if (typeof path === 'string') return {queryPath: `${path}.query`, dataPath: `${path}.data`};
  return path;
}

type UseQueryOptions<DataPath extends DataPaths, QueryArgs extends any[]> = {
  path: ResourcePath
  query: (...args: QueryArgs) => Promise<Get<RootState, DataPath>>
}

const wrapError = (error: unknown): Error => {
  if (error instanceof Error) return error;
  return new Error(String(error));
}

export const useQuery =
  <
    QueryPath extends QueryPaths,
    DataPath extends DataPaths,
    QueryArgs extends any[],
  >
  (options: UseQueryOptions<DataPath, QueryArgs>) => {
      const path = splitResourcePath(options.path);
      const updateQuery = useUpdateModule<QueryPaths, Get<RootState, QueryPaths>>(path.queryPath);
      const updateData = useUpdateModule<DataPaths, Get<RootState, DataPaths>>(path.dataPath);
      return async (...args: QueryArgs) => {
        try {
          updateQuery({loading: true});
          const data = await options.query(...args);
          updateQuery({loading: false, loaded: true, error: null});
          updateData(data);
        } catch (error) {
          updateQuery({error: wrapError(error), loading: false});
        }
      }
  }
