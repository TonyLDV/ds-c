"use client";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import React from "react";

const ServersPage = () => {
  const { onOpen } = useModal();
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="flex flex-col gap-y-4">
        <p className="text-2xl">Create your server or join existing one!</p>
        <div className="flex justify-between items-center">
          <Button
            className="bg-emerald-500 text-white hover:bg-emerald-600 text-md"
            onClick={() => onOpen("createServer")}
          >
            Create
          </Button>

          <Button variant="primary" className="text-md">
            Join
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServersPage;
