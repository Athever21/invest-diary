import mongoose, { Document, Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { IImage, Image } from "./Image.model";

export enum TradeStatus {
    OPEN = "OPEN",
    CLOSED = "CLOSED"
}

export interface ITrade extends Document {
    _id: string,
    userId: string,
    title?: string,
    asset: string,
    status: TradeStatus,
    enterDate: Date,
    closeDate: Date,
    enterPrice: number,
    closePrice: number,
    volume: number,
    images: IImage[]
}

const TradeSchema = new Schema<ITrade>({
    _id: {
        type: String,
        default: uuidv4
    },
    userId: {
        type: String,
        required: true,
        index: true
    },
    status: {
        type: String,
        enum: ['OPEN', 'CLOSED']
    },
    title: String,
    asset: String,
    enterDate: Date,
    closeDate: Date,
    enterPrice: Number,
    closePrice: Number,
    volume: Number,
    images: [Image]
});

export const Trade = mongoose.model<ITrade>('Trade', TradeSchema);