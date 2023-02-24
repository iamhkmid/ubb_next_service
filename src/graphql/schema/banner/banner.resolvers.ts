import { GraphQLError } from "graphql";
import cloudinary from "../../../libs/cloudinary";
import { MutationResolvers, QueryResolvers } from "../../../types/graphql";
import fs from "fs"
import path from "path"
import { saveImage, stringPath } from "../../../libs/utils";

export const Query: QueryResolvers = {
  banners: async (_, __, { db }) => {
    return (await db.banner.findMany()).map((banner) => {
      const { url, ...rest } = banner
      return { ...rest, imageUrl: `${process.env.BASE_URL}${url}` }
    })
  }
};

export const Mutation: MutationResolvers = {
  addBanner: async (_, { imageBase64 }, { db }) => {

    const { url, fileName } = await saveImage({ action: "C", name: `banner`, file: imageBase64, folder: "/images/banners" })
      .catch(() => {
        throw new GraphQLError("Failed upload file", { extensions: { code: 'INTERNAL_SERVER_ERROR' } })
      })

    const banner = await db.banner.create({
      data: { url: url!, fileName }
    })
    return { ...banner, imageUrl: `${process.env.BASE_URL}${banner.url}` }
  },
  deleteBanner: async (_, { bannerId }, { db }) => {
    const deleteBanner = await db.banner.delete({ where: { id: bannerId } })
    const fileDir = path.join(process.cwd(), "/../uploads/images/banners", deleteBanner.fileName)
    if (deleteBanner && fs.existsSync(fileDir)) {
      fs.unlinkSync(fileDir)
    }
    return deleteBanner
  },
}
