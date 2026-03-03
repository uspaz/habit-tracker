import { getHabits } from "@/lib/services/Habits";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const habits = await getHabits();
        return NextResponse.json(habits);
    } catch (error) {
        console.error("Error al obtener hábitos:", error);
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
    }
}
