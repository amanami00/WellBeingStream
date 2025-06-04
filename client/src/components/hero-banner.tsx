import { Play, Plus, Info, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";
import { formatDuration, formatRating } from "@/lib/youtube";
import { Documentary } from "@shared/schema";

interface HeroBannerProps {
  documentary: Documentary;
}

export default function HeroBanner({ documentary }: HeroBannerProps) {
  const [, setLocation] = useLocation();

  const handlePlay = () => {
    setLocation(`/watch/${documentary.id}`);
  };

  const handleAddToList = () => {
    // TODO: Implement add to list functionality
    console.log("Add to list:", documentary.title);
  };

  const handleMoreInfo = () => {
    // TODO: Implement more info modal
    console.log("More info:", documentary.title);
  };

  return (
    <section className="relative h-screen flex items-center">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(to right, 
            hsla(var(--netflix-black), 0.8) 0%, 
            hsla(var(--netflix-black), 0.4) 50%, 
            transparent 100%), 
            url('${documentary.thumbnail}')`
        }}
      />
      
      <div className="relative container mx-auto px-6 max-w-2xl">
        <h2 className="text-5xl md:text-7xl font-bold mb-4">
          {documentary.title}
        </h2>
        
        <p className="text-lg md:text-xl text-netflix-gray mb-6 max-w-lg leading-relaxed">
          {documentary.description}
        </p>
        
        <div className="flex items-center space-x-4 mb-8">
          <Badge className="bg-netflix-red hover:bg-netflix-red text-white">
            Featured
          </Badge>
          <span className="text-netflix-gray">
            {formatDuration(documentary.duration)}
          </span>
          <span className="text-netflix-gray">
            {new Date(documentary.publishedAt).getFullYear()}
          </span>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm">{formatRating(documentary.rating)}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button 
            onClick={handlePlay}
            className="bg-white text-black px-8 py-3 font-semibold hover:bg-netflix-gray transition-colors"
          >
            <Play className="h-5 w-5 mr-2 fill-current" />
            Play
          </Button>
          
          <Button 
            onClick={handleAddToList}
            variant="secondary"
            className="bg-netflix-dark bg-opacity-70 px-8 py-3 font-semibold hover:bg-opacity-90 transition-all"
          >
            <Plus className="h-5 w-5 mr-2" />
            My List
          </Button>
          
          <Button 
            onClick={handleMoreInfo}
            variant="secondary"
            className="bg-netflix-dark bg-opacity-70 px-8 py-3 font-semibold hover:bg-opacity-90 transition-all"
          >
            <Info className="h-5 w-5 mr-2" />
            More Info
          </Button>
        </div>
      </div>
    </section>
  );
}
