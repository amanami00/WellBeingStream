import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCategories } from "@/hooks/use-documentaries";

interface CategoryFiltersProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryFilters({ 
  selectedCategory, 
  onCategoryChange 
}: CategoryFiltersProps) {
  const { data: categories, isLoading, error } = useCategories();

  const categoryLabels: { [key: string]: string } = {
    all: "All",
    wellbeing: "Wellbeing",
    mindfulness: "Mindfulness",
    inspiration: "Inspiration",
    meditation: "Meditation",
    healing: "Healing",
  };

  // Helper function to format category names
  const formatCategoryName = (category: string) => {
    return categoryLabels[category] || category.charAt(0).toUpperCase() + category.slice(1);
  };

  if (isLoading) {
    return (
      <section className="container mx-auto px-6 py-8">
        <div className="flex items-center space-x-4 overflow-x-auto pb-4">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-10 w-24 rounded-full" />
          ))}
        </div>
      </section>
    );
  }

  if (error || !categories) {
    return null;
  }

  return (
    <section className="container mx-auto px-6 py-8">
      <div className="flex items-center space-x-4 overflow-x-auto pb-4">
        {categories.map((category) => (
          <Button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-6 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              selectedCategory === category
                ? "bg-netflix-red hover:bg-netflix-red text-white"
                : "bg-netflix-dark hover:bg-opacity-80 text-white"
            }`}
          >
            {formatCategoryName(category)}
          </Button>
        ))}
      </div>
    </section>
  );
}
