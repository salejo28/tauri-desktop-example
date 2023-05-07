import { Editor } from "@monaco-editor/react";
import { useSnippetStore } from "../store/snippetsStore";
import { useEffect, useState } from "react";
import { writeTextFile } from "@tauri-apps/api/fs";
import { desktopDir } from "@tauri-apps/api/path";
import {TfiPencil} from 'react-icons/tfi'

export const SnippetEditor = () => {
  const selectedSnippet = useSnippetStore((state) => state.selectedSnippet);
  const [text, setText] = useState<string | undefined>("");

  useEffect(() => {
    if (!selectedSnippet) return
    const interval = setTimeout(async () => {
      const desktopPath = await desktopDir();
      await writeTextFile(
        `${desktopPath}/tauri-files/${selectedSnippet.name}`,
        text!
      );
      console.log("Saving text");
    }, 2000);

    return () => {
      clearTimeout(interval);
    };
  }, [text]);

  return (
    <>
      {selectedSnippet ? (
        <Editor
          theme="vs-dark"
          defaultLanguage="javascript"
          options={{ fontSize: 20 }}
          onChange={(value) => setText(value)}
          value={selectedSnippet?.code ?? ''}
        />
      ) : (
        <TfiPencil className="text-9xl text-neutral-500" />
      )}
    </>
  );
};
