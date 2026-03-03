// Server Component: los datos se obtienen directamente en el servidor
// No necesita "use client", useState, useEffect ni fetch
// El HTML llega al browser con los datos ya cargados (sin "Cargando...")
import Link from "next/link";
import HabitGrid from "@/components/habits/HabitGrid";
import { habitsToday } from "@/lib/services/Today";

export default async function Home() {
  // Se ejecuta en el servidor — acceso directo a la DB, sin API intermedia
  const habits = await habitsToday();

  return (
    <main className="">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-6 md:py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">Aquí tienes tu resumen de hoy.</h1>
          <Link href="/habits/new" className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-4 md:px-6 py-2.5 md:py-3 rounded-full font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors flex items-center gap-2 text-sm md:text-base shrink-0">
            <span>+</span>
            Nuevo Hábito
          </Link>
        </div>

        {/* HabitGrid incluye StatsOverview + tarjetas — comparten el mismo estado
            para que las estadísticas se actualicen al hacer check */}
        <HabitGrid initialHabits={habits} />
      </div>
    </main>
  );
}
