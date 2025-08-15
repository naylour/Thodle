import { z } from 'zod/v4';

export const themeModeSchema = z.union([
    z.literal('AUTO'),
    z.literal('DARK'),
    z.literal('LIGHT'),
]);

export type ThemeModeSchema = z.infer<typeof themeModeSchema>;

export const themeColorSchema = z.union([
    z.literal('THODLE'),
    z.literal('AMBER'),
    z.literal('BLUE'),
    z.literal('CYAN'),
    z.literal('EMERALD'),
    z.literal('FUCHSIA'),
    z.literal('GRAY'),
    z.literal('GREEN'),
    z.literal('INDIGO'),
    z.literal('LIME'),
    z.literal('NEUTRAL'),
    z.literal('ORANGE'),
    z.literal('PINK'),
    z.literal('PURPLE'),
    z.literal('RED'),
    z.literal('ROSE'),
    z.literal('SKY'),
    z.literal('SLATE'),
    z.literal('STONE'),
    z.literal('TEAL'),
    z.literal('VIOLET'),
    z.literal('YELLOW'),
    z.literal('ZINC'),
]);

export type ThemeColorSchema = z.infer<typeof themeColorSchema>;

export const settingsSchema = z.object({
    color: themeColorSchema.default('THODLE'),
    id: z.ulid(),

    mode: themeModeSchema.default('AUTO'),

    telegramAccount: z.nullable(z.string()),

    updatedAt: z.date(),
});

export type SettingsSchema = z.infer<typeof settingsSchema>;
