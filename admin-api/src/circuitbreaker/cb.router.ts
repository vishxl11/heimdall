import { Router } from 'express'
import { auth } from '../auth/auth.middleware.js'
import { validateSchema } from '../common/validate.middleware.js'
import { CreateCBSchema, UpdateCBSchema } from './cb.schema.js'
import { createCBController, getCBsController, getCBByIdController, updateCBController, deleteCBController } from './cb.controller.js'

const cbRouter = Router()

cbRouter.post('/circuitbreaker', auth, validateSchema(CreateCBSchema), createCBController)
cbRouter.get('/circuitbreaker', auth, getCBsController)
cbRouter.get('/circuitbreaker/:id', auth, getCBByIdController)
cbRouter.patch('/circuitbreaker/:id', auth, validateSchema(UpdateCBSchema), updateCBController)
cbRouter.delete('/circuitbreaker/:id', auth, deleteCBController)

export default cbRouter