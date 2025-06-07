import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Filters {
  search?: string;
  enterDate?: string;
  closeDate?: string;
  page: number;
  pageSize: number;
  status?: "OPEN" | "CLOSED";
}

export type SelectOption<T> = {
  label: string;
  value: T;
};

const initialState: Filters = {
  page: 1,
  pageSize: 10,
};

const setFilterF = <K extends keyof Filters>(
  state: Filters,
  action: PayloadAction<{ name: K; value: Filters[K] }>
) => {
  state[action.payload.name] = action.payload.value;
}

const tradeFiltersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilter: setFilterF,
    setFilters(state, action: PayloadAction<Filters>) {
      state = action.payload;
      state.page = 1;
      state.pageSize = 10;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setPageSize(state, action: PayloadAction<number>) {
      state.pageSize = action.payload;
    },
  },
});

export const { setFilters, setPage, setPageSize, setFilter } = tradeFiltersSlice.actions;
export default tradeFiltersSlice.reducer;
