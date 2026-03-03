import HabitForm from "@/components/habits/HabitForm";
import HabitListSidebar from "@/components/habits/HabitListSidebar";
import { getHabitById } from "@/lib/services/Habits";
import { notFound } from "next/navigation";

export default async function EditHabitPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const habit = await getHabitById(id);

  if (!habit) {
    notFound();
  }

  return (
    <div className="flex max-w-screen justify-center bg-gray-50 dark:bg-gray-900">
       <aside className="w-80 hidden md:block mr-30">
           <HabitListSidebar />
       </aside>
       <div className="flex items-start justify-center pt-12 px-4 md:px-0">
           <div className="w-full max-w-4xl">
                <HabitForm 
                    habitId={habit.id}
                    initialData={{
                        title: habit.title,
                        activeDays: habit.activeDays,
                        hour: habit.hour,
                        color: habit.color,
                        icon: habit.icon,
                    }}
                />
           </div>
       </div>
    </div>
  );
}
