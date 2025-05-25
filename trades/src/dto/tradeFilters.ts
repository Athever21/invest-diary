import { TradeStatus } from "@/models/trade.model";
import { PaginationsArgs } from "./paginationArgs";

type TradeFilters =  PaginationsArgs & {
    search: string,
    status: TradeStatus,
    enterDate: Date,
    closeDate: Date
}

export type TradeFiltersInput = {
    filters: TradeFilters;
}