import { createTrade, getAllTrades, getUserTrades, getUserTrade } from "@/services/trade"

export const Query = {
    getAllTrades,
    getUserTrades,
    getUserTrade
}

export const Mutation = {
    createTrade
}