// Fuente única de verdad para los iconos de hábitos
// Tanto el formulario (HabitForm) como el display (Icon) importan desde acá
// Si agregás un icono acá, automáticamente aparece en ambos lugares

import { FaTint, FaDumbbell, FaUtensils, FaMoon, FaLeaf, FaBriefcase, FaRunning, FaMoneyBillWave, FaPalette, FaCode } from "react-icons/fa";

// Array principal: define todos los iconos disponibles
// - id: clave que se guarda en la DB
// - label: nombre legible (para accesibilidad)
// - component: el componente de React del icono
export const HABIT_ICONS = [
    { id: "water", label: "Agua", component: FaTint },
    { id: "dumbbell", label: "Ejercicio", component: FaDumbbell },
    { id: "food", label: "Comida", component: FaUtensils },
    { id: "moon", label: "Descanso", component: FaMoon },
    { id: "leaf", label: "Naturaleza", component: FaLeaf },
    { id: "briefcase", label: "Trabajo", component: FaBriefcase },
    { id: "study", label: "Estudio", component: FaCode },
    { id: "run", label: "Correr", component: FaRunning },
    { id: "money", label: "Finanzas", component: FaMoneyBillWave },
    { id: "art", label: "Arte", component: FaPalette },
] as const;

// Tipo derivado: solo los IDs válidos de iconos
export type HabitIconId = typeof HABIT_ICONS[number]["id"];

// Mapa derivado del array principal para lookups rápidos por ID
// Se usa en el componente Icon para resolver el icono a renderizar
export const ICON_MAP = Object.fromEntries(
    HABIT_ICONS.map(icon => [icon.id, icon.component])
) as Record<string, React.ElementType>;
