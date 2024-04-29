import { createRequest, CreateRequestFn, joinUrl } from "@mukhindev/request";
import { JSON_PLACEHOLDER_API_HOST } from "../constants";

export const createJsonPlaceholderRequest: CreateRequestFn = (
  forwardOptions,
) => {
  return createRequest(async (options) => {
    const { url, ...other } = await forwardOptions(options);

    // Long delay imitation for better demo perception
    await delay(1500);

    return {
      url: joinUrl(JSON_PLACEHOLDER_API_HOST, url),
      ...other,
    };
  });
};

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
