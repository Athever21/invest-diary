export type Image = {
    url: string,
    name: string
}

export type Trade = {
    id: string,
    title: string,
    asset: string,
    status: string,
    enterDate: Date,
    closeDate: Date,
    enterPrice: number,
    closePrice: number,
    volume: number,
    images: Image[]
}

export type Props = {
    trade: Trade
}