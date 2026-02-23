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

export default function MobileThemeSelect() {
    const { theme, setTheme } = useTheme();

    return (
        <Select value={theme} onValueChange={setTheme}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Select theme" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="system">
                    <div className="flex items-center gap-2">
                        <Laptop className="h-4 w-4" />
                        System
                    </div>
                </SelectItem>
                <SelectItem value="light">
                    <div className="flex items-center gap-2">
                        <Sun className="h-4 w-4" />
                        Light
                    </div>
                </SelectItem>
                <SelectItem value="dark">
                    <div className="flex items-center gap-2">
                        <Moon className="h-4 w-4" />
                        Dark
                    </div>
                </SelectItem>
            </SelectContent>
        </Select>
    );
}
