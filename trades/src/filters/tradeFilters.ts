import { TradeStatus } from "@/models/trade.model";
import { FilterBuilder, FilterRule } from "./filterBuilder";

interface TradeFilterInput {
    userId: string;
    search?: String,
    status?: TradeStatus,
    enterDate?: Date,
    closeDate?: Date
  }
  
  export class TradeFilter extends FilterBuilder<TradeFilterInput> {
    protected schema: Record<keyof TradeFilterInput, FilterRule> = {
      userId: { path: 'userId', required: true },
      search: { path: 'title', operator: 'regex' },
      status: { path: 'status', operator: 'eq' },
      enterDate: { path: 'enterDate', operator: 'gte' },
      closeDate: { path: 'closeDate', operator: 'gte' },
    };
  }
  