
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Toggle } from '@/components/ui/toggle';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface NightModeToggleProps {
  isDarkMode: boolean;
  onToggle: () => void;
}

const NightModeToggle: React.FC<NightModeToggleProps> = ({ isDarkMode, onToggle }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle 
            pressed={isDarkMode}
            onPressedChange={onToggle}
            className="rounded-full p-2 transition-colors"
            aria-label={isDarkMode ? "تبديل للوضع النهاري" : "تبديل للوضع الليلي"}
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Toggle>
        </TooltipTrigger>
        <TooltipContent>
          <p>{isDarkMode ? "الوضع النهاري" : "الوضع الليلي"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default NightModeToggle;
