import { useState } from "react";
import VideoRoom from "@/components/VideoRoom";
import UserProfile from "@/components/UserProfile";
import Settings from "@/components/Settings";
import Icon from "@/components/ui/icon";

const Index = () => {
  const [activeView, setActiveView] = useState<"room" | "profile" | "settings">("room");

  return (
    <div className="min-h-screen bg-background text-foreground">
      {activeView === "room" && <VideoRoom />}
      {activeView === "profile" && <UserProfile />}
      {activeView === "settings" && <Settings />}

      <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-card/95 backdrop-blur-lg rounded-2xl px-6 py-3 shadow-2xl border border-border animate-fade-in">
        <div className="flex items-center gap-6">
          <button
            onClick={() => setActiveView("profile")}
            className={`flex flex-col items-center gap-1 transition-all duration-200 ${
              activeView === "profile"
                ? "text-primary scale-110"
                : "text-muted-foreground hover:text-foreground hover:scale-105"
            }`}
          >
            <Icon name="User" size={24} />
            <span className="text-xs font-medium">Профиль</span>
          </button>

          <button
            onClick={() => setActiveView("room")}
            className={`flex flex-col items-center gap-1 transition-all duration-200 ${
              activeView === "room"
                ? "text-primary scale-110"
                : "text-muted-foreground hover:text-foreground hover:scale-105"
            }`}
          >
            <Icon name="Video" size={24} />
            <span className="text-xs font-medium">Комната</span>
          </button>

          <button
            onClick={() => setActiveView("settings")}
            className={`flex flex-col items-center gap-1 transition-all duration-200 ${
              activeView === "settings"
                ? "text-primary scale-110"
                : "text-muted-foreground hover:text-foreground hover:scale-105"
            }`}
          >
            <Icon name="Settings" size={24} />
            <span className="text-xs font-medium">Настройки</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Index;
