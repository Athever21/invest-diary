import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Filters {
  status?: string;
  search?: string;
  fromDate?: string;
  toDate?: string;
}

interface TradeFiltersState {
  filters: Filters;
  page: number;
  pageSize: number;
}

const initialState: TradeFiltersState = {
  filters: {},
  page: 1,
  pageSize: 10,
};

const tradeFiltersSlice = createSlice({
  name: 'tradeFilters',
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<Filters>) {
      state.filters = action.payload;
      state.page = 1;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setPageSize(state, action: PayloadAction<number>) {
      state.pageSize = action.payload;
    },
  },
});

export const { setFilters, setPage, setPageSize } = tradeFiltersSlice.actions;
export default tradeFiltersSlice.reducer;
