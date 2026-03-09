"use client";

import { forwardRef } from "react";
import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  linkPlugin,
  linkDialogPlugin,
  imagePlugin,
  tablePlugin,
  codeBlockPlugin,
  codeMirrorPlugin,
  diffSourcePlugin,
  toolbarPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  CodeToggle,
  BlockTypeSelect,
  CreateLink,
  InsertImage,
  InsertTable,
  InsertCodeBlock,
  InsertThematicBreak,
  ListsToggle,
  Separator,
  DiffSourceToggleWrapper,
  type MDXEditorMethods,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";

interface PostEditorProps {
  initialMarkdown: string;
  onChange?: (markdown: string) => void;
  imageAutocompleteSuggestions?: string[];
}

const PostEditor = forwardRef<MDXEditorMethods, PostEditorProps>(
  function PostEditor({ initialMarkdown, onChange, imageAutocompleteSuggestions = [] }, ref) {
    async function imageUploadHandler(file: File): Promise<string> {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/images", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      return data.url;
    }

    return (
      <div className="admin-editor border border-mc-gray/15 rounded-2xl overflow-hidden bg-white">
        <MDXEditor
          ref={ref}
          markdown={initialMarkdown}
          onChange={onChange}
          contentEditableClassName="prose-mc px-6 py-4 min-h-[400px] focus:outline-none"
          plugins={[
            headingsPlugin(),
            listsPlugin(),
            quotePlugin(),
            thematicBreakPlugin(),
            markdownShortcutPlugin(),
            linkPlugin(),
            linkDialogPlugin(),
            tablePlugin(),
            codeBlockPlugin({ defaultCodeBlockLanguage: "python" }),
            codeMirrorPlugin({
              codeBlockLanguages: {
                python: "Python",
                javascript: "JavaScript",
                typescript: "TypeScript",
                css: "CSS",
                html: "HTML",
                bash: "Bash",
                json: "JSON",
                rust: "Rust",
                cpp: "C++",
                go: "Go",
                "": "Plain Text",
              },
            }),
            imagePlugin({
              imageUploadHandler,
              imageAutocompleteSuggestions,
            }),
            diffSourcePlugin({ viewMode: "rich-text" }),
            toolbarPlugin({
              toolbarContents: () => (
                <>
                  <UndoRedo />
                  <Separator />
                  <BoldItalicUnderlineToggles />
                  <CodeToggle />
                  <Separator />
                  <BlockTypeSelect />
                  <Separator />
                  <ListsToggle />
                  <Separator />
                  <CreateLink />
                  <InsertImage />
                  <InsertTable />
                  <InsertCodeBlock />
                  <InsertThematicBreak />
                  <Separator />
                  <DiffSourceToggleWrapper>
                    {null}
                  </DiffSourceToggleWrapper>
                </>
              ),
            }),
          ]}
        />
      </div>
    );
  }
);

export default PostEditor;
