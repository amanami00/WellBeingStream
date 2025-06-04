import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Search, Bell, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  onSearch?: (query: string) => void;
}

export default function Header({ onSearch }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [location] = useLocation();

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

  const navItems = [
    { label: "Home", href: "/", category: "all" },
    { label: "Wellbeing", href: "/?category=wellbeing", category: "wellbeing" },
    { label: "Mindfulness", href: "/?category=mindfulness", category: "mindfulness" },
    { label: "Inspiration", href: "/?category=inspiration", category: "inspiration" },
    { label: "My List", href: "/my-list", category: "my-list" },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-netflix-black" 
          : "bg-gradient-to-b from-netflix-black to-transparent"
      }`}
    >
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-2xl font-bold text-netflix-red">
            WellStream
          </Link>
          
          <ul className="hidden md:flex items-center space-x-6 text-sm">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link 
                  href={item.href}
                  className="hover:text-netflix-gray transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative hidden md:block">
            <Input
              type="text"
              placeholder="Search documentaries..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="bg-transparent border-netflix-gray rounded px-3 py-2 text-sm w-64 focus:border-white transition-colors"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-netflix-gray h-4 w-4" />
          </div>

          <Button variant="ghost" size="icon" className="hover:bg-netflix-dark rounded-full">
            <Bell className="h-5 w-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="" alt="User" />
                  <AvatarFallback className="bg-netflix-red text-white">U</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-netflix-dark border-netflix-gray" align="end">
              <DropdownMenuItem className="hover:bg-netflix-black cursor-pointer">
                My List
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-netflix-black cursor-pointer">
                Watch History
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-netflix-black cursor-pointer">
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-netflix-black cursor-pointer">
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon" className="md:hidden hover:bg-netflix-dark rounded-full">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </nav>
    </header>
  );
}
