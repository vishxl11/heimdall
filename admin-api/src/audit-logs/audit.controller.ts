import type { Request, Response, NextFunction } from 'express'
import prisma from '../common/prisma.js'

export const getAuditLogsController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const logs = await prisma.auditLog.findMany({
            orderBy: { createdAt: 'desc' }
        })
        return res.status(200).json({ logs })
    } catch (e) { next(e) }
}

export const getAuditLogByIdController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const log = await prisma.auditLog.findUnique({
            where: { id: req.params.id as string }
        })
        if (!log) return res.status(404).json({ message: 'Log not found' })
        return res.status(200).json({ log })
    } catch (e) { next(e) }
}