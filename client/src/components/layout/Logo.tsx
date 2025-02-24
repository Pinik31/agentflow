import { Bot } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <Bot className="w-5 h-5 text-primary-foreground" />
        </div>
        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-primary/50 rounded-full animate-pulse" />
      </div>
      <span className="text-2xl font-bold">Agent Flow</span>
    </div>
  );
}
