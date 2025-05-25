import { FileUpload } from "graphql-upload-ts";
import cloudinary from "./connect";

type UploadedFile = {
    name: string,
    url: string,
    publicId: string
}

export const uploadToCloudinary = async (file: Promise<FileUpload>) => {
    const { createReadStream, filename }  = await file;

    return new Promise<UploadedFile>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder: 'trading-app' },
            (err, res) => {
                if (err || !res) return reject(err);

                return resolve({
                    name: filename,
                    url: res.secure_url,
                    publicId: res.public_id
                });
            }
        );

        createReadStream().pipe(stream);
    });
}