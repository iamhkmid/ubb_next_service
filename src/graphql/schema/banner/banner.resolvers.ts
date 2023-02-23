import { GraphQLError } from "graphql";
import cloudinary from "../../../libs/cloudinary";
import { MutationResolvers, QueryResolvers } from "../../../types/graphql";
import { saveBanner, stringPath } from "./utils";
import fs from "fs"
import path from "path"

export const Query: QueryResolvers = {
  banners: async (_, __, { db }) => {
    return await db.banner.findMany()
  }
};

export const Mutation: MutationResolvers = {
  addBanner: async (_, { imageBase64 }, { db }) => {

    const { path } = await saveBanner({ fileName: stringPath((new Date()).getTime().toString()), file: imageBase64 })
      .catch(() => {
        throw new GraphQLError("Failed upload file", { extensions: { code: 'INTERNAL_SERVER_ERROR' } })
      })

    const banner = await db.banner.create({
      data: {
        image: path,
      }
    })
    return { ...banner, image: `${process.env.BASE_URL}${banner.image}` }
  },
  deleteBanner: async (_, { bannerId }, { db }) => {
    const deleteBanner = await db.banner.delete({ where: { id: bannerId } })
    const fileDir = path.join(process.cwd(), "/../", deleteBanner.image)
    if (deleteBanner && fs.existsSync(fileDir)) {
      fs.unlinkSync(fileDir)
    }
    return deleteBanner
  },
}
