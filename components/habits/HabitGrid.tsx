"use client";
// Client Component: maneja interactividad (check, editar, eliminar)
// Incluye StatsOverview para que comparta el mismo estado
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShowHabits } from "@/types/habit";
import { IoCheckmark } from "react-icons/io5";
import { ImFire } from "react-icons/im";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { Icon } from "../ui/Icon";
import { hexToRgba, normalizeColor } from "@/lib/utils/color";
import StatsOverview from "@/components/stats/StatsOverview";
import { deleteHabitAction } from "@/app/habits/actions";

interface HabitGridProps {
  initialHabits: ShowHabits[];
}

const HabitGrid = ({ initialHabits }: HabitGridProps) => {
  const [habits, setHabits] = useState<ShowHabits[]>(initialHabits);
  const [justChecked, setJustChecked] = useState<string | null>(null);
  const router = useRouter();

  async function syncWithServer() {
    try {
      const data = await fetch("./api/today");
      if (data.ok) {
        const res = await data.json();
        setHabits(res);
      }
    } catch (error) {
      console.error("Error al sincronizar:", error);
    }
  }

  async function clickCheck(id: string) {
    const previousHabits = [...habits];

    setHabits(prev => prev.map(habit =>
      habit.id === id ? { ...habit, isCompletedToday: true } : habit
    ));
    setJustChecked(id);
    setTimeout(() => setJustChecked(null), 600);

    try {
      const data = await fetch(`./api/habits/${id}/check`, {
        method: "POST",
        headers: { "Content-Type": "application/json" }
      });
      if (!data.ok) {
        setHabits(previousHabits);
        setJustChecked(null);
        return;
      }
      syncWithServer();
    } catch {
      setHabits(previousHabits);
      setJustChecked(null);
    }
  }

  async function handleDelete(id: string) {
    const previousHabits = [...habits];
    setHabits(prev => prev.filter(h => h.id !== id));

    try {
      await deleteHabitAction(id);
      syncWithServer();
    } catch {
      setHabits(previousHabits);
    }
  }

  return (
    <>
      <StatsOverview habits={habits} />

      <hr className="mt-6 mb-10 md:my-10 border-gray-200 dark:border-gray-700"/>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-4">
        {habits?.map((habit) => (
          <div
            key={habit.id}
            className={`rounded-3xl shadow-md p-5 border transition-all ${
              habit.isActiveToday
                ? 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:shadow-lg'
                : 'bg-gray-200 dark:bg-gray-800/50 border-gray-300 dark:border-gray-700'
            }`}
          >
            {/* Top Section */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3 md:gap-4 flex-1 min-w-0 ">
                <div
                  style={{
                    backgroundColor: hexToRgba(habit.color, habit.isActiveToday ? 0.15 : 0.08)
                  }}
                  className="w-12 h-12 md:w-14 md:h-14 rounded-2xl shrink-0 flex items-center justify-center text-xl md:text-2xl"
                >
                  <Icon icon={habit.icon} color={normalizeColor(habit.color)} />
                </div>
                <div className="flex-1 pt-0.5 min-w-0">
                  <h3 className={`font-bold text-base md:text-lg leading-tight truncate ${
                    habit.isActiveToday ? 'text-gray-900 dark:text-gray-100' : 'text-gray-500 dark:text-gray-400'
                  }`}>{habit.title}</h3>
                  <p className={`text-xs mt-1.5 ${
                    habit.isActiveToday ? 'text-gray-500 dark:text-gray-400' : 'text-gray-400'
                  }`}>{habit.hour}</p>
                </div>
              </div>

              <div className="flex items-center gap-1 md:gap-2 shrink-0 relative">
                <button
                  onClick={() => router.push(`/habits/${habit.id}/edit`)}
                  className="w-8 h-8 absolute -top-14 right-8 rounded-full flex justify-center items-center text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all cursor-pointer"
                  title="Editar"
                >
                  <FiEdit2 className="text-sm" />
                </button>
                <button
                  onClick={() => handleDelete(habit.id)}
                  className="w-8 h-8 absolute -top-14 right-0 rounded-full flex justify-center items-center text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 transition-all cursor-pointer"
                  title="Eliminar"
                >
                  <FiTrash2 className="text-sm" />
                </button>
              <button
                className={`w-10 h-10  md:w-11 md:h-11 rounded-full flex justify-center items-center shrink-0 transition-all font-semibold ${
                  habit.isActiveToday
                    ? habit.isCompletedToday
                      ? `bg-green-500 text-white shadow-lg cursor-default`
                      : `border-2 border-gray-300 dark:border-gray-600 text-gray-400 hover:border-green-500 hover:text-green-500 cursor-pointer`
                    : 'border-2 border-gray-300 dark:border-gray-600 text-gray-300 dark:text-gray-600 cursor-not-allowed'
                } ${justChecked === habit.id ? 'animate-check-bounce' : ''}`}
                onClick={() => habit.isActiveToday && !habit.isCompletedToday && clickCheck(habit.id)}
                disabled={!habit.isActiveToday || habit.isCompletedToday}
              >
                {habit.isCompletedToday ? <IoCheckmark className="text-xl" /> : null}
              </button>
            </div>
            </div>

            {/* Divider */}
            <div className={`h-px my-3 ${
              habit.isActiveToday ? 'bg-gray-100 dark:bg-gray-700' : 'bg-gray-200 dark:bg-gray-700'
            }`}></div>

            {/* Bottom Section */}
            <div className="flex items-center justify-between">
              <div>
                <h4 className={`uppercase font-bold text-xs tracking-wider ${
                  habit.isActiveToday ? 'text-gray-400' : 'text-gray-300 dark:text-gray-500'
                }`}>frecuencia</h4>
                <p className={`text-sm font-semibold ${
                  habit.isActiveToday ? 'text-gray-900 dark:text-gray-100' : 'text-gray-500 dark:text-gray-400'
                }`}>{habit.frequency}</p>
              </div>
              <div
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  habit.isActiveToday
                    ? habit.streak > 0
                      ? `bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800`
                      : `bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600`
                    : `bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600`
                }`}
              >
                <ImFire
                  className={`text-sm ${
                    habit.isActiveToday
                      ? habit.streak > 0 ? `text-orange-500` : `text-gray-400`
                      : `text-gray-400`
                  }`}
                />
                <p className={`text-xs font-bold ${
                  habit.isActiveToday ? 'text-gray-900 dark:text-gray-100' : 'text-gray-500 dark:text-gray-400'
                }`}>{habit.streak} días</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default HabitGrid;
