// Funciones utilitarias de fecha
// Solo funciones puras — sin acceso a DB ni lógica de negocio

/*
    Retorna el día de la semana actual (0 = Domingo, 1 = Lunes, etc.)
*/
export const getHabitDay = () => {
    const date = new Date()
    return date.getDay()
}

/*
    Normaliza la fecha actual a medianoche (00:00:00.000)
    Se usa para comparar entries por día sin importar la hora
*/
export function normalizeDate() {
    const params = {
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
        day: new Date().getDate()
    }

    const date = new Date(params.year, params.month, params.day, 0, 0, 0, 0)

    return date
}

/*
    Genera una clave de fecha única en formato "YYYY-M-D"
    Se usa para comparar si dos timestamps pertenecen al mismo día
*/
export function dayKey(time: number) {
    const params = {
        year: new Date(time).getFullYear(),
        month: new Date(time).getMonth(),
        day: new Date(time).getDate()
    }

    const date = `${params.year}-${params.month}-${params.day}`

    return date
}
