import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../../app/generated/prisma/client'

// Singleton: evita crear múltiples conexiones a la DB durante Hot Module Replacement (HMR)
// globalThis persiste entre recargas de módulos en desarrollo
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

function createPrismaClient() {
    const adapter = new PrismaPg({
        connectionString: process.env.DATABASE_URL!
    })
    return new PrismaClient({ adapter })
}

// Reutiliza la instancia existente o crea una nueva
const prisma = globalForPrisma.prisma || createPrismaClient()

// Solo en desarrollo: guardar en globalThis para reutilizar entre HMR
if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma
}

export default prisma