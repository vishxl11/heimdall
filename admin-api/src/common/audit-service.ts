import { Prisma } from "@prisma/client";
import prisma from "./prisma.js";

export default async function createAuditLog(adminId: string,
  action: string,
  entityType: string,
  entityId: string,
  previousValue: object | null,
  newValue: object | null)
{

   await prisma.auditLog.create(
    {
      data:{
        adminId,
        action,
        entityType,
        entityId,
      previousValue: previousValue as any,
      newValue: newValue as any,
    }})

}