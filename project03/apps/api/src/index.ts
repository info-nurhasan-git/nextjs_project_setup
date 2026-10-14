import http from "node:http";
import { createHTTPHandler } from "@trpc/server/adapters/standalone";
import { appRouter, createTRPCContext } from "@repo/server";

const createContext = () => createTRPCContext();

const handlerTrpc = createHTTPHandler({
  router: appRouter,
  createContext,
  basePath: "/trpc/",
});

const handlerApiTrpc = createHTTPHandler({
  router: appRouter,
  createContext,
  basePath: "/api/trpc/",
});

const handlerRoot = createHTTPHandler({
  router: appRouter,
  createContext,
  basePath: "/",
});

const port = Number(process.env.PORT ?? 4000);

const server = http.createServer((req, res) => {
  // Basic CORS for browser clients
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = req.url ?? "/";
  if (url.startsWith("/api/trpc/")) {
    handlerApiTrpc(req, res);
  } else if (url.startsWith("/trpc/")) {
    handlerTrpc(req, res);
  } else {
    handlerRoot(req, res);
  }
});

server.listen(port, () => {
  console.log(`tRPC API server running on http://localhost:${port}`);
});