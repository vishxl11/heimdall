import type { Request, Response, NextFunction } from "express"
import { createProxyMiddleware } from "http-proxy-middleware"

const proxyCache = new Map()

export const proxyController = (req: Request, res: Response, next: NextFunction) => {
    try {
        const route = (req as any).matchedRoute

        let proxy = proxyCache.get(route.upstreamURL)
        if (!proxy) {
            proxy = createProxyMiddleware({
                target: route.upstreamURL,
                changeOrigin: true,
                pathRewrite: { [`^${route.path}`]: '' }
            })
            proxyCache.set(route.upstreamURL, proxy)
        }

        proxy(req, res, next)
    }
    catch (e) {
        next(e)
    }
}