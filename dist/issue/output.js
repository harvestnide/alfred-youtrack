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
exports.issueOutput = void 0;
var util = __importStar(require("../lib/util"));
var alfy = require('alfy');
var issueOutput = function (matchedIssues, addMatchField) {
    if (addMatchField === void 0) { addMatchField = false; }
    alfy.output(matchedIssues.map(function (issue) { return formatIssuePayload(issue, addMatchField); }), 15);
};
exports.issueOutput = issueOutput;
var formatIssuePayload = function (issue, addMatchField) {
    var _a, _b, _c;
    return ({
        title: issue.idReadable + ": " + issue.summary,
        subtitle: (_a = util.charTrim(issue.description)) !== null && _a !== void 0 ? _a : 'Issue has no description',
        arg: process.env.baseUrl + "/issue/" + issue.idReadable,
        match: addMatchField ? issue.idReadable + " " + ((_b = issue.summary) !== null && _b !== void 0 ? _b : '') + " " + ((_c = issue.description) !== null && _c !== void 0 ? _c : '') : null
    });
};
