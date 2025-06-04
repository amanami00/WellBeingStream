import { Documentary } from "@shared/schema";
import DocumentaryCard from "./documentary-card";
import { Skeleton } from "@/components/ui/skeleton";

interface DocumentaryGridProps {
  documentaries: Documentary[];
  title: string;
  isLoading?: boolean;
  error?: string | null;
}

export default function DocumentaryGrid({ 
  documentaries, 
  title, 
  isLoading, 
  error 
}: DocumentaryGridProps) {
  if (error) {
    return (
      <section className="container mx-auto px-6 pb-12">
        <h3 className="text-2xl font-bold mb-6">{title}</h3>
        <div className="text-center py-12">
          <p className="text-netflix-gray">
            Failed to load documentaries: {error}
          </p>
        </div>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="container mx-auto px-6 pb-12">
        <h3 className="text-2xl font-bold mb-6">{title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-12">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="space-y-3">
              <Skeleton className="aspect-video rounded-lg bg-netflix-dark" />
              <Skeleton className="h-4 w-3/4 bg-netflix-dark" />
              <Skeleton className="h-3 w-full bg-netflix-dark" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (documentaries.length === 0) {
    return (
      <section className="container mx-auto px-6 pb-12">
        <h3 className="text-2xl font-bold mb-6">{title}</h3>
        <div className="text-center py-12">
          <p className="text-netflix-gray">
            No documentaries found in this category.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-6 pb-12">
      <h3 className="text-2xl font-bold mb-6">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-12">
        {documentaries.map((documentary) => (
          <DocumentaryCard 
            key={documentary.id} 
            documentary={documentary} 
          />
        ))}
      </div>
    </section>
  );
}
