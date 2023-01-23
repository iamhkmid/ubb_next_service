import express from "express"
import cloudinary from "../libs/cloudinary"
import { prisma } from "../libs/prisma"

type TReqBody =
  {
    type: "CREATE",
    data: { file: string; bookId: string; type: string; }
  } |
  {
    type: "UPDATE",
    data: { file: string; imageId: string; publicId: string; }
  }

type TResBody = { statusCode: string; message?: string; data?: { id: string; type: string; publicId: string; url: string; secureUrl: string; } }

type TUploadBookImage = (
  req: express.Request<any, any, TReqBody>,
  res: express.Response<TResBody>,
  next: express.NextFunction
) => void

export const uploadBookImage: TUploadBookImage = async (req, res, next) => {
  const file = req.body.data?.file
  const fileTypes = ["image/jpeg", "image/png"]
  const limit = 1048576
  const bufferFile = Buffer.from(file.split("base64,")[1], "base64")
  if (bufferFile.byteLength > limit) res.send({ statusCode: "400", message: `Max file size ${limit / 1024}` })
  if (!fileTypes.includes(file.substring(file.indexOf("data:") + "data:".length, file.lastIndexOf(";base64")))) res.send({ statusCode: "504", message: "Invalid file type" })

  try {
    switch (req.body.type) {
      case "CREATE": {
        const { data: { bookId, file, type } } = req.body
        const image = await cloudinary().uploader.upload(file, { folder: "ubb_press/books" })
        const updateBook = await prisma.bookImage.create({
          data: { type, publicId: image.public_id, url: image.url, secureUrl: image.secure_url, Book: { connect: { id: bookId } } }
        })
        const { id, publicId, url, secureUrl } = updateBook
        res.send({ statusCode: "200", data: { id, type, publicId, url, secureUrl }, message: "Success create book image" })
        break;
      }
      case "UPDATE": {
        const { data: { imageId, file, publicId: deletedPublicId } } = req.body
        const deleteImg = await cloudinary().uploader.destroy(deletedPublicId)
        if (deleteImg?.result !== "ok") throw new Error("failed delete book file")
        else {
          const image = await cloudinary().uploader.upload(file, { folder: "ubb_press/books" })
          const updateBook = await prisma.bookImage.update({
            where: { id: imageId },
            data: { publicId: image.public_id, url: image.url, secureUrl: image.secure_url }
          })
          const { id, publicId, url, type, secureUrl } = updateBook
          res.send({ statusCode: "200", data: { id, type, publicId, url, secureUrl }, message: "Success update book image" })
        }
        break;
      }
      default:
        res.send({ statusCode: "500", message: "Invalid upload type" })
        break;
    }
  } catch (error) {
    res.send({ statusCode: "500", message: "Something went wrong" })
  }
}