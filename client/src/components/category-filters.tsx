import { Button } from "@/components/ui/button";
import { categories } from "@shared/schema";

interface CategoryFiltersProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryFilters({ 
  selectedCategory, 
  onCategoryChange 
}: CategoryFiltersProps) {
  const categoryLabels = {
    all: "All",
    wellbeing: "Wellbeing",
    mindfulness: "Mindfulness",
    inspiration: "Inspiration",
    meditation: "Meditation",
    healing: "Healing",
  };

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
            {categoryLabels[category]}
          </Button>
        ))}
      </div>
    </section>
  );
}
