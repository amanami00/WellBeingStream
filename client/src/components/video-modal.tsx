import { X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { getYouTubeEmbedUrl } from "@/lib/youtube";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoId: string;
  title: string;
}

export default function VideoModal({ 
  isOpen, 
  onClose, 
  videoId, 
  title 
}: VideoModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full p-0 bg-netflix-black border-netflix-gray">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute -top-12 right-0 z-10 text-white hover:text-netflix-gray transition-colors"
            aria-label="Close video"
          >
            <X className="h-6 w-6" />
          </button>
          
          <div className="aspect-video bg-netflix-dark rounded-lg overflow-hidden">
            <iframe
              src={getYouTubeEmbedUrl(videoId)}
              title={title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
