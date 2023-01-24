"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = __importDefault(require("../../libs/cloudinary"));
const prisma_1 = require("../../libs/prisma");
const context = async ({ req, res }) => {
    return { req, res, db: prisma_1.prisma, cloudinary: (0, cloudinary_1.default)() };
};
exports.default = context;
