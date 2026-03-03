
// Domain Models
export type Habit = {
    id: string;
    title: string;
    color: string;
    isActive: boolean;
    activeDays: string[];
    created_at: Date;
    icon: string;
    hour: string;
}

export type Entry = {
    id: string;
    habitId: string;
    date: Date;
}[]

// View Models (Data Transfer Objects)
export type ShowHabits = {
    id: string;
    title: string;
    isActiveToday: boolean;
    isCompletedToday: boolean;
    color: string;
    streak: number;
    frequency: string;
    icon: string;
    hour: string;
}

// Interfaces for Abstraction (Dependency Inversion)
export interface IHabitDisplay {
    id: string;
    title: string;
    icon: string;
    hour: string;
    color: string;
    isActive: boolean;
}

export interface IHabitStatus {
    isCompletedToday: boolean;
    isActiveToday: boolean;
    streak: number;
}

export interface IHabitFrequency {
    frequency: string;
}

export interface IHabitAction {
    onCheck: (habitId: string) => void;
}

// Enums for type safety
export enum HabitFrequencyType {
    DAILY = "Diario",
    WEEKLY = "Semanal",
    UNIQUE_DAY = "Día único"
}