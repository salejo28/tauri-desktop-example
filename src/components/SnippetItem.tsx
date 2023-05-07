import { twMerge } from "tailwind-merge";
import { useSnippetStore } from "../store/snippetsStore";
import { readTextFile, removeFile } from "@tauri-apps/api/fs";
import { desktopDir, join } from "@tauri-apps/api/path";
import React, { MouseEventHandler } from "react";
import { toast } from "react-hot-toast";
import {FiTrash, FiX} from 'react-icons/fi'

export const SnippetItem = ({ snippet }: { snippet: string }) => {
  const setSelectedSnippet = useSnippetStore(
    (state) => state.setSelectedSnippet
  );
  const selectedSnippet = useSnippetStore((state) => state.selectedSnippet);
  const removeSnippet = useSnippetStore((state) => state.removeSnippet);

  const onClick = async () => {
    const desktopPath = await desktopDir();
    const path = await join(desktopPath, "tauri-files", snippet);
    const content = await readTextFile(path);
    setSelectedSnippet({ name: snippet, code: content });
  };

  const onDelete = async (
    e: React.MouseEvent<SVGElement, MouseEvent>
  ) => {
    e.stopPropagation();
    const accept = await window.confirm(
      "Are you sure you want to delete this file?"
    );
    if (!accept) return;
    const desktopPath = await desktopDir();
    const path = await join(desktopPath, "tauri-files", snippet);
    await removeFile(path);
    removeSnippet(snippet);
    toast.success('snippet removed', {
      duration: 2000,
      position: 'bottom-right',
      style: {
        background: '#202020',
        color: '#fff'
      }
    })
  };
  
  const onCancel = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    e.stopPropagation()
    if (selectedSnippet?.name === snippet) {
      setSelectedSnippet(null)
    }
  }

  return (
    <li
      className={twMerge(
        "task py-2 px-4 hover:bg-neutral-900 hover:cursor-pointer flex justify-between items-center",
        selectedSnippet?.name === snippet ? "bg-sky-500" : ""
      )}
      onClick={onClick}
    >
      {snippet}
      <div className="flex gap-2">
        <FiTrash onClick={onDelete} className={selectedSnippet?.name === snippet ? 'text-white' : "text-neutral-500"} />
        <FiX onClick={onCancel} className={selectedSnippet?.name === snippet ? 'text-white' : "text-neutral-500"}  />
      </div>
    </li>
  );
};
