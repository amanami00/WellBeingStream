import { useQuery } from "@tanstack/react-query";
import { Documentary } from "@shared/schema";

export function useDocumentaries(category?: string, search?: string) {
  return useQuery<Documentary[]>({
    queryKey: ["/api/documentaries", { category, search }],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (category && category !== "all") {
        params.append("category", category);
      }
      if (search) {
        params.append("search", search);
      }
      
      const url = `/api/documentaries${params.toString() ? `?${params.toString()}` : ''}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error("Failed to fetch documentaries");
      }
      
      return response.json();
    },
  });
}

export function useFeaturedDocumentary() {
  return useQuery<Documentary>({
    queryKey: ["/api/documentaries/featured"],
  });
}

export function useDocumentary(id: number) {
  return useQuery<Documentary>({
    queryKey: ["/api/documentaries", id],
    enabled: !!id,
  });
}
