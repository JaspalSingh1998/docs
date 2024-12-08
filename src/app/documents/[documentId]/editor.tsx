'use client';

import useEditorStore from "@/store/use-editor-store";
import Image from "@tiptap/extension-image";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ImageResize from "tiptap-extension-resize-image";
import FontFamily from '@tiptap/extension-font-family'
import TextStyle from "@tiptap/extension-text-style";
import { Color } from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import { FontSize } from "@/extensions/FontSize";
import { LineHeightExtension } from "@/extensions/LineHeight";
import { Ruler } from "./ruler";

export const Editor = () => {
    const {setEditor} = useEditorStore();
    const editor = useEditor({
        immediatelyRender: false,
        onCreate: ({ editor }) => {
            setEditor(editor);
        },
        onUpdate: ({ editor }) => {
            setEditor(editor);
        },
        onDestroy: () => {
            setEditor(null);
        },
        onSelectionUpdate: ({ editor }) => {
            setEditor(editor);
        },
        onTransaction({editor}) {
            setEditor(editor);
        },
        onFocus: ({ editor }) => {
            setEditor(editor);
        },
        onBlur: ({ editor }) => {
            setEditor(editor);
        },
        onContentError({ editor }) {
            setEditor(editor);
        },
        editorProps: {
            attributes: {
                style: "padding-left: 56px; padding-right: 56px;",
                class: "focus:outline-none print:border-0 bg-white border border-[#C7C7C7] flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10"
            }
        },
        extensions: [
            Underline,
            StarterKit,
            Highlight.configure({ multicolor: true }),
            Link.configure({ openOnClick: false, autolink: true, defaultProtocol: 'https' }),
            Color,
            TextStyle,
            FontFamily,
            FontSize,
            LineHeightExtension,
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
            TaskList,
            TaskItem.configure({
                nested: true,
              }),
              Table.configure({
                resizable: true,
              }),
              TableRow,
              TableHeader,
              TableCell,
              Image,
              ImageResize
        ],
        content: `
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th colspan="3">Description</th>
            </tr>
            <tr>
              <td>Cyndi Lauper</td>
              <td>Singer</td>
              <td>Songwriter</td>
              <td>Actress</td>
            </tr>
          </tbody>
        </table>
      `,
    });
    return (
        <div className="size-full overflow-x-auto bg-[#F9FBFD] px-4 print:p-0 print:bg-white print:overflow-visible">
            <Ruler />
            <div className="min-w-max flex justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0">
            <EditorContent editor={editor} />
            </div>
        </div>
    )
}