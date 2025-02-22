import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const GlassCard = ({ children, className }: Props) => {
  return (
    <Card
      className={cn(
        className,
        "bg-themeGray border-themeGray backdrop--blur__safari backdrop-blur-4xl rounded-2xl bg-opacity-40 bg-clip-padding backdrop-filter",
      )}
    >
      {children}
    </Card>
  );
};

export default GlassCard;
