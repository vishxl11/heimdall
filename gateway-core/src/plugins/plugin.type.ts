import type { Request, Response, NextFunction } from 'express'
import type { Route } from '../types/route.js'

export type Plugin = (req: Request, res: Response, next: NextFunction, route: Route) => void | Promise<void | Response>