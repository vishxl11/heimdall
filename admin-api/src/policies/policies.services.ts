import prisma from '../common/prisma.js'
import createAuditLog from '../common/audit-service.js'
import type { CreatePolicyInput, UpdatePolicyInput } from './policies.schema.js'

export async function createPolicy(data: CreatePolicyInput, adminId: string) {
    const policy = await prisma.rateLimitPolicy.create(
        { data }
    )

    await createAuditLog(adminId, 'POLICY_CREATED', 'POLICY', policy.id, null, policy)

    return policy
}

export async function getPolicies() {

    return prisma.rateLimitPolicy.findMany()
}

export async function getPolicyById(id: string) {

    return prisma.rateLimitPolicy.findUnique({ where: { id } })
}

export async function updatePolicy(id: string, data: UpdatePolicyInput, adminId: string) {

    const previous = await prisma.rateLimitPolicy.findUnique(
        { where: { id } 
    })

    const updated = await prisma.rateLimitPolicy.update(
        { where: { id }, data: JSON.parse(JSON.stringify(data)) 
    })

    await createAuditLog(adminId, 'POLICY_UPDATED', 'POLICY', id, previous, updated)


    return updated
}

export async function deletePolicy(id: string, adminId: string) {

    const previous = await prisma.rateLimitPolicy.findUnique(
        { where: { id }
     })

    await prisma.rateLimitPolicy.delete(
        { where: { id } 
    })
    
    await createAuditLog(adminId, 'POLICY_DELETED', 'POLICY', id, previous, null)
}