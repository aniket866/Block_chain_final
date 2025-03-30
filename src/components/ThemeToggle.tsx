
import React from 'react';
import { useTheme } from '@/hooks/use-theme';
import { Moon, Sun } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    toast({
      title: `${newTheme === 'dark' ? 'Dark' : 'Light'} theme activated`,
      description: `Switched to ${newTheme} mode`,
    });
  };
  
  return (
    <div className="flex items-center space-x-2">
      <Sun className="h-4 w-4 text-muted-foreground" />
      <Switch 
        checked={theme === 'dark'}
        onCheckedChange={toggleTheme}
        className="data-[state=checked]:bg-accent"
      />
      <Moon className="h-4 w-4 text-muted-foreground" />
    </div>
  );
};

export default ThemeToggle;
