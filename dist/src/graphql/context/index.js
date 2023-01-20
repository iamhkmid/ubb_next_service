"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../serivces/prisma");
const context = async ({ req, res }) => {
    return { req, res, db: prisma_1.prisma };
};
exports.default = context;
