"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOptions = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http = __importStar(require("http"));
const altairRoute_1 = __importDefault(require("./src/routes/altairRoute"));
const graphql_1 = __importDefault(require("./src/graphql"));
const PORT = parseInt(process.env.PORT || "3001");
exports.corsOptions = { credentials: true, origin: "*" };
const main = async () => {
    const app = (0, express_1.default)();
    if (process.env.NODE_ENV === "production") {
        app.use((req, res, next) => {
            if (req.header("x-forwarded-proto") !== "https")
                res.redirect(`https://${req.header("host")}${req.url}`);
            else
                next();
        });
    }
    app.use(express_1.default.json());
    app.use((0, cors_1.default)(exports.corsOptions));
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use("/altair", altairRoute_1.default);
    const httpServer = http.createServer(app);
    (0, graphql_1.default)({ app, httpServer });
    httpServer.listen(PORT, (err) => {
        if (err)
            throw err;
        console.log(`⚡️Server is listening on port ${PORT}`);
        console.log(`GraphQL path: "/graphql"`);
    });
    process.on("warning", (warning) => {
        console.warn(warning.name); // Print the warning name
        console.warn(warning.message); // Print the warning message
        console.warn(warning.stack); // Print the stack trace
    });
};
main().catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
});
