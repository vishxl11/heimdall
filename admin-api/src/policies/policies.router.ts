import { Router } from 'express'
import { auth } from '../auth/auth.middleware.js'
import { validateSchema } from '../common/validate.middleware.js'
import { CreatePolicySchema, UpdatePolicySchema } from './policies.schema.js'
import { createPolicyController, getPoliciesController, getPolicyByIdController, updatePolicyController, deletePolicyController } from './policies.controller.js'

const policiesRouter = Router()

policiesRouter.post('/policies', auth, validateSchema(CreatePolicySchema), createPolicyController)

policiesRouter.get('/policies', auth, getPoliciesController)

policiesRouter.get('/policies/:id', auth, getPolicyByIdController)

policiesRouter.patch('/policies/:id', auth, validateSchema(UpdatePolicySchema), updatePolicyController)

policiesRouter.delete('/policies/:id', auth, deletePolicyController)

export default policiesRouter