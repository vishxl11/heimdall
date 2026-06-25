import prisma from '../common/prisma.js'
import createAuditLog from '../common/audit-service.js'
import type { CreateCBInput, UpdateCBInput } from './cb.schema.js'

export async function createCB(data: CreateCBInput, adminId: string) {

    const cb = await prisma.circuitBreakerConfig.create({ data })

    await createAuditLog(adminId, 'CB_CREATED', 'CIRCUIT_BREAKER', cb.id, null, cb)

    return cb
}

export async function getCBs() {
    return prisma.circuitBreakerConfig.findMany()
}

export async function getCBById(id: string) {
    return prisma.circuitBreakerConfig.findUnique({ where: { id } })
}

export async function updateCB(id: string, data: UpdateCBInput, adminId: string) {

    const previous = await prisma.circuitBreakerConfig.findUnique({ where: { id } })

    const updated = await prisma.circuitBreakerConfig.update({ where: { id }, data: JSON.parse(JSON.stringify(data)) })

    await createAuditLog(adminId, 'CB_UPDATED', 'CIRCUIT_BREAKER', id, previous, updated)

    return updated
}

export async function deleteCB(id: string, adminId: string) {

    const previous = await prisma.circuitBreakerConfig.findUnique({ where: { id } })

    await prisma.circuitBreakerConfig.delete({ where: { id } })

    await createAuditLog(adminId, 'CB_DELETED', 'CIRCUIT_BREAKER', id, previous, null)
}