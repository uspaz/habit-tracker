"use server"
import { createHabit, updateHabit, deleteHabit } from "@/lib/services/Habits"
import { habitSchema } from "@/lib/validations/habit"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function saveHabit(formData: {
    title: string;
    activeDays: string[];
    hour: string;
    color: string;
    icon: string;
}) {
    const parsed = habitSchema.safeParse(formData)

    if (!parsed.success) {
        throw new Error(parsed.error.issues[0].message)
    }

    await createHabit(parsed.data)

    revalidatePath("/", "layout")
    redirect("/")
}

export async function updateHabitAction(id: string, formData: {
    title: string;
    activeDays: string[];
    hour: string;
    color: string;
    icon: string;
}) {
    const parsed = habitSchema.safeParse(formData)

    if (!parsed.success) {
        throw new Error(parsed.error.issues[0].message)
    }

    await updateHabit(id, parsed.data)

    revalidatePath("/", "layout")
    redirect("/")
}

export async function deleteHabitAction(id: string) {
    await deleteHabit(id)
    revalidatePath("/", "layout")
}
