import { uploadToCloudinary } from "@/cloudinary/upload";
import { CreatTradeInput } from "@/dto/createTrade";
import { TradeFiltersInput } from "@/dto/tradeFilters";
import { TradeFilter } from "@/filters/tradeFilters";
import { TradeRepository } from "@/repositories/trade";
import { Context } from "@/types";

export const createTrade = async (_: any, { trade }: CreatTradeInput, ctx: Context) => {

    const images = await Promise.all(trade.images.map(async (image) => await uploadToCloudinary(image)));

    const newTradeParams = {
        ...trade,
        images,
        userId: ctx.user.userId
    }

    const newTrade = await TradeRepository.create(newTradeParams);

    return newTrade;
}

export const getAllTrades = async () => {
    return await TradeRepository.getAll();
}

export const getUserTrades = async (_: any, { filters }: TradeFiltersInput, ctx: Context) => {
    const { page, pageSize } = filters;

    const filter = new TradeFilter({ ...filters, userId: ctx.user.userId }).build();

    return await TradeRepository.getPaginatedResult(filter, page, pageSize);
}

export const getUserTrade = async(_: any, { tradeId }: { tradeId: string }, ctx: Context) => {
    return await TradeRepository.getById(tradeId, ctx.user.userId);
}