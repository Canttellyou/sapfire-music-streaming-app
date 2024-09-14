"use client";
import { MediaItem } from "@/components";
import { Song } from "@/types";
import React from "react";

interface SearchContentProps {
  songs: Song[];
}

const SearchContent = ({ songs }: SearchContentProps) => {
  if (songs.length === 0) {
    return (
      <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
        No songs found.
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-y-2 w-full px-6">
      {songs.map((song) => (
        <div key={song.id} className="flex items-center gap-x-4 w-full">
          <div>
            <MediaItem onClick={() => {}} data={song} />
          </div>
          {/* TODO: Add Like Button Here */}
        </div>
      ))}
    </div>
  );
};

export default SearchContent;
