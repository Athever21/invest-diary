import { uploadToCloudinary } from "@/cloudinary/upload";
import { CreatTradeInput } from "@/dto/createTrade";
import { PaginationsArgs } from "@/dto/paginationArgs";
import { TradeFiltersInput } from "@/dto/tradeFilters";
import { TradeRepository } from "@/repositories/trade";
import { Context } from "@/types";

export const createTrade = async (_:any, { trade }: CreatTradeInput, ctx: Context) => {
    
    const images = await Promise.all(trade.images.map(async(image) => await uploadToCloudinary(image)));

    const newTradeParams = {
        ...trade,
        images,
        userId: ctx.user.userId
    }

    const newTrade = await TradeRepository.create(newTradeParams);

    return newTrade;
}

export const getAllTrades = async() => {
    return await TradeRepository.getAll()
}

export const getUserTrades = async(_: any, { filters }: TradeFiltersInput, ctx: Context) => {
    const { page, pageSize } = filters;

    const userFilters = {
        userId: ctx.user.userId
    }

    const inputFilters = gatherFilters();
    

    return await TradeRepository.getPaginatedResult(userFilters, page, pageSize);
}

const gatherFilters = () => {

}