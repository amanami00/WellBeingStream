import { useParams, useLocation } from "wouter";
import { ArrowLeft, Plus, ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useDocumentary } from "@/hooks/use-documentaries";
import { getYouTubeEmbedUrl, formatDuration, formatRating } from "@/lib/youtube";
import { Skeleton } from "@/components/ui/skeleton";

export default function Watch() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  
  const documentaryId = id ? parseInt(id) : 0;
  
  const { 
    data: documentary, 
    isLoading, 
    error 
  } = useDocumentary(documentaryId);

  const handleBack = () => {
    setLocation("/");
  };

  const handleAddToList = () => {
    // TODO: Implement add to list functionality
    console.log("Add to list:", documentary?.title);
  };

  const handleLike = () => {
    // TODO: Implement like functionality
    console.log("Like:", documentary?.title);
  };

  const handleDislike = () => {
    // TODO: Implement dislike functionality
    console.log("Dislike:", documentary?.title);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-netflix-black text-white">
        <div className="container mx-auto px-6 py-8">
          <Skeleton className="h-8 w-32 mb-8 bg-netflix-dark" />
          <Skeleton className="aspect-video w-full mb-8 bg-netflix-dark" />
          <Skeleton className="h-12 w-2/3 mb-4 bg-netflix-dark" />
          <Skeleton className="h-6 w-full mb-2 bg-netflix-dark" />
          <Skeleton className="h-6 w-3/4 bg-netflix-dark" />
        </div>
      </div>
    );
  }

  if (error || !documentary) {
    return (
      <div className="min-h-screen bg-netflix-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Documentary Not Found</h1>
          <p className="text-netflix-gray mb-8">
            The documentary you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={handleBack} className="bg-netflix-red hover:bg-red-700">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-netflix-black text-white">
      <div className="container mx-auto px-6 py-8">
        {/* Back Button */}
        <Button 
          onClick={handleBack}
          variant="ghost" 
          className="mb-8 hover:bg-netflix-dark"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        {/* Video Player */}
        <div className="aspect-video bg-netflix-dark rounded-lg overflow-hidden mb-8">
          <iframe
            src={getYouTubeEmbedUrl(documentary.youtubeId)}
            title={documentary.title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Documentary Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h1 className="text-4xl font-bold mb-4">{documentary.title}</h1>
            
            <div className="flex items-center space-x-4 mb-6">
              <Badge className="bg-netflix-red hover:bg-netflix-red text-white">
                {formatDuration(documentary.duration)}
              </Badge>
              <span className="text-netflix-gray">
                {documentary.publishedAt ? new Date(documentary.publishedAt).getFullYear() : 'N/A'}
              </span>
              <Badge variant="outline" className="capitalize border-netflix-gray text-netflix-gray">
                {documentary.category}
              </Badge>

            </div>

            <p className="text-lg text-netflix-gray leading-relaxed mb-8">
              {documentary.description}
            </p>
          </div>

          <div className="space-y-4">
            <Button 
              onClick={handleAddToList}
              className="w-full bg-netflix-dark hover:bg-opacity-80"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add to My List
            </Button>

            <div className="flex space-x-2">
              <Button 
                onClick={handleLike}
                variant="outline" 
                size="sm"
                className="flex-1 border-netflix-gray hover:bg-netflix-dark"
              >
                <ThumbsUp className="h-4 w-4 mr-2" />
                Like
              </Button>
              
              <Button 
                onClick={handleDislike}
                variant="outline" 
                size="sm"
                className="flex-1 border-netflix-gray hover:bg-netflix-dark"
              >
                <ThumbsDown className="h-4 w-4 mr-2" />
                Dislike
              </Button>
            </div>

            <div className="bg-netflix-dark p-4 rounded-lg">
              <h3 className="font-semibold mb-2">About this Documentary</h3>
              <div className="space-y-2 text-sm text-netflix-gray">
                <div>
                  <span className="font-medium">Category:</span> 
                  <span className="ml-2 capitalize">{documentary.category}</span>
                </div>
                <div>
                  <span className="font-medium">Duration:</span> 
                  <span className="ml-2">{formatDuration(documentary.duration)}</span>
                </div>
                <div>
                  <span className="font-medium">Published:</span> 
                  <span className="ml-2">
                    {new Date(documentary.publishedAt).toLocaleDateString()}
                  </span>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
