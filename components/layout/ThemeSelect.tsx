"use client";

import { useTheme } from "next-themes";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Laptop, Sun, Moon } from "lucide-react";

export default function ThemeSelect() {
    const { theme, setTheme } = useTheme();

    return (
        <Select value={theme} onValueChange={setTheme}>
            <SelectTrigger
                className="text-xs w-28 h-8 ml-6 hidden md:flex"
                size="sm"
            >
                <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="system">
                    <Laptop /> System
                </SelectItem>
                <SelectItem value="light">
                    <Sun /> Light
                </SelectItem>
                <SelectItem value="dark">
                    <Moon /> Dark
                </SelectItem>
            </SelectContent>
        </Select>
    );
}
