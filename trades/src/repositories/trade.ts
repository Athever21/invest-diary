import { ITrade, Trade } from "@/models/trade.model";
import { TradeBase } from "@/types";
import { FilterQuery } from "mongoose";

export class TradeRepository {
    static async create(tradeParams: TradeBase) {
        return await Trade.create(tradeParams);
    }

    static async getAll() {
        return await Trade.find({});
    }

    static async getPaginatedResult(filters: FilterQuery<ITrade>, page = 1, pageSize = 10) {
        const skip = (page - 1) * pageSize;
        const totalItems = await Trade.countDocuments(filters);
        const trades = await Trade.find(filters)
            .skip(skip)
            .limit(pageSize)
            .sort({ createdAt: -1 });

        return {
            trades,
            totalItems,
            totalPages: Math.ceil(totalItems / pageSize),
            currentPage: page
        };
    }
}