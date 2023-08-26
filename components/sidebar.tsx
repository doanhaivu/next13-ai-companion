"use client";

import Link from "next/link";
import Image from "next/image";
import { Montserrat } from 'next/font/google'
import { Home, Plus, Code, ImageIcon, LayoutDashboard, MessageSquare, Music, Settings, VideoIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { FreeCounter } from "@/components/free-counter";
import { useProModal } from "@/hooks/use-pro-modal";

interface SidebarProps {
  isPro: boolean;
  apiLimitCount: number;
}

const routes = [
  {
    icon: Home,
    href: '/',
    label: "Companions",
    pro: false,
  },/*
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
    color: "text-sky-500",
    pro: false,
  },*/
  {
    label: 'AI Helper',
    icon: MessageSquare,
    href: '/conversation',
    color: "text-violet-500",
    pro: false,
  },
  {
    label: 'Image',
    icon: ImageIcon,
    color: "text-pink-700",
    href: '/image',
    pro: false,
  },
  {
    label: 'Video',
    icon: VideoIcon,
    color: "text-orange-700",
    href: '/video',
    pro: false,
  },
  {
    label: 'Music',
    icon: Music,
    color: "text-emerald-500",
    href: '/music',
    pro: false,
  },
  {
    label: 'Code',
    icon: Code,
    color: "text-green-700",
    href: '/code',
    pro: false,
  },
  {
    icon: Plus,
    href: '/companion/new',
    label: "Create",
    pro: true,
  },
  {
    label: 'Settings',
    icon: Settings,
    href: '/settings',
    pro: false,
  },
];

export const Sidebar = ({
  apiLimitCount = 0,
  isPro = false,
}: SidebarProps) => {
  const proModal = useProModal();
  const router = useRouter();
  const pathname = usePathname();

  const onNavigate = (url: string, pro: boolean) => {
    if (pro && !isPro) {
      return proModal.onOpen();
    }

    return router.push(url);
  }

  return (
    <div className="space-y-4 flex flex-col h-full text-primary bg-secondary">
      <div className="p-3 flex-1 flex justify-center">
        <div className="space-y-2">
          {routes.map((route) => (
            <div
              onClick={() => onNavigate(route.href, route.pro)}
              key={route.href}
              className={cn(
                "text-muted-foreground text-xs group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition",
                pathname === route.href && "bg-primary/10 text-primary",
              )}
            >
              <div className="flex flex-col gap-y-2 items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-0", route.color)} />
                {route.label}
              </div>
            </div>
          ))}
          <FreeCounter 
            apiLimitCount={apiLimitCount} 
            isPro={isPro}
          />
        </div>
      </div>
    </div>
  );
};
