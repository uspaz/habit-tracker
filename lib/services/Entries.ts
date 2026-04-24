import prisma from "../db/prisma";
import { normalizeDate } from "./Date";

export const getEntriesByDate = async () => {

    const entries = await prisma.entry.findMany({
        where: { date: normalizeDate() }
    })

    return entries
}

// Solo trae entries de los últimos 365 días (no todas las de la DB)
export const getManyEntries = async () => {
    const now = new Date()
    const cutoff = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - 365))

    const entries = await prisma.entry.findMany({
        where: { date: { gte: cutoff } },
        orderBy: { date: 'desc' }
    })

    return entries
}