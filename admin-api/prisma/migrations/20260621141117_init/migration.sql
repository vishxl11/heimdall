-- CreateEnum
CREATE TYPE "RateLimitKey" AS ENUM ('USER_ID', 'API_KEY', 'IP');

-- CreateTable
CREATE TABLE "AdminUser" (
    "adminId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("adminId")
);

-- CreateTable
CREATE TABLE "Route" (
    "adminId" TEXT NOT NULL,
    "routeId" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "upstreamURL" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Route_pkey" PRIMARY KEY ("routeId")
);

-- CreateTable
CREATE TABLE "RateLimitPolicy" (
    "id" TEXT NOT NULL,
    "routeId" TEXT NOT NULL,
    "limit" INTEGER NOT NULL,
    "windowSeconds" INTEGER NOT NULL,
    "identifierType" "RateLimitKey" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RateLimitPolicy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CircuitBreakerConfig" (
    "id" TEXT NOT NULL,
    "routeId" TEXT NOT NULL,
    "failureThreshold" INTEGER NOT NULL,
    "windowSeconds" INTEGER NOT NULL,
    "openDurationSeconds" INTEGER NOT NULL,
    "halfOpenMaxRequests" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CircuitBreakerConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "previousValue" JSONB,
    "newValue" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_email_key" ON "AdminUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "RateLimitPolicy_routeId_key" ON "RateLimitPolicy"("routeId");

-- CreateIndex
CREATE UNIQUE INDEX "CircuitBreakerConfig_routeId_key" ON "CircuitBreakerConfig"("routeId");

-- AddForeignKey
ALTER TABLE "Route" ADD CONSTRAINT "Route_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "AdminUser"("adminId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RateLimitPolicy" ADD CONSTRAINT "RateLimitPolicy_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "Route"("routeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CircuitBreakerConfig" ADD CONSTRAINT "CircuitBreakerConfig_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "Route"("routeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "AdminUser"("adminId") ON DELETE RESTRICT ON UPDATE CASCADE;
