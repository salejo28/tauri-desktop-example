import { create } from "zustand";

interface Snippet {
  name: string;
  code: string | null;
}

interface SnippetState {
  snippets: string[];
  selectedSnippet: Snippet | null;
  addSnippet: (name: string) => void;
  addSnippets: (names: string[]) => void;
  setSelectedSnippet: (snippet: Snippet | null) => void;
  removeSnippet: (snippet: string) => void;
}

const addSnippet = (snippets: string[], newSnippets: string[]): string[] => {
  const finalSnippets = [...snippets, ...newSnippets];
  return [...new Set(finalSnippets)];
};

export const useSnippetStore = create<SnippetState>((set) => ({
  snippets: [],
  selectedSnippet: null,
  addSnippet: (name) =>
    set((state) => ({
      snippets: [...state.snippets, name],
    })),
  addSnippets: (names) =>
    set((state) => ({
      snippets: addSnippet(state.snippets, names),
    })),
  setSelectedSnippet: (snippet: Snippet | null) =>
    set({
      selectedSnippet: snippet,
    }),
  removeSnippet: (snippet: string) =>
    set((state) => ({
      snippets: state.snippets.filter((s) => s !== snippet),
    })),
}));
