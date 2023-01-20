"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    overwrite: true,
    schema: "http://localhost:3001/graphql",
    generates: {
        "src/types/graphql.d.ts": {
            plugins: ["typescript", "typescript-resolvers"],
            config: {
                contextType: "./graphql_ctx#TGraphqlCtx"
            }
        },
        "./graphql.schema.json": {
            plugins: ["introspection"]
        }
    }
};
exports.default = config;
