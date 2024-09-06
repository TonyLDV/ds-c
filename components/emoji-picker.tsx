"use client";
import React from "react";
import data from "@emoji-mart/data/sets/14/twitter.json";
import appleEmojisData from "@emoji-mart/data/sets/14/apple.json";
import Picker from "@emoji-mart/react";
import { Smile } from "lucide-react";
import { useTheme } from "next-themes";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

type EmojiPickerProps = {
  onChange: (value: string) => void;
};

const EmojiPicker = ({ onChange }: EmojiPickerProps) => {
  const resolvedTheme = useTheme();
  return (
    <Popover>
      <PopoverTrigger>
        <Smile className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition" />
      </PopoverTrigger>
      <PopoverContent
        side="right"
        sideOffset={40}
        className="bg-transparent border-none shadow-none drop-shadow-none mb-16"
      >
        <Picker
          theme={resolvedTheme}
          data={data}
          onEmojiSelect={(emoji: any) => onChange(emoji.native)}
          set="apple"
        />
      </PopoverContent>
    </Popover>
  );
};

export default EmojiPicker;
