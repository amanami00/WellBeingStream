import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface HeaderProps {
  onSearch?: (query: string) => void;
}

export default function Header({ onSearch }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    onSearch?.(value);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-netflix-black" 
          : "bg-gradient-to-b from-netflix-black to-transparent"
      }`}
    >
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-netflix-red">
          WellStream
        </Link>

        <div className="relative">
          <Input
            type="text"
            placeholder="Search documentaries..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="bg-transparent border-netflix-gray rounded px-3 py-2 text-sm w-64 focus:border-white transition-colors"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-netflix-gray h-4 w-4" />
        </div>
      </nav>
    </header>
  );
}
