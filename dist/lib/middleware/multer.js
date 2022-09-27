"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initMulterMidlleware = exports.multerOptions = void 0;
const multer_1 = __importDefault(require("multer"));
exports.multerOptions = {};
const initMulterMidlleware = () => {
    return (0, multer_1.default)(exports.multerOptions);
};
exports.initMulterMidlleware = initMulterMidlleware;
//# sourceMappingURL=multer.js.map