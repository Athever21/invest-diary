import { configureStore } from '@reduxjs/toolkit';
import tradeFilters from './tradeFiltersSlice';

export const store = configureStore({
    reducer: {
        tradeFilters: tradeFilters
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;