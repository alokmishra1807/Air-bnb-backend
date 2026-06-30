import { createProxyMiddleware, RequestHandler } from "http-proxy-middleware";
import { AuthenticatedRequest } from "./isAuth.middleware";
import { Request } from "express";

export const proxyToService = (
  target: string,
  //   pathPrefix: string
): RequestHandler => {
  return createProxyMiddleware({
    target,
    changeOrigin: true,

    pathRewrite: (path, req) => {
      return (req as Request).originalUrl;
    },

    on: {
      proxyReq: (proxyReq, req) => {
        const authReq = req as AuthenticatedRequest;

        if (authReq.user?.id) {
          proxyReq.setHeader("X-User-ID", authReq.user.id);
        }

        if (authReq.user?.email) {
          proxyReq.setHeader("X-User-Email", authReq.user.email);
        }
      },
    },
  });
};
