import HabitForm from "@/components/habits/HabitForm";
import HabitListSidebar from "@/components/habits/HabitListSidebar";

export default function NewHabitPage() {
  return (
    <div className="flex max-w-screen justify-center bg-gray-50 dark:bg-gray-900 md:px-6"> 
       <aside className="w-80 hidden lg:block mr-30">
           <HabitListSidebar />
       </aside>
       <div className="flex items-start justify-center pt-12 px-4 md:px-0">
           <div className="w-full max-w-4xl">
                <HabitForm />
           </div>
       </div>
    </div>
  );
}