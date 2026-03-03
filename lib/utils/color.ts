// Funciones utilitarias para manejo de colores
// Separadas de los componentes para poder reutilizarlas en cualquier parte

/*
    Asegura que el color siempre tenga el prefijo #
    Necesario porque hábitos viejos pueden tener el color sin #
*/
export const normalizeColor = (color: string): string => {
    return color.startsWith('#') ? color : `#${color}`;
}

/*
    Convierte un color hex a rgba con opacidad
    @param hex - Color en formato "#RRGGBB" o "RRGGBB"
    @param alpha - Opacidad de 0 a 1
*/
export const hexToRgba = (hex: string, alpha: number): string => {
    const h = hex.replace('#', '');
    const r = parseInt(h.substring(0, 2), 16);
    const g = parseInt(h.substring(2, 4), 16);
    const b = parseInt(h.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
