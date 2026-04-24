import { getEntriesByDate, getManyEntries } from "@/lib/services/Entries"
import { dayKey, getHabitDay } from "@/lib/services/Date"
import { getHabits } from "@/lib/services/Habits"
import { Habit } from "@/types/habit"


// Máximo de días hacia atrás para calcular la racha
const MAX_LOOKBACK_DAYS = 365;

// Calcula la racha consecutiva de un hábito
// Recibe un Set de fechas (strings "YYYY-M-D") para búsquedas instantáneas O(1)
// en vez de recorrer un array completo en cada iteración
const calcStreak = (habit: Habit, entryDates: Set<string>) => {
    // Si no tiene días activos, la racha es 0
    if (habit.activeDays.length === 0) return 0;

    let streak = 0;
    let streakStarted = false;
    const now = new Date()
    const time = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
    const limit = time - MAX_LOOKBACK_DAYS * 86400000;

    for (let i = time; i > limit; i -= 86400000) {

        if (habit.activeDays.includes(`${new Date(i).getUTCDay()}`)) {

            // Lookup O(1) en el Set — antes era O(n) con array.some()
            if (entryDates.has(dayKey(i))) {
                streak++
                streakStarted = true
            } else {
                if (streakStarted) return streak
                if (i === time) continue
                return 0
            }
        }

    }

    return streak
}

const todayData = async () => {
    const day = getHabitDay()
    const habits = await getHabits()
    const entriesToday = await getEntriesByDate()
    const entries = await getManyEntries()

    return { day, habits, entriesToday, entries }
}


export const habitsToday = async () => {

    const { habits, entriesToday, entries, day } = await todayData()

    // Construimos un Map donde:
    //   clave = habitId (string)
    //   valor = Set de fechas en formato "YYYY-M-D" donde ese hábito tiene entries
    // Esto permite que calcStreak haga búsquedas O(1) por fecha
    // en vez de recorrer todo el array de entries en cada iteración
    const entriesByHabit = new Map<string, Set<string>>()
    for (const entry of entries) {
        const key = entry.habitId
        if (!entriesByHabit.has(key)) {
            entriesByHabit.set(key, new Set())
        }
        entriesByHabit.get(key)!.add(dayKey(entry.date.getTime()))
    }

    return habits.map(habit => {
        const isActiveToday = habit.activeDays.includes(day.toString())
        const isCompletedToday = entriesToday.some(e => e.habitId === habit.id)

        // Obtenemos el Set de fechas de este hábito (o un Set vacío si no tiene entries)
        const habitEntryDates = entriesByHabit.get(habit.id) ?? new Set<string>()
        const streak = calcStreak(habit, habitEntryDates)

        const frequency = habit.activeDays.length > 5 ? "Diario" : habit.activeDays.length >= 3 && habit.activeDays.length <= 5 ? "Semanal" : "Día unico"

        return {
            id: habit.id,
            title: habit.title,
            isActiveToday,
            isCompletedToday,
            color: habit.color,
            streak,
            frequency,
            icon: habit.icon,
            hour: habit.hour
        }
    })
}
