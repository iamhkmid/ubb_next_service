"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const context_1 = __importDefault(require("./context"));
const drainHttpServer_1 = require("@apollo/server/plugin/drainHttpServer");
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = require("body-parser");
const express4_1 = require("@apollo/server/express4");
const schema_1 = __importDefault(require("./schema"));
const graphqlServer = async ({ app, httpServer }) => {
    const server = new server_1.ApolloServer({
        schema: schema_1.default,
        introspection: true,
        plugins: [(0, drainHttpServer_1.ApolloServerPluginDrainHttpServer)({ httpServer })],
    });
    await server.start();
    app.use('/graphql', (0, cors_1.default)({ origin: "*", exposedHeaders: ['Authorization'], allowedHeaders: ['Authorization'] }), (0, body_parser_1.json)(), (0, express4_1.expressMiddleware)(server, { context: context_1.default }));
};
exports.default = graphqlServer;
