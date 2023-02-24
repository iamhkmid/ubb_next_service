import { Prisma } from "@prisma/client";
import util from "util";
import path from "path";
import fs from "fs";
import { GraphQLError } from "graphql";
import Jimp from "jimp";

export const stringPath = (str: string) =>
  str.replace(/([^a-z0-9 ]+)/gi, " ").replace(/\s+/g, " ").replace(/ /g, "-").toLowerCase();

type TSortBookBy = (p: string) => Prisma.Enumerable<Prisma.BookOrderByWithRelationInput> | undefined
export const sortBookBy: TSortBookBy = (sortBy) => {
  switch (sortBy) {
    case "NEW": return { createdAt: "desc" }
    default: return undefined
  }
}

type TSaveImageProps = { file: string; name: string; folder: string; } & ({ action: "C"; } | { fileName: string; dirName: string; action: "U" })
type TSaveImage = (p: TSaveImageProps) => Promise<{ fileName: string; url: string; dirName: string; }>

export const saveImage: TSaveImage = async (props) => {
  const { file } = props
  const bufferFile = Buffer.from(file.split("base64,")[1], "base64")
  const ext = file.split(';')[0].split('/')[1]
  const fileTypes = ["image/jpeg", "image/png"]
  const imageSizeLimit = Number(process.env.IMAGE_SIZE_LIMIT)
  let writeDir: string | null = null

  if (bufferFile.byteLength > imageSizeLimit)
    throw new GraphQLError(`Max file size ${imageSizeLimit / 1024}`, { extensions: { code: 'BAD_REQUEST' } })

  if (!fileTypes.includes(file.substring(file.indexOf("data:") + "data:".length, file.lastIndexOf(";base64"))))
    throw new GraphQLError("Invalid file type", { extensions: { code: 'BAD_REQUEST' } })

  switch (props.action) {
    case "C": {
      const { name, folder } = props
      const folderName = path.join("/uploads", folder, `/${name}-${new Date().getTime()}`)
      const fileExt = ext === "jpeg" ? "jpg" : ext
      const fileName = `${new Date().getTime()}-${name}.${fileExt}`
      writeDir = path.join(process.cwd(), "/../", folderName, fileName)

      Jimp.read(bufferFile, (err, res) => {
        if (err) throw err;
        res.quality(80).write(writeDir!);
      });
      return { fileName, url: path.join(folderName, fileName).replace(/\\/g, '/'), dirName: `/..${folderName}`.replace(/\\/g, '/') }
    }
    case "U": {
      const { fileName: oldFileName, dirName, name, folder } = props
      const oldFilePath = path.join(process.cwd(), "/uploads/", folder, oldFileName)
      if (fs.existsSync(oldFilePath)) fs.unlinkSync(oldFilePath);
      const fileExt = ext === "jpeg" ? "jpg" : ext
      const fileName = `${new Date().getTime()}-${name}.${fileExt}`
      writeDir = path.join(process.cwd(), dirName, fileName)
      Jimp.read(bufferFile, (err, res) => {
        if (err) throw err;
        res.quality(80).write(writeDir!);
      });
      return { fileName, url: path.join(dirName, fileName).replace(/\\/g, '/'), dirName: props.dirName, }
    }
    default: throw new Error("Invalid action");
  }
}
