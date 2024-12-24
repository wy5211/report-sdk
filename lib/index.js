"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WXMINISDK = exports.RNSDK = exports.PCSDK = void 0;
const index_pc_1 = __importDefault(require("./index.pc"));
exports.PCSDK = index_pc_1.default;
const index_rn_1 = __importDefault(require("./index.rn"));
exports.RNSDK = index_rn_1.default;
const index_wx_1 = __importDefault(require("./index.wx"));
exports.WXMINISDK = index_wx_1.default;
