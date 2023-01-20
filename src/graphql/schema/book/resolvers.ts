import { QueryResolvers } from "../../../types/graphql";
import { TBookQuery } from "../../../types/graphql_book";

export const Query: QueryResolvers = {
  books: async (_, __, { db }) => await db.book.findMany({
    include: {
      Image: true,
    }
  })
};
