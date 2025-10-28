import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState("Пользователь");
  const [userStatus, setUserStatus] = useState("Доступен для звонков");
  const { toast } = useToast();

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Сохранено",
      description: "Профиль успешно обновлён",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <Card className="w-full max-w-md bg-card border-border animate-fade-in">
        <CardHeader className="space-y-6 pt-8">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <Avatar className="w-32 h-32 border-4 border-primary/20">
                <AvatarImage src="" />
                <AvatarFallback className="text-4xl bg-primary/10 text-primary">
                  {userName.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <button className="absolute bottom-0 right-0 w-10 h-10 bg-primary hover:bg-primary/90 rounded-full flex items-center justify-center text-white shadow-lg transition-all hover:scale-110">
                <Icon name="Camera" size={20} />
              </button>
            </div>

            {!isEditing && (
              <div className="text-center">
                <h2 className="text-2xl font-semibold mb-1">{userName}</h2>
                <p className="text-muted-foreground">{userStatus}</p>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-6 pb-8">
          {isEditing ? (
            <div className="space-y-4 animate-fade-in">
              <div className="space-y-2">
                <Label htmlFor="name">Имя</Label>
                <Input
                  id="name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="bg-background"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Статус</Label>
                <Input
                  id="status"
                  value={userStatus}
                  onChange={(e) => setUserStatus(e.target.value)}
                  className="bg-background"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  onClick={handleSave}
                  className="flex-1 bg-primary hover:bg-primary/90"
                >
                  <Icon name="Check" size={20} className="mr-2" />
                  Сохранить
                </Button>
                <Button
                  onClick={() => setIsEditing(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Отмена
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <Button
                onClick={() => setIsEditing(true)}
                variant="outline"
                className="w-full justify-start"
              >
                <Icon name="Edit" size={20} className="mr-3 text-primary" />
                Редактировать профиль
              </Button>

              <div className="grid grid-cols-2 gap-3 pt-3">
                <Card className="bg-muted/50 border-none">
                  <CardContent className="pt-6 text-center">
                    <div className="text-3xl font-bold text-primary mb-1">12</div>
                    <div className="text-sm text-muted-foreground">Звонков</div>
                  </CardContent>
                </Card>
                <Card className="bg-muted/50 border-none">
                  <CardContent className="pt-6 text-center">
                    <div className="text-3xl font-bold text-secondary mb-1">5ч</div>
                    <div className="text-sm text-muted-foreground">Время</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
