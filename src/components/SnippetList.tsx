import { useEffect } from "react";
import { readDir } from "@tauri-apps/api/fs";
import { desktopDir } from "@tauri-apps/api/path";
import { useSnippetStore } from "../store/snippetsStore";
import { SnippetItem } from "./SnippetItem";

export const SnippetList = () => {
  const addSnippets = useSnippetStore((state) => state.addSnippets);
  const snippets = useSnippetStore((state) => state.snippets);

  useEffect(() => {
    async function loadFiles() {
      const desktopPath = await desktopDir();
      const result = await readDir(`${desktopPath}/tauri-files`);
      const fileNames = result.map((file) => file.name!);
      addSnippets(fileNames);
    }

    loadFiles();
  }, []);

  return (
    <div>
      {snippets.map((snippet, idx) => (
        <SnippetItem key={idx} snippet={snippet} />
      ))}
    </div>
  );
};
