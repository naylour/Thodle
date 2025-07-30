import clsx, { type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const oklchToRgb = (oklch_input: string) => {
    const oklch = oklch_input.slice(6, oklch_input.length - 1).split(' ').map(str => Number(str));
   const [L, a, b] = oklch; // Декомпозируем OKLCH: L, a, b

    const Y = L / 100;  // Нормализуем L от 0 до 1
    const alpha = a / 255; // Приводим a к диапазону от 0 до 1
    const beta = b / 255;  // Приводим b к диапазону от 0 до 1

    // Преобразуем Oklab в RGB
    const X = Y + (alpha - 0.5) * (0.5 + Y);
    const Z = Y + (beta - 0.5) * (0.5 + Y);

    const r = X * 3.2406 + Y * -1.5372 + Z * -0.4986;
    const g = X * -0.9689 + Y * 1.8758 + Z * 0.0415;
    const bColor = X * 0.0557 + Y * -0.2040 + Z * 1.0570;

    // Нормируем значения RGB и преобразуем в диапазон от 0 до 255
    const rgb = [
        Math.round(Math.min(Math.max(r * 255, 0), 255)),
        Math.round(Math.min(Math.max(g * 255, 0), 255)),
        Math.round(Math.min(Math.max(bColor * 255, 0), 255)),
    ];

    return rgb;
}

export const rgbToHex = (rgb: number[]) => {
    return `#${((1 << 24) + (rgb[0] << 16) + (rgb[1] << 8) + rgb[2])
        .toString(16)
        .slice(1)
        .toUpperCase()}`;
}

export const oklchToHex = (oklch: string) => {
    const rgb = oklchToRgb(oklch);

    return rgbToHex(rgb);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, "child"> : T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any } ? Omit<T, "children"> : T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & { ref?: U | null };
