import { createTrade, getAllTrades, getUserTrades } from "@/services/trade"

export const Query = {
    getAllTrades,
    getUserTrades
}

export const Mutation = {
    createTrade
}