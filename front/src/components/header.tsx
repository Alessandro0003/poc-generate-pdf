import { ThemeToggle } from "./theme/theme-toggle";

export const Header = () => {
  return (
    <div className="flex ml-auto h-16 items-center gap-6 px-6">
        <ThemeToggle />
    </div>
  );
};
