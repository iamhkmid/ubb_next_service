"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const context_1 = __importDefault(require("./context"));
const drainHttpServer_1 = require("@apollo/server/plugin/drainHttpServer");
const typeDefs_1 = __importDefault(require("./schema/typeDefs"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = require("body-parser");
const express4_1 = require("@apollo/server/express4");
const resolvers_1 = __importDefault(require("./schema/resolvers"));
const graphqlServer = async ({ app, httpServer }) => {
    const server = new server_1.ApolloServer({
        typeDefs: typeDefs_1.default,
        resolvers: resolvers_1.default,
        plugins: [(0, drainHttpServer_1.ApolloServerPluginDrainHttpServer)({ httpServer })],
    });
    await server.start();
    app.use('/graphql', (0, cors_1.default)(), (0, body_parser_1.json)(), (0, express4_1.expressMiddleware)(server, { context: context_1.default }));
};
exports.default = graphqlServer;
