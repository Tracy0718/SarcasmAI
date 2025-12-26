import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/methodology", label: "Methodology" },
  { href: "/model-architecture", label: "Architecture" },
  { href: "/results", label: "Results" },
  { href: "/demo", label: "Demo" },
  { href: "/applications", label: "Applications" },
  { href: "/research-paper", label: "Paper" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const currentUser = typeof window !== "undefined" ? localStorage.getItem("sd_current_user") : null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <Brain className="w-5 h-5 text-primary" />
            </div>
            <span className="font-bold text-lg text-gradient hidden sm:block">
              SarcasmAI
            </span>
          </Link>

          {/* Desktop Navigation: only show main links if signed in */}
          <div className="hidden lg:flex items-center gap-1">
            {currentUser
              ? navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={cn(
                      "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                      location.pathname === link.href
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    )}
                  >
                    {link.label}
                  </Link>
                ))
              : null}

            {/* Auth controls */}
            {currentUser ? (
              <button
                onClick={() => {
                  try {
                    localStorage.removeItem("sd_current_user");
                  } catch {}
                  navigate("/auth");
                }}
                className="px-3 py-2 text-sm font-medium rounded-md bg-destructive/10 text-destructive"
              >
                Sign Out
              </button>
            ) : (
              <Link
                to="/auth"
                className="px-3 py-2 text-sm font-medium rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Desktop CTA removed per request */}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-2">
              {currentUser
                ? navLinks.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "px-4 py-2 text-sm font-medium rounded-md transition-colors",
                        location.pathname === link.href
                          ? "text-primary bg-primary/10"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))
                : null}

              {currentUser ? (
                <button
                  onClick={() => {
                    try {
                      localStorage.removeItem("sd_current_user");
                    } catch {}
                    setIsOpen(false);
                    navigate("/auth");
                  }}
                  className="w-full text-left p-4 bg-secondary/50 rounded-lg text-sm"
                >
                  Sign Out
                </button>
              ) : (
                <Link
                  to="/auth"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-left p-4 bg-secondary/50 rounded-lg text-sm"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
