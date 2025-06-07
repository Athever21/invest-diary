import { TradeStatus } from "@/models/trade.model";
import { PaginationsArgs } from "./paginationArgs";

export type TradeFilters =  PaginationsArgs & {
    search: string,
    status: TradeStatus,
    enterDate: Date,
    closeDate: Date
}

export type TradeFiltersInput = {
    filters: TradeFilters;
}