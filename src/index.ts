import {
  Client,
  Module,
  Args_get,
  Args_post,
  Response,
  manifest,
  Env,
} from "./wrap";
import { fromAxiosResponse, toAxiosRequestConfig } from "./util";

import axios from "axios";
import { PluginFactory } from "@polywrap/core-js";

type NoConfig = Record<string, never>;

const verifyUrlAllowed = (url: string, env: Env) => {
  if(!env) {
    return;
  }

  if(env.urlPrefixWhitelist && env.urlPrefixWhitelist.length && !env.urlPrefixWhitelist.some(x => url.startsWith(x))) {
    throw new Error(`HttpPlugin: URL is not on the whitelist: ${url}`);
  }
  
  if(env.urlPrefixBlocklist && env.urlPrefixBlocklist.some(x => url.startsWith(x))) {
    throw new Error(`HttpPlugin: URL is on the blocklist: ${url}`);
  }
};

export class HttpPlugin extends Module<NoConfig> {
  public async get(args: Args_get, _client: Client): Promise<Response | null> {
    verifyUrlAllowed(args.url, this.env);

    const response = await axios.get<string>(
      args.url,
      args.request ? toAxiosRequestConfig(args.request) : undefined
    );
    return fromAxiosResponse(response);
  }

  public async post(
    args: Args_post,
    _client: Client
  ): Promise<Response | null> {
    verifyUrlAllowed(args.url, this.env);
    
    const response = await axios.post(
      args.url,
      args.request ? args.request.body : undefined,
      args.request ? toAxiosRequestConfig(args.request) : undefined
    );
    return fromAxiosResponse(response);
  }
}

export const httpPlugin: PluginFactory<NoConfig> = () => {
  return {
    factory: () => new HttpPlugin({}),
    manifest,
  };
};

export const plugin = httpPlugin;
