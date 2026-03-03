import { createHabit, getHabits } from "@/lib/services/Habits"


export async function GET() {
    try {
        const data = await getHabits()
        return Response.json(data)
    } catch (error) {
        console.error("Error al obtener hábitos:", error)
        return Response.json({ error: "Error interno del servidor" }, { status: 500 })
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const data = await createHabit(body)
        return Response.json(data, { status: 201 })
    } catch (error) {
        console.error("Error al crear hábito:", error)
        return Response.json({ error: "Error al crear el hábito" }, { status: 500 })
    }
}
