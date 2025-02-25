import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Brain, Menu, X, ChevronDown } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useState } from "react";

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/">
            <a className="flex items-center space-x-2 group">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-white font-bold text-xl group-hover:scale-105 transition-transform">
                AF
              </div>
              <span className="font-bold text-lg hidden sm:inline-block">Agent Flow</span>
            </a>
          </Link>

          {/* Mobile menu button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? 
              <X className="h-6 w-6" /> : 
              <Menu className="h-6 w-6" />
            }
          </Button>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:block">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-primary/5">
                  <span>השירותים שלנו</span>
                  <ChevronDown className="h-4 w-4 ms-1 transition-transform duration-200" />
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 w-[400px] grid-cols-2">
                    <li className="col-span-2">
                      <Link href="/services/ai-agents">
                        <NavigationMenuLink className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-r from-primary/90 to-primary p-6 no-underline outline-none focus:shadow-md hover:scale-[1.02] transition-transform">
                          <div className="mb-2 text-lg font-medium text-white">
                            סוכני AI
                          </div>
                          <p className="text-sm leading-tight text-white/90">
                            פתרונות אוטומציה חכמים לעסק שלך
                          </p>
                        </NavigationMenuLink>
                      </Link>
                    </li>
                    <li>
                      <Link href="/services/chatbots">
                        <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-200 hover:bg-primary/5 hover:text-primary focus:bg-accent hover:scale-[1.02]">
                          <div className="text-sm font-medium">צ'אטבוטים</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            שירות לקוחות אוטומטי 24/7
                          </p>
                        </NavigationMenuLink>
                      </Link>
                    </li>
                    <li>
                      <Link href="/services/automation">
                        <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-200 hover:bg-primary/5 hover:text-primary focus:bg-accent hover:scale-[1.02]">
                          <div className="text-sm font-medium">אוטומציה</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            ייעול תהליכים עסקיים
                          </p>
                        </NavigationMenuLink>
                      </Link>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/courses">
                  <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-primary/5 hover:text-primary focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 hover:scale-[1.02]">
                    קורסים
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/about">
                  <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-primary/5 hover:text-primary focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 hover:scale-[1.02]">
                    מי אנחנו
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/blog">
                  <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-primary/5 hover:text-primary focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 hover:scale-[1.02]">
                    בלוג
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 top-16 bg-background z-40 p-4 md:hidden">
            <div className="flex flex-col gap-2">
              <Link href="/services">
                <a className="block py-3 px-4 hover:bg-primary/5 rounded-lg">השירותים שלנו</a>
              </Link>
              <Link href="/courses">
                <a className="block py-3 px-4 hover:bg-primary/5 rounded-lg">קורסים</a>
              </Link>
              <Link href="/about">
                <a className="block py-3 px-4 hover:bg-primary/5 rounded-lg">מי אנחנו</a>
              </Link>
              <Link href="/blog">
                <a className="block py-3 px-4 hover:bg-primary/5 rounded-lg">בלוג</a>
              </Link>
              <div className="mt-4">
                <Link href="/contact">
                  <Button className="w-full gap-2">
                    <Brain className="w-4 h-4" />
                    צור קשר
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}

        <div className="hidden md:flex items-center gap-4">
          <Link href="/contact">
            <Button className="gap-2 hover:scale-[1.02] transition-all duration-200">
              <Brain className="w-4 h-4" />
              צור קשר
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  );
}