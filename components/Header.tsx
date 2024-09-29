"use client";
import { useRouter } from "next/navigation";
import React, { ReactNode } from "react";
import { BiSearch } from "react-icons/bi";
import { HiHome } from "react-icons/hi";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { twMerge } from "tailwind-merge";
import Button from "./Button";
import useAuthModal from "@/hooks/useAuthModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import { FaUserAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import usePlayer from "@/hooks/usePlayer";
import Link from "next/link";
import useSubscribeModal from "@/hooks/useSubscribeModal";
import useUploadModal from "@/hooks/useUploadModal";
import { AiOutlinePlus } from "react-icons/ai";

interface HeaderProps {
  children: ReactNode;
  className?: string;
}

const Header = ({ children, className }: HeaderProps) => {
  const player = usePlayer();
  const router = useRouter();
  const subscriptionModal = useSubscribeModal();
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();
  const supabaseClient = useSupabaseClient();
  const { user, subscription } = useUser();

  const onClick = () => {
    if (!user) {
      return authModal.onOpen();
    }

    if (!subscription) {
      return subscriptionModal.onOpen();
    }

    return uploadModal.onOpen();
  };
  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    player.reset();
    router.refresh();

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged out!");
    }
  };

  return (
    <div
      className={twMerge(
        `h-fit bg-gradient-to-b from-[#B72FCF] p-6`,
        className
      )}
    >
      <div className="w-full mb-4 flex items-center justify-between">
        <div className="hidden md:flex gap-x-2 items-center">
          <button
            onClick={() => router.back()}
            className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
          >
            <RxCaretLeft size={35} />
          </button>
          <button
            onClick={() => router.forward()}
            className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
          >
            <RxCaretRight size={35} />
          </button>
        </div>
        <div className="flex md:hidden gap-x-2 items-center">
          <Link href={"/"}>
            <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
              <HiHome className="text-black" size={20} />
            </button>
          </Link>
          <Link href={"/search"}>
            <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
              <BiSearch className="text-black" size={20} />
            </button>
          </Link>
          <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
            <AiOutlinePlus onClick={onClick} size={20} className="text-black" />
          </button>
        </div>
        <div className="flex justify-between items-center gap-x-4">
          {user ? (
            <div className="flex gap-x-4 items-center">
              <Button
                onClick={handleLogout}
                className="bg-white px-6 py-2 text-black"
              >
                Logout
              </Button>
              <Button
                onClick={() => router.push("/account")}
                className="bg-white text-black"
              >
                <FaUserAlt />
              </Button>
            </div>
          ) : (
            <>
              <div>
                <Button
                  onClick={authModal.onOpen}
                  className="bg-transparent text-neutral-300 font-medium "
                >
                  Sign Up
                </Button>
              </div>
              <div>
                <Button
                  onClick={authModal.onOpen}
                  className="bg-white px-6 py-2 text-black"
                >
                  Log in
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default Header;
