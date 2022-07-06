"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toAxiosRequestConfig = exports.fromAxiosResponse = void 0;
var wrap_1 = require("./wrap");
/**
 * Convert AxiosResponse<string> to Response
 *
 * @param axiosResponse
 */
function fromAxiosResponse(axiosResponse) {
    var e_1, _a;
    var responseHeaders = [];
    try {
        for (var _b = __values(Object.keys(axiosResponse.headers)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var key = _c.value;
            responseHeaders.push({
                key: key,
                value: Array.isArray(axiosResponse.headers[key])
                    ? axiosResponse.headers[key].join(" ")
                    : axiosResponse.headers[key],
            });
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    var response = {
        status: axiosResponse.status,
        statusText: axiosResponse.statusText,
        headers: responseHeaders,
    };
    // encode bytes as base64 string if response is array buffer
    if (axiosResponse.config.responseType == "arraybuffer") {
        if (!Buffer.isBuffer(axiosResponse.data)) {
            throw Error("HttpPlugin: Axios response data malformed, must be a buffer. Type: " +
                typeof axiosResponse.data);
        }
        return __assign(__assign({}, response), { body: Buffer.from(axiosResponse.data).toString("base64") });
    }
    else {
        switch (typeof axiosResponse.data) {
            case "string":
            case "undefined":
                return __assign(__assign({}, response), { body: axiosResponse.data });
            default:
                return __assign(__assign({}, response), { body: JSON.stringify(axiosResponse.data) });
        }
    }
}
exports.fromAxiosResponse = fromAxiosResponse;
/**
 * Creates AxiosRequestConfig from Request
 *
 * @param request
 */
function toAxiosRequestConfig(request) {
    var _a, _b;
    var urlParams = (_a = request.urlParams) === null || _a === void 0 ? void 0 : _a.reduce(function (params, p) {
        var _a;
        return __assign(__assign({}, params), (_a = {}, _a[p.key] = p.value, _a));
    }, {});
    var requestHeaders = (_b = request.headers) === null || _b === void 0 ? void 0 : _b.reduce(function (headers, h) {
        var _a;
        return __assign(__assign({}, headers), (_a = {}, _a[h.key] = h.value, _a));
    }, {});
    var responseType = "text";
    switch (request.responseType) {
        case "BINARY":
        case wrap_1.ResponseTypeEnum.BINARY:
            responseType = "arraybuffer";
    }
    var config = {
        responseType: responseType,
    };
    if (urlParams) {
        config = __assign(__assign({}, config), { params: urlParams });
    }
    if (requestHeaders) {
        config = __assign(__assign({}, config), { headers: requestHeaders });
    }
    return config;
}
exports.toAxiosRequestConfig = toAxiosRequestConfig;