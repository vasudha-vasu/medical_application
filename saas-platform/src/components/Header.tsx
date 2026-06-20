import Link from "next/link";
import { Phone, Calendar, UserCircle } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <img src="/clinic-logo.png" alt="Dr. Helios SaaS" className="h-20 md:h-24 w-auto object-contain" />
        </Link>
        
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/services" className="transition-colors hover:text-sky-500 text-slate-600">Services</Link>
          <Link href="/book" className="transition-colors hover:text-sky-500 text-slate-600">Book Appointment</Link>
          <Link href="/dashboard/patient" className="transition-colors hover:text-sky-500 text-slate-600">Patient Portal</Link>
          <Link href="/dashboard/admin" className="transition-colors hover:text-sky-500 text-slate-600">Admin</Link>
        </nav>

        <div className="flex items-center gap-4">
          <a href="tel:+919705506407" className="hidden lg:flex items-center gap-2 text-sm font-medium text-sky-600 hover:text-sky-700">
            <Phone className="h-4 w-4" />
            +91 97055 06407
          </a>
          <Link href="/book" className={buttonVariants({ variant: "default" })}>
            <Calendar className="mr-2 h-4 w-4" /> Book Now
          </Link>
          <Button variant="ghost" size="icon" className="md:hidden">
            <UserCircle className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
