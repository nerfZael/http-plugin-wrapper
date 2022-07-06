import * as Types from "./";
export declare type UInt = number;
export declare type UInt8 = number;
export declare type UInt16 = number;
export declare type UInt32 = number;
export declare type Int = number;
export declare type Int8 = number;
export declare type Int16 = number;
export declare type Int32 = number;
export declare type Bytes = Uint8Array;
export declare type BigInt = string;
export declare type BigNumber = string;
export declare type Json = string;
export declare type String = string;
export declare type Boolean = boolean;
export interface Env extends Record<string, unknown> {
    urlPrefixWhitelist: Array<Types.String>;
    urlPrefixBlocklist: Array<Types.String>;
}
export interface Header {
    key: Types.String;
    value: Types.String;
}
export interface UrlParam {
    key: Types.String;
    value: Types.String;
}
export interface Response {
    status: Types.Int;
    statusText: Types.String;
    headers?: Array<Types.Header> | null;
    body?: Types.String | null;
}
export interface Request {
    headers?: Array<Types.Header> | null;
    urlParams?: Array<Types.UrlParam> | null;
    responseType: Types.ResponseType;
    body?: Types.String | null;
}
export declare enum ResponseTypeEnum {
    TEXT = 0,
    BINARY = 1
}
export declare type ResponseTypeString = "TEXT" | "BINARY";
export declare type ResponseType = ResponseTypeEnum | ResponseTypeString;
