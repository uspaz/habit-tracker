// Funciones utilitarias de fecha — todas en UTC
// Solo funciones puras — sin acceso a DB ni lógica de negocio

/*
    Retorna el día de la semana actual en UTC (0 = Domingo, 1 = Lunes, etc.)
*/
export const getHabitDay = () => {
    const date = new Date()
    return date.getUTCDay()
}

/*
    Normaliza la fecha actual a medianoche UTC (00:00:00.000Z)
    Se usa para comparar entries por día sin importar la hora
*/
export function normalizeDate() {
    const now = new Date()
    const date = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0, 0))
    return date
}

/*
    Genera una clave de fecha única en formato "YYYY-M-D" (UTC)
    Se usa para comparar si dos timestamps pertenecen al mismo día
*/
export function dayKey(time: number) {
    const d = new Date(time)
    return `${d.getUTCFullYear()}-${d.getUTCMonth()}-${d.getUTCDate()}`
}
