// import { GraphQLError } from "graphql";
// import cloudinary from "../../../libs/cloudinary";
// import { MutationResolvers, QueryResolvers } from "../../../types/graphql";
// import { saveBanner, stringPath } from "./utils";

// export const Query: QueryResolvers = {
//   banners: async (_, __, { db }) => {
//     return await db.banner.findMany()
//   }
// };

// export const Mutation: MutationResolvers = {
//   addBanner: async (_, { imageBase64 }, { db }) => {

//     const { path } = await saveBanner({ fileName: stringPath(data.), file: imageBase64, type: "cover" })
//       .catch(() => {
//         throw new GraphQLError("Failed upload file", { extensions: { code: 'INTERNAL_SERVER_ERROR' } })
//       })

//     return await db.banner.create({
//       data: {
//         image: image.,
//       }
//     })
//   },
//   deleteBanner: async (_, { bannerId }, { db, cloudinary }) => {
//     const deleteBanner = await db.banner.delete({ where: { id: bannerId } })
//     if (deleteBanner?.publicId) await cloudinary.uploader.destroy(deleteBanner.publicId)
//     return deleteBanner
//   },
// }
