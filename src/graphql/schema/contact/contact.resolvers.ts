import { MutationResolvers, QueryResolvers } from "../../../types/graphql";

export const Query: QueryResolvers = {
  contact: async (_, { contactId, name }, { db }) => {
    return await db.contact.findUnique({
      where: { id: contactId!, name: name! }
    })
  },
  contacts: async (_, __, { db }) => {
    return await db.contact.findMany()
  }
};

export const Mutation: MutationResolvers = {
  updateContact: async (_, { data }, { db }) => {
    return await db.contact.update({
      where: { id: data?.id },
      data: {
        name: data?.name || undefined,
        url: data?.url || undefined
      }
    })
  },
  updateContacts: async (_, { data }, { db }) => {
    return await db.$transaction(
      data.map((contact) => db.contact.update({
        where: { id: contact?.id },
        data: {
          name: contact?.name || undefined,
          url: contact?.url || undefined
        }
      })
      ))
  }
}
