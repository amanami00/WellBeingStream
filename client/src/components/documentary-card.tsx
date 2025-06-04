import { Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";
import { formatDuration, formatRating } from "@/lib/youtube";
import { Documentary } from "@shared/schema";

interface DocumentaryCardProps {
  documentary: Documentary;
}

export default function DocumentaryCard({ documentary }: DocumentaryCardProps) {
  const [, setLocation] = useLocation();

  const handleClick = () => {
    setLocation(`/watch/${documentary.id}`);
  };

  return (
    <div 
      className="group cursor-pointer card-hover"
      onClick={handleClick}
    >
      <div className="relative bg-netflix-dark rounded-lg overflow-hidden aspect-video mb-3">
        <img 
          src={documentary.thumbnail}
          alt={`${documentary.title} thumbnail`}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
          <Play className="text-4xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-12 w-12 fill-current" />
        </div>
        
        <Badge className="absolute top-2 right-2 bg-netflix-red hover:bg-netflix-red text-white text-xs font-medium">
          {formatDuration(documentary.duration)}
        </Badge>
        
        {documentary.featured && (
          <Badge className="absolute top-2 left-2 bg-yellow-600 hover:bg-yellow-600 text-white text-xs font-medium">
            Featured
          </Badge>
        )}
      </div>
      
      <h4 className="font-semibold text-sm mb-1 group-hover:text-netflix-gray transition-colors line-clamp-1">
        {documentary.title}
      </h4>
      
      <p className="text-netflix-gray text-xs line-clamp-2 mb-2">
        {documentary.description}
      </p>
      
      <div className="flex items-center justify-between">
        <span className="text-netflix-gray text-xs capitalize">
          {documentary.category}
        </span>
      </div>
    </div>
  );
}
