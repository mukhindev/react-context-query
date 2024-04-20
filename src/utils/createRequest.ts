import { createSearchParams } from "./createSearchParams.ts";
import { API_HOST } from "../config.ts";
import { joinUrlParts } from "./joinUrlParts.ts";
import { createHeaders } from "./createHeaders.ts";

type CustomOptions = object & Partial<Request>;

export type Reply<Data> = {
  data: Data;
  request: Request;
  response: Response;
  headers: Record<string, string>;
  status: number;
};

export type RequestOptions = Omit<Partial<Request>, "headers"> & {
  params?: Record<string, unknown>;
  headers?: Record<string, string | number | boolean>;
};

export function createRequest<Options extends CustomOptions, Data = unknown>(
  getOptions: (options: Options) => RequestOptions,
) {
  return async (options: Options): Promise<Reply<Data>> => {
    const {
      url = "",
      headers = {},
      params = {},
      ...requestOptions
    } = getOptions(options);

    const requestUrl = new URL(joinUrlParts(API_HOST, url));
    const searchParams = createSearchParams(params);
    requestUrl.search = searchParams.toString();

    const request = new Request(requestUrl, {
      headers: createHeaders(headers),
      ...requestOptions,
    });

    const response = await fetch(request);
    const data = (await response.json()) as Data;

    const reply: Reply<Data> = {
      data,
      request,
      response,
      headers: Object.fromEntries(response.headers.entries()),
      status: response.status,
    };

    // Simulating a slow request
    await delay(3000);

    if (response.status >= 400) {
      throw reply;
    }

    return reply;
  };
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
