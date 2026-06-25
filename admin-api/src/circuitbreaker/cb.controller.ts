import type { Request, Response, NextFunction } from 'express'
import { createCB, getCBs, getCBById, updateCB, deleteCB } from './cb.services.js'

export const createCBController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cb = await createCB(req.body, (req as any).user.id)
        return res.status(201).json({ cb })
    } catch (e) { next(e) }
}

export const getCBsController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cbs = await getCBs()
        return res.status(200).json({ cbs })
    } catch (e) { next(e) }
}

export const getCBByIdController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cb = await getCBById(req.params.id as string)
        if (!cb) return res.status(404).json({ message: 'Config not found' })
        return res.status(200).json({ cb })
    } catch (e) { next(e) }
}

export const updateCBController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cb = await updateCB(req.params.id as string, req.body, (req as any).user.id)
        return res.status(200).json({ cb })
    } catch (e) { next(e) }
}

export const deleteCBController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await deleteCB(req.params.id as string, (req as any).user.id)
        return res.status(204).send()
    } catch (e) { next(e) }
}