"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.naiveIssueSearch = void 0;
var util = __importStar(require("../lib/util"));
var alfy = require('alfy');
// Deprecated in favour of native
var naiveIssueSearch = function (issues) {
    return alfy.inputMatches(issues, function (item, input) {
        input = input.toLowerCase();
        return util.substrSearch(item.idReadable, input) ||
            util.substrSearch(item.summary, input) ||
            util.substrSearch(item.description, input);
    });
};
exports.naiveIssueSearch = naiveIssueSearch;
