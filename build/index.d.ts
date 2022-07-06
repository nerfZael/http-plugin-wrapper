import { Client, Module, Args_get, Args_post, Response, Env } from "./wrap";
import { PluginFactory } from "@polywrap/core-js";
declare type NoConfig = Record<string, never>;
export declare class HttpPlugin extends Module<NoConfig> {
    get(args: Args_get, _client: Client, env: Env): Promise<Response | null>;
    post(args: Args_post, _client: Client, env: Env): Promise<Response | null>;
}
export declare const httpPlugin: PluginFactory<NoConfig>;
export declare const plugin: PluginFactory<Record<string, never>>;
export {};
