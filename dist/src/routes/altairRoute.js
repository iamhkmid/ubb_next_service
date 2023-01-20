"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const altair_express_middleware_1 = require("altair-express-middleware");
const express_1 = __importDefault(require("express"));
const altairRoute = express_1.default.Router();
const checkEnv = (req, res, next) => {
    process.env.NODE_ENV === "development"
        ? next()
        : res.end("Development only");
};
altairRoute.use("/", (0, altair_express_middleware_1.altairExpress)({
    endpointURL: "/graphql",
    subscriptionsEndpoint: `ws://localhost:3001/subscriptions`,
    initialQuery: ``,
}));
exports.default = altairRoute;
