import { Link } from "wouter";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  const footerSections = [
    {
      title: "Browse",
      links: [
        { label: "Wellbeing", href: "/?category=wellbeing" },
        { label: "Mindfulness", href: "/?category=mindfulness" },
        { label: "Inspiration", href: "/?category=inspiration" },
        { label: "New Releases", href: "/" },
      ],
    },
    {
      title: "Account",
      links: [
        { label: "My List", href: "/my-list" },
        { label: "Watch History", href: "/history" },
        { label: "Settings", href: "/settings" },
        { label: "Sign Out", href: "/signout" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Help Center", href: "/help" },
        { label: "Contact Us", href: "/contact" },
        { label: "Privacy", href: "/privacy" },
        { label: "Terms", href: "/terms" },
      ],
    },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  return (
    <footer className="bg-netflix-dark py-12 mt-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h5 className="font-semibold mb-4">{section.title}</h5>
              <ul className="space-y-2 text-sm text-netflix-gray">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link 
                      href={link.href} 
                      className="hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          <div>
            <h5 className="font-semibold mb-4">Connect</h5>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="text-netflix-gray hover:text-white transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-8 text-center text-sm text-netflix-gray">
          <p>&copy; 2024 WellStream. All rights reserved. Documentaries sourced from YouTube creators.</p>
        </div>
      </div>
    </footer>
  );
}
