import prisma from '../common/prisma.js'
import createAuditLog from '../common/audit-service.js'
import bcrypt from 'bcrypt'
import type { UpdateUserInput } from './users.schema.js'

export async function getUsers() {
    return prisma.adminUser.findMany({
        select: {
            adminId: true,
            email: true,
            createdAt: true
        }
    })
}

export async function getUserById(adminId: string) {
    return prisma.adminUser.findUnique({
        where: { adminId },
        select: {
            adminId: true,
            email: true,
            createdAt: true
        }
    })
}

export async function updateUser(adminId: string, data: UpdateUserInput, requesterId: string) {

    const previous = await prisma.adminUser.findUnique({ where: { adminId } })

    if (data.password) {
        data.password = await bcrypt.hash(data.password, 5)
    }

    const updated = await prisma.adminUser.update({
        where: { adminId },
        data: JSON.parse(JSON.stringify(data)),
        select: {
            adminId: true,
            email: true,
            createdAt: true
        }
    })

    await createAuditLog(requesterId, 'USER_UPDATED', 'ADMIN_USER', adminId, previous, updated)

    return updated
}

export async function deleteUser(adminId: string, requesterId: string) {

    const previous = await prisma.adminUser.findUnique({ where: { adminId } })

    await prisma.adminUser.delete({ where: { adminId } })

    await createAuditLog(requesterId, 'USER_DELETED', 'ADMIN_USER', adminId, previous, null)
}