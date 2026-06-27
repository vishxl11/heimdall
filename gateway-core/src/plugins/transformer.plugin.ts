import type { Plugin } from './plugin.type.js'

export const transformerPlugin: Plugin = async (req, res, next, route) => {
    req.headers['x-gateway'] = 'Heimdall'
    next()
}