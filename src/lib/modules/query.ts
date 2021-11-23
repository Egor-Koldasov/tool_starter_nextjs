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
export interface ApiStateSchema<QueryData extends object> {
  query: QuerySchema
  data: NotPartial<QueryData> | null
}
export type ApiState<QueryData extends object> = ExtractNotPartial<ApiStateSchema<QueryData>>

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
export type ResourcePaths = FilteredPaths<RootState, ApiState<any>>

type ResourcePathSingle = ResourcePaths
type ResourcePathSplit = {queryPath: QueryPaths, dataPath: DataPaths}
type ResourcePath = ResourcePathSingle | ResourcePathSplit;

const splitResourcePath = (path: ResourcePath): ResourcePathSplit => {
  if (typeof path === 'object') return path;
  return {queryPath: `${path}.query`, dataPath: `${path}.data`}
}

type UseQueryOptions<QueryPath extends QueryPaths, DataPath extends DataPaths> = {
  path: ResourcePath
  query: () => Promise<Get<RootState, DataPath>>
}

const wrapError = (error: unknown): Error => {
  if (error instanceof Error) return error;
  return new Error(String(error));
}

export const useQuery =
  <
    QueryPath extends QueryPaths,
    DataPath extends DataPaths,
  >
  (options: UseQueryOptions<QueryPath, DataPath>) => {
      const path = splitResourcePath(options.path);
      const updateQuery = useUpdateModule<QueryPaths, Get<RootState, QueryPaths>>(path.queryPath);
      const updateData = useUpdateModule<DataPaths, Get<RootState, DataPaths>>(path.dataPath);
      return async () => {
        try {
          updateQuery({loading: true});
          const data = await options.query();
          updateQuery({loading: false, loaded: true, error: null});
          updateData(data);
        } catch (error) {
          updateQuery({error: wrapError(error), loading: false});
        }
      }
      return {updateQuery, updateData}
  }
