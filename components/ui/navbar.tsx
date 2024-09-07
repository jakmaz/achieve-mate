import { Card } from "@/components/ui/card"; // Using Card from shadcn
import Link from "next/link";
import { ThemeSwitch } from "../theme-switch";

export default function Navbar() {
  return (
    <Card className="p-4">
      <div className="flex gap-4 justify-between items-center">
        {/* Brand Name */}
        <div className="text-2xl font-bold">
          <Link href="/">AchieveMate</Link>
        </div>

        {/* Navigation Links */}
        <div className="space-x-4">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/about" className="hover:underline">
            About
          </Link>
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
        </div>
        <ThemeSwitch />
      </div>
    </Card>
  );
}
