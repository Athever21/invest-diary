import { TradeBase } from "@/types";
import { FileUpload } from "graphql-upload-ts";

type InputTrade = Omit<TradeBase, 'images'> & {
    images: Promise<FileUpload>[];
}

export type CreatTradeInput = {
    trade: InputTrade;
}