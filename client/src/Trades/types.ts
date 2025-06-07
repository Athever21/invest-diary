import { Trade } from "../Trade/types"

export type TradesResponse = {
    getUserTrades: {
        totalItems: number,
        totalPages: number,
        currentPage: number,
        trades: Trade[]
    }
}