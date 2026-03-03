"use client"
import { useState } from "react"
import Link from "next/link"
import { HiX } from "react-icons/hi"
import { saveHabit, updateHabitAction } from "@/app/habits/actions"
import { HABIT_ICONS } from "@/lib/constants/icons"
import { HABIT_COLORS } from "@/lib/constants/colors"

const DAYS = [
    { label: "L", value: "1" },
    { label: "M", value: "2" },
    { label: "M", value: "3" },
    { label: "J", value: "4" },
    { label: "V", value: "5" },
    { label: "S", value: "6" },
    { label: "D", value: "0" },
]

// Props opcionales para modo edición
interface HabitFormProps {
    habitId?: string;
    initialData?: {
        title: string;
        activeDays: string[];
        hour: string;
        color: string;
        icon: string;
    };
}

const HabitForm = ({ habitId, initialData }: HabitFormProps) => {
    const isEditing = !!habitId && !!initialData;

    // Si hay initialData, pre-llenar; si no, valores por defecto
    const [title, setTitle] = useState(initialData?.title ?? "")
    const [activeDays, setActiveDays] = useState<string[]>(initialData?.activeDays ?? [])
    const [hour, setHour] = useState(initialData?.hour ?? "09:00")
    const [color, setColor] = useState(initialData?.color ?? HABIT_COLORS[0])
    const [selectedIcon, setSelectedIcon] = useState<string>(initialData?.icon ?? HABIT_ICONS[0].id)
    const [loading, setLoading] = useState(false)

    const toggleDay = (day: string) => {
        if (activeDays.includes(day)) {
            setActiveDays(activeDays.filter(d => d !== day))
        } else {
            setActiveDays([...activeDays, day])
        }
    }

    const toggleAllDays = () => {
        if (activeDays.length === 7) {
            setActiveDays([])
        } else {
            setActiveDays(DAYS.map(d => d.value))
        }
    }

    const handleSubmit = async () => {
        setLoading(true)
        try {
            const formData = { title, activeDays, hour, color, icon: selectedIcon }

            if (isEditing) {
                await updateHabitAction(habitId, formData)
            } else {
                await saveHabit(formData)
            }
        } catch (error: any) {
            if (error?.digest?.startsWith("NEXT_REDIRECT")) {
                throw error
            }
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 md:p-8 shadow-sm relative h-full">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#1E2B37] dark:text-gray-100">
                    {isEditing ? "Editar hábito" : "Diseña tu nuevo hábito"}
                </h2>
                <Link href="/" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
                    <HiX className="text-gray-400 text-xl" />
                </Link>
            </div>

            <div className="space-y-8">
                {/* Title Input */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 tracking-wider">¿QUÉ QUIERES LOGRAR?</label>
                    <input 
                        type="text" 
                        placeholder="Ej. Caminar por la mañana"
                        className="w-full bg-gray-50 dark:bg-gray-700 border-none rounded-xl p-4 text-gray-700 dark:text-gray-200 placeholder-gray-300 dark:placeholder-gray-500 focus:ring-2 focus:ring-[#6FE79F] outline-none transition-all"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                {/* Days & Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Days */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                             <label className="text-xs font-bold text-gray-400 tracking-wider">DÍAS ACTIVOS</label>
                             <button 
                                onClick={toggleAllDays}
                                className="text-[10px] font-bold text-[#6FE79F] tracking-wider hover:text-[#5BD68E] cursor-pointer"
                             >
                                TODOS LOS DÍAS
                             </button>
                        </div>
                        <div className="flex justify-between gap-1 bg-gray-50 dark:bg-gray-700 p-1 rounded-xl">
                            {DAYS.map((day) => {
                                const isActive = activeDays.includes(day.value)
                                return (
                                    <button
                                        key={day.value}
                                        onClick={() => toggleDay(day.value)}
                                        className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all cursor-pointer text-gray-400
                                            ${isActive ? 'bg-white dark:bg-gray-600 shadow-md text-gray-800 dark:text-gray-100' : 'hover:bg-gray-200 dark:hover:bg-gray-600'}
                                        `}
                                    >
                                        {day.label}
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    {/* Time */}
                    <div className="space-y-4">
                        <label className="text-xs font-bold text-gray-400 tracking-wider">HORA DEL HÁBITO</label>
                        <div className="relative">
                            <input
                                type="time"
                                value={hour}
                                onChange={(e) => setHour(e.target.value)}
                                className="w-full bg-gray-50 dark:bg-gray-700 border-none rounded-xl p-4 text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-[#6FE79F] outline-none transition-all"
                            />
                        </div>
                    </div>
                </div>

                {/* Color & Icon */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     {/* Color */}
                     <div className="space-y-4">
                        <label className="text-xs font-bold text-gray-400 tracking-wider">SELECCIÓN DE COLOR</label>
                        <div className="flex gap-3 flex-wrap">
                            {HABIT_COLORS.map((c) => (
                                <button
                                    key={c}
                                    onClick={() => setColor(c)}
                                    className={`w-10 h-10 rounded-full transition-all flex items-center justify-center cursor-pointer
                                        ${color === c ? 'ring-2 ring-offset-2 ring-gray-200 dark:ring-gray-600' : 'hover:scale-110'}
                                    `}
                                    style={{ backgroundColor: c }}
                                >
                                </button>
                            ))}
                        </div>
                     </div>

                     {/* Icon */}
                     <div className="space-y-4">
                        <label className="text-xs font-bold text-gray-400 tracking-wider">ELEGIR ICONO</label>
                         <div className="grid grid-cols-5 gap-2 bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
                            {HABIT_ICONS.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setSelectedIcon(item.id)}
                                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400 transition-all cursor-pointer
                                        ${selectedIcon === item.id ? 'bg-white dark:bg-gray-600 text-[#6FE79F] shadow-sm' : 'hover:bg-gray-200 dark:hover:bg-gray-600'}
                                    `}
                                >
                                    <item.component />
                                </button>
                            ))}
                         </div>
                     </div>
                </div>
            </div>

            {/* Footer Actions */}
            <div className="mt-12 flex justify-between items-center">
                <Link href="/" className="font-bold text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors ml-2">
                    Cancelar
                </Link>
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-4/5 py-3 bg-[#6FE79F] text-[#1E2B37] rounded-xl font-bold hover:bg-[#5BD68E] transition-colors disabled:opacity-50 cursor-pointer"
                >
                    {loading 
                        ? (isEditing ? "Actualizando..." : "Guardando...") 
                        : (isEditing ? "Actualizar Hábito" : "Guardar Hábito")
                    }
                </button>
            </div>

        </div>
    )
}

export default HabitForm

