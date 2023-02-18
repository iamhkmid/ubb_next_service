import { BookResolvers, MutationResolvers, QueryResolvers } from "../../../types/graphql";
import { sortBookBy, stringPath } from "./utils";

export const Query: QueryResolvers = {
  books: async (_, { options }, { db }) => {
    const categoryIDs = options?.categoryIds as string[] | undefined

    const books = await db.book.findMany({
      where: {
        AND: categoryIDs ?
          categoryIDs.map((catId) => ({ Categories: { every: { id: catId } } }))
          : undefined,
        price: {
          gte: options?.minAmount || undefined,
          lte: options?.maxAmount || undefined
        },
        OR: options?.search ? [
          { title: { contains: options?.search, mode: "insensitive" } },
          { authorName: { contains: options?.search, mode: "insensitive" } }
        ] : undefined
      },
      cursor: options?.cursor ? { slug: options?.cursor } : undefined,
      take: options?.take || undefined,
      orderBy: sortBookBy(options?.sortBy!)
    })
    return books
  },
  book: async (_, { bookId, slug }, { db }) => {
    const book = await db.book.findUnique({ where: { id: bookId!, slug: slug! } })
    return book
  },
  bookCategories: async (_, __, { db }) => await db.category.findMany(),
  bookCategory: async (_, { categoryId }, { db }) => await db.category.findUnique({ where: { id: categoryId } }),
};

export const Mutation: MutationResolvers = {
  addBook: async (_, { data }, { db }) => {
    const addBook = await db.book.create({
      data: {
        title: data.title,
        authorName: data.authorName,
        price: data.price,
        stock: data.stock,
        publisher: data.publisher,
        description: data.description,
        Categories: { connect: data?.categoryIds?.length ? data.categoryIds.map((catId) => ({ id: catId as string })) : undefined },
        printType: data.printType,
        numberOfPages: data.numberOfPages,
        publicationYear: data.publicationYear,
        isbn: data.isbn,
        slug: stringPath(`${data.title}-${data.authorName}`)
      },
    })
    return addBook
  },
  updateBook: async (_, { data }, { db }) => {
    const updateBook = await db.book.update({
      where: { id: data.bookId },
      data: {
        title: data.title || undefined,
        authorName: data.authorName || undefined,
        price: data.price || undefined,
        stock: data.stock || undefined,
        publisher: data.publisher || undefined,
        Categories: { set: Array.isArray(data?.categoryIds) ? data.categoryIds.map((catId) => ({ id: catId as string })) : undefined },
        description: data.description || undefined,
        printType: data.printType || undefined,
        publicationYear: data.publicationYear || undefined,
        numberOfPages: data.numberOfPages || undefined,
        isbn: data.isbn || undefined,
        slug: data.title && data?.authorName ? stringPath(`${data.title}-${data.authorName}`) : undefined
      },
    })
    return updateBook
  },
  deleteBook: async (_, { bookId }, { db, cloudinary }) => {
    const findBook = await db.book.findUnique({ where: { id: bookId }, select: { Images: { select: { publicId: true } } } })
    const deleteBook = await db.book.delete({ where: { id: bookId } })
    for (const img of findBook?.Images || []) {
      await cloudinary.uploader.destroy(img.publicId)
    }
    return deleteBook
  },
  addBookCategory: async (_, { data }, { db }) => {
    const addBookCategory = await db.category.create({
      data: { name: data.name }
    })
    return addBookCategory
  },
  updateBookCategory: async (_, { data }, { db }) => {
    const updateBookCategory = await db.category.update({
      where: { id: data.categoryId },
      data: { name: data.name || undefined }
    })
    return updateBookCategory
  },
  deleteBookCategory: async (_, { categoryId }, { db }) => {
    const deleteBookCategory = await db.category.delete({ where: { id: categoryId } })
    return deleteBookCategory
  },
}

export const Book: BookResolvers = {
  Images: async ({ id }, __, { db }) => await db.bookImage.findMany({ where: { bookId: id! } }),
  Categories: async ({ id }, __, { db }) => await db.category.findMany({ where: { Books: { some: { id: id! } } } }),
};
