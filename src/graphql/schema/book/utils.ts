import fs from "fs";
import { GraphQLError } from "graphql";
import cloudinary from "../../../libs/cloudinary";
import { ImagesInput, InputMaybe } from "../../../types/graphql";

export const stringPath = (str: string) =>
  str.replace(/([^a-z0-9 ]+)/gi, "-").replace(/\s/g, "-");

export const saveBooks = async (files: { data: any; type: string; }[]) => {
  // const { filename, mimetype, encoding, createReadStream } = data;
  // if (!["image/png", "image/jpeg"].includes(mimetype)) throw new GraphQLError("File type not valid", { extensions: { code: 'BAD_REQUEST' } })
  const uploads = files?.map(async (img) => {
    console.log({ data: img?.data })
    let buff = fs.readFileSync(img?.data);
    let base64data = buff.toString('base64');
    const upload = await cloudinary.uploader.upload(base64data, { folder: "ubb_press/books" })
    return {
      publicId: upload.public_id,
      url: upload.url,
      type: img?.type,
      secureUrl: upload.secure_url,
    }
  });
  return await Promise.all(uploads)
}