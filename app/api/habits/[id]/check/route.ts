import { uniqueCheck } from "@/lib/services/Unique"

export async function POST(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const data = await uniqueCheck(id)
        return Response.json(data)
    } catch (error) {
        if (error instanceof Error) {
            if (error.message === "El habito no ha sido encontrado") {
                return Response.json({ error: error.message }, { status: 404 })
            }
            if (error.message === "Hoy no se puede completar") {
                return Response.json({ error: error.message }, { status: 400 })
            }
        }
        console.error("Error en check:", error)
        return Response.json({ error: "Error interno del servidor" }, { status: 500 })
    }
}