import { habitsToday } from "@/lib/services/Today"

export async function GET() {
    try {
        const data = await habitsToday()
        return Response.json(data)
    } catch (error) {
        console.error("Error al obtener hábitos de hoy:", error)
        return Response.json({ error: "Error interno del servidor" }, { status: 500 })
    }
}
