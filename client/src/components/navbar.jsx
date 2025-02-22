import { Link, useLocation } from "wouter";
import PropTypes from 'prop-types';
import { Button } from "@/components/ui/button";
import { TimerIcon, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Timeline", href: "/timeline" },
  { name: "Create", href: "/create" },
  { name: "About", href: "/about" },
  { name: "Gallery", href: "/gallery" },
];

export function Navbar() {
  const [location] = useLocation();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <TimerIcon className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block">
              Digital Time Capsule
            </span>
          </Link>
          <div className="flex gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  location === item.href
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <TimerIcon className="h-6 w-6 text-primary" />
                Digital Time Capsule
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-4 mt-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    location === item.href
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <Button asChild>
            <Link href="/create">Create Capsule</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
