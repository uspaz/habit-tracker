import { ICON_MAP } from "@/lib/constants/icons";
import { IoIosHelp } from "react-icons/io";

type HabitProps = {
  icon: string;
  color?: string;
  size?: number;
};

export function Icon({ icon, color, size = 28 }: HabitProps) {
  const IconComponent = ICON_MAP[icon] ?? IoIosHelp;

  return (
      <IconComponent size={size} color={color} />
  );
}