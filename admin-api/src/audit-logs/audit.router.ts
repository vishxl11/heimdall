import { Router } from 'express'
import { getAuditLogsController, getAuditLogByIdController } from './audit.controller.js'
import { auth } from '../auth/auth.middleware.js'

const auditRouter = Router()

auditRouter.get('/audit-logs', auth, getAuditLogsController)
auditRouter.get('/audit-logs/:id', auth, getAuditLogByIdController)

export default auditRouter