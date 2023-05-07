import React, { useState } from "react";
import { writeTextFile } from "@tauri-apps/api/fs";
import { desktopDir } from "@tauri-apps/api/path";
import { useSnippetStore } from "../store/snippetsStore";
import { toast } from "react-hot-toast";

export const SnippetForm = () => {
  const [snippet, setSnippet] = useState<string>("")
  const addSnippet = useSnippetStore(state => state.addSnippet)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

   /*  if (snippet) {

    } */

    const desktopPath = await desktopDir();
    await writeTextFile(`${desktopPath}/tauri-files/${snippet}.js`, ``)
    setSnippet("")
    addSnippet(`${snippet}.js`)
    toast.success('snippet saved', {
      duration: 2000,
      position: 'bottom-right',
      style: {
        background: '#202020',
        color: '#fff'
      }
    })
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Write a Snippet"
        className="bg-zinc-900 w-full border-none outline-none p-4"
        onChange={({ target }) => setSnippet(target.value)}
        value={snippet}
      />
      <button className="hidden">save</button>
    </form>
  );
};
