import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import Header from "@/components/header";
import HeroBanner from "@/components/hero-banner";
import CategoryFilters from "@/components/category-filters";
import DocumentaryGrid from "@/components/documentary-grid";
import Footer from "@/components/footer";
import { useDocumentaries, useFeaturedDocumentary } from "@/hooks/use-documentaries";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const [location, setLocation] = useLocation();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Get category from URL params
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get("category");
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [location]);

  const { 
    data: featuredDoc, 
    isLoading: isFeaturedLoading, 
    error: featuredError 
  } = useFeaturedDocumentary();

  const { 
    data: documentaries = [], 
    isLoading: isDocsLoading, 
    error: docsError 
  } = useDocumentaries(selectedCategory, searchQuery);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSearchQuery(""); // Clear search when changing category
    
    if (category === "all") {
      setLocation("/");
    } else {
      setLocation(`/?category=${category}`);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      setSelectedCategory("all"); // Reset category when searching
    }
  };

  const getGridTitle = () => {
    if (searchQuery) {
      return `Search results for "${searchQuery}"`;
    }
    
    const categoryTitles = {
      all: "All Documentaries",
      wellbeing: "Wellbeing Documentaries",
      mindfulness: "Mindfulness Documentaries", 
      inspiration: "Inspirational Documentaries",
      meditation: "Meditation Documentaries",
      healing: "Healing Documentaries",
    };
    
    return categoryTitles[selectedCategory as keyof typeof categoryTitles] || "Documentaries";
  };

  return (
    <div className="min-h-screen bg-netflix-black text-white">
      <Header onSearch={handleSearch} />
      
      <main className="pt-20">
        {/* Hero Banner with Background */}
        {isFeaturedLoading ? (
          <section className="relative h-screen flex items-center">
            <div className="absolute inset-0 bg-netflix-dark" />
            <div className="relative container mx-auto px-6 max-w-2xl z-10">
              <Skeleton className="h-16 w-3/4 mb-4 bg-netflix-dark" />
              <Skeleton className="h-6 w-full mb-2 bg-netflix-dark" />
              <Skeleton className="h-6 w-2/3 mb-6 bg-netflix-dark" />
              <div className="flex space-x-4">
                <Skeleton className="h-12 w-24 bg-netflix-dark" />
                <Skeleton className="h-12 w-32 bg-netflix-dark" />
                <Skeleton className="h-12 w-32 bg-netflix-dark" />
              </div>
            </div>
          </section>
        ) : featuredError ? (
          <section className="relative h-screen flex items-center bg-netflix-dark">
            <div className="relative container mx-auto px-6 max-w-2xl z-10">
              <h2 className="text-5xl font-bold mb-4">Featured Content Unavailable</h2>
              <p className="text-lg text-netflix-gray mb-6">
                We're having trouble loading the featured documentary. Please check back later.
              </p>
            </div>
          </section>
        ) : featuredDoc ? (
          <section className="relative h-screen flex items-center">
            {/* Background image that scrolls with page */}
            <div className="absolute inset-0 z-0">
              <img 
                src={featuredDoc.thumbnail}
                alt={`${featuredDoc.title} background`}
                className="w-full h-full object-cover"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/90" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/40" />
            </div>
            
            {/* Hero content */}
            <div className="relative container mx-auto px-6 max-w-2xl z-10">
              <HeroBanner documentary={featuredDoc} />
            </div>
          </section>
        ) : null}

        {/* Category Filters */}
        <CategoryFilters 
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />

        {/* Documentary Grid */}
        <DocumentaryGrid
          documentaries={documentaries}
          title={getGridTitle()}
          isLoading={isDocsLoading}
          error={docsError?.message}
        />
      </main>

      <Footer />
    </div>
  );
}
