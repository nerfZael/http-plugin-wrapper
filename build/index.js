"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.plugin = exports.httpPlugin = exports.HttpPlugin = void 0;
var wrap_1 = require("./wrap");
var util_1 = require("./util");
var axios_1 = __importDefault(require("axios"));
var verifyUrlAllowed = function (url, env) {
    if (env.urlPrefixBlocklist && env.urlPrefixBlocklist.some(function (x) { return url.startsWith(x); })) {
        throw new Error("HttpPlugin: URL is on the blocklist: " + url);
    }
    if (env.urlPrefixWhitelist && !env.urlPrefixWhitelist.some(function (x) { return url.startsWith(x); })) {
        throw new Error("HttpPlugin: URL is not on the whitelist: " + url);
    }
};
var HttpPlugin = /** @class */ (function (_super) {
    __extends(HttpPlugin, _super);
    function HttpPlugin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HttpPlugin.prototype.get = function (args, _client, env) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1.default.get(args.url, args.request ? util_1.toAxiosRequestConfig(args.request) : undefined)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, util_1.fromAxiosResponse(response)];
                }
            });
        });
    };
    HttpPlugin.prototype.post = function (args, _client, env) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        verifyUrlAllowed(args.url, env);
                        return [4 /*yield*/, axios_1.default.post(args.url, args.request ? args.request.body : undefined, args.request ? util_1.toAxiosRequestConfig(args.request) : undefined)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, util_1.fromAxiosResponse(response)];
                }
            });
        });
    };
    return HttpPlugin;
}(wrap_1.Module));
exports.HttpPlugin = HttpPlugin;
exports.httpPlugin = function () {
    return {
        factory: function () { return new HttpPlugin({}); },
        manifest: wrap_1.manifest,
    };
};
exports.plugin = exports.httpPlugin;