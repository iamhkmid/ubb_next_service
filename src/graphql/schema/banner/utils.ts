import path from "path";
import { GraphQLError } from "graphql";
import Jimp from "jimp";

export const stringPath = (str: string) =>
  str.replace(/([^a-z0-9 ]+)/gi, " ").replace(/\s+/g, " ").replace(/ /g, "-").toLowerCase();

type TSaveImage = (p: { fileName: string; file: string; }) => Promise<{ path: string; }>

export const saveBanner: TSaveImage = async ({ fileName, file }) => {
  const bufferFile = Buffer.from(file.split("base64,")[1], "base64")
  const currFileType = file.split(';')[0].split('/')[1]
  const fileTypes = ["image/jpeg", "image/png"]
  const imageSizeLimit = Number(process.env.IMAGE_SIZE_LIMIT)
  const filePath = `/images/banner/${fileName}-${new Date().getTime()}`
  const fileType = currFileType === "jpeg" ? "jpg" : currFileType
  const fileBase = `${new Date().getTime()}-${fileName}.${fileType}`
  const writeDir = path.join(process.cwd(), "/../uploads/ubbpress", filePath, fileBase)

  if (bufferFile.byteLength > imageSizeLimit)
    throw new GraphQLError(`Max file size ${imageSizeLimit / 1024}`, { extensions: { code: 'BAD_REQUEST' } })

  if (!fileTypes.includes(file.substring(file.indexOf("data:") + "data:".length, file.lastIndexOf(";base64"))))
    throw new GraphQLError("Invalid file type", { extensions: { code: 'BAD_REQUEST' } })

  Jimp.read(bufferFile, (err, res) => {
    if (err) throw err;
    res.quality(80).write(writeDir);
  });
  return { path: path.join("/uploads/", filePath, fileBase) }
}