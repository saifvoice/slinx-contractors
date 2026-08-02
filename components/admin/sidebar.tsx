"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Briefcase, Zap, Newspaper, Quote, FolderKanban,
  Inbox, Mail, Users, Image as ImageIcon, Settings, ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Quote Requests", href: "/admin/quote-requests", icon: Inbox },
  { label: "Contact Messages", href: "/admin/contact-messages", icon: Mail },
  { label: "Applications", href: "/admin/applications", icon: Briefcase },
  { label: "Projects", href: "/admin/projects", icon: FolderKanban },
  { label: "Services", href: "/admin/services", icon: Zap },
  { label: "Blog", href: "/admin/blog", icon: Newspaper },
  { label: "Testimonials", href: "/admin/testimonials", icon: Quote },
  { label: "Careers", href: "/admin/careers", icon: Briefcase },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Media Library", href: "/admin/media", icon: ImageIcon },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 border-r border-border bg-card lg:block">
      <div className="flex h-16 items-center gap-2.5 border-b border-border px-6">
        <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <Zap className="h-4 w-4" />
        </span>
        <span className="font-display text-sm font-semibold">Admin</span>
      </div>

      <nav className="flex flex-col gap-1 p-4">
        {navItems.map((item) => {
          const active = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}

        <Link
          href="/dashboard"
          className="mt-4 flex items-center gap-3 rounded-md border-t border-border px-3 py-2.5 pt-4 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Client Portal
        </Link>
      </nav>
    </aside>
  );
}
