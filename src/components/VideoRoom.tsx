import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";

const VideoRoom = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [roomId, setRoomId] = useState("");
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const id = Math.random().toString(36).substring(7);
    setRoomId(id);
  }, []);

  const startLocalVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
    } catch (error) {
      toast({
        title: "Ошибка доступа",
        description: "Не удалось получить доступ к камере и микрофону",
        variant: "destructive",
      });
    }
  };

  const handleConnect = () => {
    if (!isConnected) {
      startLocalVideo();
      setIsConnected(true);
      toast({
        title: "Подключено",
        description: "Ожидание второго участника...",
      });
    } else {
      if (localVideoRef.current?.srcObject) {
        const stream = localVideoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
      setIsConnected(false);
    }
  };

  const toggleMute = () => {
    if (localVideoRef.current?.srcObject) {
      const stream = localVideoRef.current.srcObject as MediaStream;
      stream.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsMuted(!isMuted);
    }
  };

  const toggleVideo = () => {
    if (localVideoRef.current?.srcObject) {
      const stream = localVideoRef.current.srcObject as MediaStream;
      stream.getVideoTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsVideoOff(!isVideoOff);
    }
  };

  const copyRoomId = () => {
    navigator.clipboard.writeText(roomId);
    toast({
      title: "Скопировано",
      description: "ID комнаты скопирован в буфер обмена",
    });
  };

  const shareRoom = async () => {
    const shareData = {
      title: "Присоединяйтесь к видеозвонку",
      text: `Присоединяйтесь к видеозвонку! ID комнаты: ${roomId}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        copyRoomId();
      }
    } else {
      copyRoomId();
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      <div className="flex-1 relative">
        <video
          ref={remoteVideoRef}
          autoPlay
          playsInline
          className="w-full h-full object-cover bg-muted"
        />

        {!isConnected && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted/50 backdrop-blur-sm">
            <div className="text-center animate-fade-in">
              <Icon name="Video" size={64} className="mx-auto mb-4 text-primary" />
              <h2 className="text-2xl font-semibold mb-2">Видеокомната</h2>
              <p className="text-muted-foreground mb-6">
                Нажмите подключиться для начала звонка
              </p>
              <Button
                onClick={handleConnect}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white"
              >
                <Icon name="VideoIcon" size={20} className="mr-2" />
                Подключиться
              </Button>
            </div>
          </div>
        )}

        <div className="absolute top-6 left-6 right-6 flex justify-between items-start animate-fade-in">
          <div className="bg-card/95 backdrop-blur-lg rounded-xl px-4 py-2 border border-border">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-glow" />
              <span className="text-sm font-medium">ID: {roomId}</span>
              <button
                onClick={copyRoomId}
                className="ml-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Icon name="Copy" size={16} />
              </button>
            </div>
          </div>
          <Button
            onClick={shareRoom}
            size="sm"
            className="bg-primary/95 hover:bg-primary backdrop-blur-lg"
          >
            <Icon name="Share2" size={16} className="mr-2" />
            Поделиться
          </Button>
        </div>

        {isConnected && (
          <div className="absolute bottom-36 right-6 w-48 h-36 rounded-2xl overflow-hidden border-2 border-primary shadow-2xl animate-scale-in">
            <video
              ref={localVideoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover bg-card"
            />
            {isVideoOff && (
              <div className="absolute inset-0 flex items-center justify-center bg-card">
                <Icon name="VideoOff" size={32} className="text-muted-foreground" />
              </div>
            )}
          </div>
        )}
      </div>

      {isConnected && (
        <div className="p-6 pb-28 bg-card/50 backdrop-blur-lg border-t border-border">
          <div className="flex items-center justify-center gap-4 animate-fade-in">
            <Button
              onClick={toggleMute}
              size="lg"
              variant={isMuted ? "destructive" : "secondary"}
              className="rounded-full w-14 h-14 p-0"
            >
              <Icon name={isMuted ? "MicOff" : "Mic"} size={24} />
            </Button>

            <Button
              onClick={toggleVideo}
              size="lg"
              variant={isVideoOff ? "destructive" : "secondary"}
              className="rounded-full w-14 h-14 p-0"
            >
              <Icon name={isVideoOff ? "VideoOff" : "Video"} size={24} />
            </Button>

            <Button
              onClick={handleConnect}
              size="lg"
              variant="destructive"
              className="rounded-full w-14 h-14 p-0"
            >
              <Icon name="PhoneOff" size={24} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoRoom;