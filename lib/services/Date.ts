import prisma from "@/lib/db/prisma"
import { getHabitDay, normalizeDate } from "@/lib/utils/date"

// Re-exportar las utils para mantener compatibilidad con imports existentes
export { normalizeDate, dayKey, getHabitDay } from "@/lib/utils/date"

// Lógica de negocio: verificar y completar un hábito hoy
export const checkHabitToday = async (habitId: string) => {

    const habit = await prisma.habit.findUnique({
        where: { id: habitId }
    })

    if (!habit) {
        throw new Error("El habito no ha sido encontrado")
    }

    if (!habit.activeDays.includes(getHabitDay().toString())) {
        throw new Error("Hoy no se puede completar")
    }


    const newEntry = await prisma.entry.create({
        data: {
            habitId: habit.id,
            date: normalizeDate()
        }
    })

    return newEntry
}