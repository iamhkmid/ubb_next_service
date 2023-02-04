import { MutationResolvers, QueryResolvers } from "../../../types/graphql";

export const Query: QueryResolvers = {
  contact: async (_, __, { db }) => {
    return await db.contact.findMany()
  }
};

export const Mutation: MutationResolvers = {
  updateContact: async (_, {data}, { db }) => {
    return await db.$transaction(
      data.map((contact)=> db.contact.update({
        where: {id: contact?.id},
        data: {
          name: contact?.name || undefined,
          url: contact?.url || undefined
        }
      })
    ))
  }
}
