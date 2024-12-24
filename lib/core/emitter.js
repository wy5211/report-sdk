"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const emitterKey_1 = require("../config/emitterKey");
const mitt_1 = __importDefault(require("mitt"));
const emitter = (0, mitt_1.default)();
exports.default = emitter;
