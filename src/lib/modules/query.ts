import { Get } from "type-fest"
import { RootState } from "../../state/state-root"
import { useUpdateModule } from "../../state/state-update"
import { NotPartial } from "../types/NotPartial"
import { Paths } from "../types/Paths"

export interface QueryState<Data> {
  query: {
    loading: boolean
    loaded: boolean
    error: unknown
  }
  data: NotPartial<Data> | null
}

export const queryInit = () => ({
  query: {
    loading: false,
    loaded: false,
    error: null,
  },
  data: null,
})

type UseQueryOptions<QueryPath, DataPath> = {
  queryPath: QueryPath
  dataPath: DataPath
}

export const useQuery =
  <
    QueryPath extends Paths<RootState>,
    DataPath extends Paths<RootState>,
    Data extends Get<RootState, DataPath> = Get<RootState, DataPath>
  >
  (options: UseQueryOptions<QueryPath, DataPath>) => {
      const updateQuery = useUpdateModule(options.queryPath);
      const updateData = useUpdateModule(options.dataPath);
      return {updateQuery, updateData}
  }
