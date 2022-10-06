"use strict";
//import "dotenv/config";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./config"));
const app_1 = __importDefault(require("./app"));
const port = config_1.default.PORT;
app_1.default.listen(port, () => {
    console.log(`[server]: server is running at http//:localhost:${port}`);
});
//# sourceMappingURL=server.js.map