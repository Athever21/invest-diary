import { Image } from "./image"

export type TradeBase = {
    title?: string,
    asset: string,
    enterDate: Date,
    closeDate: Date,
    enterPrice: number,
    closePrice: number,
    volume: number,
    images: Image[]
}