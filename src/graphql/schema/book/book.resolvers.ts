import { BookResolvers, MutationResolvers, QueryResolvers } from "../../../types/graphql";

export const Query: QueryResolvers = {
  books: async (_, __, { db }) => await db.book.findMany(),
  book: async (_, { bookId }, { db }) => await db.book.findUnique({ where: { id: bookId } })
};

export const Mutation: MutationResolvers = {

}

export const Book: BookResolvers = {
  Images: async ({ id }, __, { db }) => db.bookImage.findMany({ where: { bookId: id! } }),
  Categories: async ({ id }, __, { db }) => db.category.findMany({ where: { Books: { some: { id: id! } } } }),
};
