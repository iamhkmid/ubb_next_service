"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Query = void 0;
exports.Query = {
    books: async (_, __, { db }) => await db.book.findMany({
        include: {
            Image: true,
        }
    })
};
