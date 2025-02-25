import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export default function Navigation() {
  const [location] = useLocation();
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center space-x-2 group cursor-pointer" onClick={() => window.location.href = '/'}>
            <img 
              src="/logo.svg" 
              alt="Agent Flow" 
              className="h-8 group-hover:scale-105 transition-transform"
            />
          </div>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>השירותים שלנו</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 w-[400px]">
                    <li className="row-span-3">
                      <div 
                        onClick={() => window.location.href = '/services/ai-agents'}
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-primary/50 to-primary p-6 no-underline outline-none focus:shadow-md hover:scale-[1.02] transition-transform cursor-pointer"
                      >
                        <div className="mb-2 text-lg font-medium text-white">
                          סוכני AI
                        </div>
                        <p className="text-sm leading-tight text-white/90">
                          פתרונות אוטומציה חכמים לעסק שלך
                        </p>
                      </div>
                    </li>
                    <li>
                      <div 
                        onClick={() => window.location.href = '/services/chatbots'}
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-200 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground hover:scale-[1.02] cursor-pointer"
                      >
                        <div className="text-sm font-medium">צ'אטבוטים</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          שירות לקוחות אוטומטי 24/7
                        </p>
                      </div>
                    </li>
                    <li>
                      <div 
                        onClick={() => window.location.href = '/services/automation'}
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-200 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground hover:scale-[1.02] cursor-pointer"
                      >
                        <div className="text-sm font-medium">אוטומציה</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          ייעול תהליכים עסקיים
                        </p>
                      </div>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <div 
                  onClick={() => window.location.href = '/courses'}
                  className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 hover:scale-[1.02] cursor-pointer"
                >
                  קורסים
                </div>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <div
                  onClick={() => window.location.href = '/about'}
                  className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 hover:scale-[1.02] cursor-pointer"
                >
                  מי אנחנו
                </div>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <div
                  onClick={() => window.location.href = '/blog'}
                  className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 hover:scale-[1.02] cursor-pointer"
                >
                  בלוג
                </div>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            className="gap-2 border-primary/20 hover:bg-primary/5 hover:scale-[1.02] transition-all duration-200"
            onClick={() => window.location.href = '/contact'}
          >
            <MessageSquare className="w-4 h-4" />
            צור קשר
          </Button>
        </div>
      </nav>
    </header>
  );
}