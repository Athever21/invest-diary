import { Schema } from "mongoose";

export interface IImage {
    name: string,
    url: string,
    publicId: string
}

export const Image = new Schema<IImage>({
    name: String,
    url: String,
    publicId: String
})