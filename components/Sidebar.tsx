"use client";
import { usePathname } from "next/navigation";
import React, { ReactNode, useMemo } from "react";
import { BiSearch } from "react-icons/bi";
import { HiHome } from "react-icons/hi";
import Box from "./Box";
import SidebarItem from "./SidebarItem";
import Library from "./Library";
import { Song } from "@/types";
import usePlayer from "@/hooks/usePlayer";
import { twMerge } from "tailwind-merge";

interface SideBarProps {
  children: ReactNode;
  songs: Song[];
}

const Sidebar = ({ children, songs }: SideBarProps) => {
  const pathname = usePathname();
  const player = usePlayer();

  const routes = useMemo(
    () => [
      {
        active: pathname !== "/search",
        label: "Home",
        href: "/",
        icon: HiHome,
      },
      {
        active: pathname === "/search",
        label: "Search",
        href: "/search",
        icon: BiSearch,
      },
    ],

    [pathname]
  );
  return (
    <div
      className={twMerge(
        `
      flex
      h-full
    `,
        player.activeId && "h-[calc(100% - 80px)]"
      )}
    >
      <div className="hidden md:flex flex-col bg-black h-full w-[300px] p-2">
        <Box>
          <div className="flex flex-col gap-y-4 px-5 py-4">
            {routes.map((item) => (
              <SidebarItem key={item.label} {...item} />
            ))}
          </div>
        </Box>
        <Box className="overflow-y-auto mt-2 h-full">
          <Library songs={songs} />
        </Box>
      </div>
      <main className="h-full flex-1 overflow-y-auto py-2">{children}</main>
    </div>
  );
};

export default Sidebar;
