import { rest } from "msw";
import { mockServer } from "../mocks/server";

const baseUrl = process.env.ECOMMERCE_API_BASE_URL;

export function mockRestRequest({
  url,
  statusCode = 200,
  responseData = {}
}) {
  mockServer.use(
    rest.get(`${baseUrl}${url}`, (_req, res, ctx) => {
      return res(
        ctx.status(statusCode),
        ctx.json(responseData)
      )
    })
  );
}

export function sendFakeGraphqlRequest({
  document
}) {
  return global.__graphqlExecutor({
    document
  });
}
