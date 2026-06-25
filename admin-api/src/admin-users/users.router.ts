import { Router } from 'express'
import { auth } from '../auth/auth.middleware.js'
import { validateSchema } from '../common/validate.middleware.js'
import { UpdateUserSchema } from './users.schema.js'
import { getUsersController, getUserByIdController, updateUserController, deleteUserController } from './users.controller.js'

const usersRouter = Router()

usersRouter.get('/users', auth, getUsersController)
usersRouter.get('/users/:id', auth, getUserByIdController)
usersRouter.patch('/users/:id', auth, validateSchema(UpdateUserSchema), updateUserController)
usersRouter.delete('/users/:id', auth, deleteUserController)

export default usersRouter