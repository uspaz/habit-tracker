import { redirect } from "next/navigation";

// Esta ruta redirige a la página de edición del hábito
export default async function HabitPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  redirect(`/habits/${id}/edit`);
}
