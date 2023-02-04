import { MutationResolvers, QueryResolvers } from "../../../types/graphql";

export const Query: QueryResolvers = {
  banners: async (_, __, { db }) => {
    return await db.banner.findMany()
  }
};

export const Mutation: MutationResolvers = {
  addBanner: async (_, { data }, { db }) => {
    return await db.banner.create({
      data: {
        title: data.title,
        image: "aa",
        publicId: "aa"
      }
    })
  }
}
