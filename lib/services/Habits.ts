import prisma from "@/lib/db/prisma";
import { normalizeDate } from "./Date";

// Tipo para la creación de hábitos — definido en el servicio
export type CreateHabitInput = {
    title: string;
    activeDays: string[];
    color: string;
    icon: string;
    hour: string;
}

const getHabits = async () => {
    const habits = await prisma.habit.findMany()
    return habits
}

const getHabitById = async (id: string) => {
    const habit = await prisma.habit.findUnique({ where: { id } })
    return habit
}

const createHabit = async (input: CreateHabitInput) => {
    const habit = await prisma.habit.create({
        data: {
            ...input,
            isActive: true,
            created_at: normalizeDate(),
        }
    })
    return habit
}

const updateHabit = async (id: string, input: Partial<CreateHabitInput>) => {
    const habit = await prisma.habit.update({
        where: { id },
        data: input,
    })
    return habit
}

const deleteHabit = async (id: string) => {
    // Las entries se borran automáticamente por onDelete: Cascade
    await prisma.habit.delete({ where: { id } })
}

export { getHabits, getHabitById, createHabit, updateHabit, deleteHabit }