import { GraphQLError } from "graphql";
import cloudinary from "../../../libs/cloudinary";
import { MutationResolvers, QueryResolvers } from "../../../types/graphql";

export const Query: QueryResolvers = {
  banners: async (_, __, { db }) => {
    return await db.banner.findMany()
  }
};

export const Mutation: MutationResolvers = {
  addBanner: async (_, { imageBase64 }, { db }) => {
    const file = imageBase64
    const fileTypes = ["image/jpeg", "image/png"]
    const limit = 1048576
    const bufferFile = Buffer.from(file.split("base64,")[1], "base64")
    if (bufferFile.byteLength > limit) throw new GraphQLError(`Max file size ${limit / 1024}`, { extensions: { code: 'BAD_REQUEST' } })
    if (!fileTypes.includes(file.substring(file.indexOf("data:") + "data:".length, file.lastIndexOf(";base64")))) throw new GraphQLError("Invalid file type", { extensions: { code: 'BAD_REQUEST' } })

    const image = await cloudinary().uploader.upload(file, { folder: "ubb_press/banners" })

    return await db.banner.create({
      data: {
        image: image.secure_url,
        publicId: image.public_id
      }
    })
  },
  deleteBanner: async (_, { bannerId }, { db, cloudinary }) => {
    const deleteBanner = await db.banner.delete({ where: { id: bannerId } })
    if(deleteBanner?.publicId) await cloudinary.uploader.destroy(deleteBanner.publicId)
    return deleteBanner
  },
}
