import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import Icon from "@/components/ui/icon";

const Settings = () => {
  const [autoConnect, setAutoConnect] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [volume, setVolume] = useState([80]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <div className="w-full max-w-2xl space-y-4 animate-fade-in">
        <h1 className="text-3xl font-semibold mb-6">Настройки</h1>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Video" size={24} className="text-primary" />
              Видео и аудио
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="camera">Камера</Label>
              <Select defaultValue="default">
                <SelectTrigger id="camera" className="bg-background">
                  <SelectValue placeholder="Выберите камеру" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Встроенная камера</SelectItem>
                  <SelectItem value="external">Внешняя камера</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="microphone">Микрофон</Label>
              <Select defaultValue="default">
                <SelectTrigger id="microphone" className="bg-background">
                  <SelectValue placeholder="Выберите микрофон" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Встроенный микрофон</SelectItem>
                  <SelectItem value="external">Внешний микрофон</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="speakers">Динамики</Label>
              <Select defaultValue="default">
                <SelectTrigger id="speakers" className="bg-background">
                  <SelectValue placeholder="Выберите динамики" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Встроенные динамики</SelectItem>
                  <SelectItem value="headphones">Наушники</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label htmlFor="volume">Громкость: {volume[0]}%</Label>
              <Slider
                id="volume"
                value={volume}
                onValueChange={setVolume}
                max={100}
                step={1}
                className="cursor-pointer"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Zap" size={24} className="text-secondary" />
              Качество
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="quality">Качество видео</Label>
              <Select defaultValue="hd">
                <SelectTrigger id="quality" className="bg-background">
                  <SelectValue placeholder="Выберите качество" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sd">SD (360p)</SelectItem>
                  <SelectItem value="hd">HD (720p)</SelectItem>
                  <SelectItem value="fhd">Full HD (1080p)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Bell" size={24} className="text-primary" />
              Уведомления
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="notifications">Уведомления о звонках</Label>
                <p className="text-sm text-muted-foreground">
                  Получать уведомления о входящих звонках
                </p>
              </div>
              <Switch
                id="notifications"
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="autoconnect">Автоподключение</Label>
                <p className="text-sm text-muted-foreground">
                  Автоматически подключаться к комнате
                </p>
              </div>
              <Switch
                id="autoconnect"
                checked={autoConnect}
                onCheckedChange={setAutoConnect}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
