import { getHabits } from "@/lib/services/Habits";
import { Icon } from "@/components/ui/Icon";
import { hexToRgba, normalizeColor } from "@/lib/utils/color";

const HabitListSidebar = async () => {
  const habits = await getHabits();

  return (
    <div className="w-full h-full ">
      <h2 className="text-xl font-bold text-[#1E2B37] dark:text-gray-100 mb-6">Tus Hábitos</h2>
      <div className="space-y-4">
        {habits.map((habit) => (
          <div key={habit.id} className="flex items-center gap-3 bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center text-xl text-white"
              style={{ backgroundColor: hexToRgba(habit.color, 0.15 )}} 
            >
             <Icon icon={habit.icon} color={normalizeColor(habit.color)} size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-200">{habit.title}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">{habit.hour}</p>
            </div>
          </div>
        ))}
        {habits.length === 0 && (
            <p className="text-gray-400 text-sm">No tienes hábitos aún.</p>
        )}
      </div>
    </div>
  );
};

export default HabitListSidebar;

