// Validación de datos para la creación de hábitos usando Zod
// Zod valida datos en runtime Y genera tipos TypeScript automáticamente
// Esto asegura que los datos sean válidos tanto en el cliente como en el servidor

import { z } from "zod";

// Schema: define las reglas de validación para cada campo
// safeParse() retorna { success: true, data: ... } o { success: false, error: ... }
export const habitSchema = z.object({
    // Título: requerido, entre 1 y 50 caracteres
    title: z.string()
        .min(1, "El título es requerido")
        .max(50, "Máximo 50 caracteres"),

    // Días activos: al menos 1 día seleccionado
    activeDays: z.array(z.string())
        .min(1, "Seleccioná al menos un día"),

    // Hora: formato HH:MM (24h) — validado con regex
    hour: z.string()
        .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Hora inválida (formato HH:MM)"),

    // Color: debe ser un hex válido con #
    color: z.string()
        .startsWith("#", "El color debe empezar con #")
        .length(7, "El color debe tener formato #RRGGBB"),

    // Icono: solo string no vacío
    icon: z.string()
        .min(1, "Seleccioná un icono"),
});

// Tipo inferido del schema — se puede usar en vez de definir tipos manualmente
// Es equivalente a: { title: string; activeDays: string[]; hour: string; color: string; icon: string }
export type HabitFormData = z.infer<typeof habitSchema>;
