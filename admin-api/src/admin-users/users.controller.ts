import type { Request, Response, NextFunction } from 'express'
import { getUsers, getUserById, updateUser, deleteUser } from './users.services.js'

export const getUsersController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await getUsers()
        return res.status(200).json({ users })
    } catch (e) { next(e) }
}

export const getUserByIdController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await getUserById(req.params.id as string)
        if (!user) return res.status(404).json({ message: 'User not found' })
        return res.status(200).json({ user })
    } catch (e) { next(e) }
}

export const updateUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await updateUser(req.params.id as string, req.body, (req as any).user.id)
        return res.status(200).json({ user })
    } catch (e) { next(e) }
}

export const deleteUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await deleteUser(req.params.id as string, (req as any).user.id)
        return res.status(204).send()
    } catch (e) { next(e) }
}