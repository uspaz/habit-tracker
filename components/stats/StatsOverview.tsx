import { ShowHabits } from "@/types/habit";
import { FaCheck } from "react-icons/fa6";
import { ImFire } from "react-icons/im";

interface StatsOverviewProps {
  habits: ShowHabits[];
}

const StatsOverview = ({ habits }: StatsOverviewProps) => {
  const completedCount = habits.filter(h => h.isCompletedToday).length;
  const dailyActive = habits.filter(h => h.isActiveToday).length;
  const dailyProgress = dailyActive > 0 ? Math.round((completedCount / dailyActive) * 100) : 0 ;
  const maxStreak = habits.length > 0 ? Math.max(...habits.map(h => h.streak)) : 0;
  const remainingCount = dailyActive - completedCount;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {/* Progreso Diario */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400">Progreso Diario</h3>
          {dailyProgress > 0 && (
            <span className="text-xs text-green-600 bg-green-300/50 dark:bg-green-900/30 px-2 py-1 rounded-lg font-semibold">+{dailyProgress}%</span>
          )}
        </div>
        <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">{dailyProgress}%</p>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all"
            style={{ width: `${dailyProgress}%` }}
          ></div>
        </div>
      </div>

      {/* Completados */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center text-white text-sm">
            <FaCheck className="text-lg text-white" />
          </div>
          <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400">Completados</h3>
        </div>
        <div className="ml-2 grid grid-cols-[30px_1fr] items-center">
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">{completedCount}</p>
          { dailyActive > 0 ? 
          (
            <>
              <p className="text-xs text-gray-500 dark:text-gray-400">de {dailyActive} hábitos</p>
              { remainingCount > 0 && 
                <p className="text-xs text-gray-400 mt-1 col-span-2">¡Falta {remainingCount} {remainingCount === 1 ? 'hábito' : 'hábitos'} por completar!</p>
              }
            </>
          )
          :
          <p className="text-xs text-gray-400 mt-1 col-span-2">No hay hábitos por completar hoy</p>
        }
        {remainingCount === 0 && dailyActive > 0 && (
          <p className="text-xs text-green-500 font-semibold col-span-2 mt-1">¡Todos completados!</p>
        )}
        </div>
      </div>

      {/* Racha Actual */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-200 dark:bg-orange-900/40 rounded-full flex items-center justify-center text-white text-sm">
              <ImFire className="text-md text-orange-500" />
            </div>
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400">Racha Actual</h3>
          </div>
          <span className="text-xs text-orange-600 bg-orange-100 dark:bg-orange-900/30 px-2 py-1 rounded-lg font-semibold">
            Record: {maxStreak}
          </span>
        </div>
        <div className="ml-2">
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            {maxStreak} <span className="text-sm font-medium text-gray-500 dark:text-gray-400">días</span>
          </p>
          {maxStreak > 0 ? (
            <p className="text-xs text-orange-500 font-semibold">¡Sigue así, no rompas la cadena!</p>
          ) : (
            <p className="text-xs text-gray-400">¡Completa un hábito para iniciar tu racha!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatsOverview;

