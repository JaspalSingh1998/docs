'use client'
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import useEditorStore from "@/store/use-editor-store";
import { BoldIcon, ItalicIcon, ListTodoIcon, LucideIcon, MessageSquarePlusIcon, PrinterIcon, Redo2Icon, RemoveFormattingIcon, SpellCheckIcon, UnderlineIcon, Undo2Icon } from "lucide-react";
import FontFamilyButton from "./components/FontFamilyButton";
import HeadingLevelButton from "./components/HeadingLevelButton";
import TextColorButton from "./components/TextColorButton";
import HighlightColorButton from "./components/HighlightColorButton";
import LinkButton from "./components/LinkButton";
import ImageButton from "./components/ImageButton";
import AlignButton from "./components/AlignButton";
import ListButton from "./components/ListButton";
import FontSizeButton from "./components/FontButton";

interface ToolbarButtonProps {
    onClick? : () => void;
    isActive?: boolean;
    icon: LucideIcon
}

const ToolbarButton = ({onClick, isActive, icon: Icon}: ToolbarButtonProps) => {
  return (
    <div>
        <button onClick={onClick} className={cn("text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80", isActive && "bg-neutral-200/80")}>
            <Icon className="size-4"/>
        </button>
    </div>
  )
}

const Toolbar = () => {
    const { editor } = useEditorStore();
    const sections: {
        label: string,
        icon: LucideIcon,
        isActive?: boolean,
        onClick?: () => void
    }[][] = [
        [
            {
                label: 'Undo',
                icon: Undo2Icon,
                onClick: () => editor?.chain().focus().undo().run(),
            },
            {
                label: 'Redo',
                icon: Redo2Icon,
                onClick: () => editor?.chain().focus().redo().run(),
            },
            {
                label: 'Print',
                icon: PrinterIcon,
                onClick: () => window.print(),
            },
            {
                label: 'Spell Checker',
                icon: SpellCheckIcon,
                onClick: () => {
                    const current = editor?.view.dom.getAttribute('spellcheck');
                    editor?.view.dom.setAttribute('spellcheck', current === 'false' ? 'true' : 'false');
                }
            }
        ],
        [
            {
                label: 'Bold',
                icon: BoldIcon,
                onClick: () => editor?.chain().focus().toggleBold().run(),
                isActive: editor?.isActive('bold')
            },
            {
                label: 'Italic',
                icon: ItalicIcon,
                onClick: () => editor?.chain().focus().toggleItalic().run(),
                isActive: editor?.isActive('italic')
            },
            {
                label: 'Underline',
                icon: UnderlineIcon,
                onClick: () => editor?.chain().focus().toggleUnderline().run(),
                isActive: editor?.isActive('underline')
            }
        ],
        [
            {
                label: 'Comment',
                icon: MessageSquarePlusIcon,
                onClick: () => console.log('TODO'),
                isActive: false
            },
            {
                label: 'List Todo',
                icon: ListTodoIcon,
                onClick: () => editor?.chain().focus().toggleTaskList().run(),
                isActive: editor?.isActive('taskList')
            },
            {
                label: 'Remove Formatting',
                icon: RemoveFormattingIcon,
                onClick: () => editor?.chain().focus().unsetAllMarks().run(),
            }
        ]
    ]
  return (
    <div className='bg-[#F1F4f9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto'>
        {
            sections[0].map((item) => (
                <ToolbarButton key={item.label} {...item} />
            ))
        }
        <Separator orientation="vertical" className="h-6 bg-neutral-300"/>
        <FontFamilyButton />
        <Separator orientation="vertical" className="h-6 bg-neutral-300"/>
        <HeadingLevelButton />
        <Separator orientation="vertical" className="h-6 bg-neutral-300"/>
        <FontSizeButton />
        <Separator orientation="vertical" className="h-6 bg-neutral-300"/>
        {
            sections[1].map((item) => (
                <ToolbarButton key={item.label} {...item} />
            ))
        }
        <TextColorButton />
        <HighlightColorButton />
        <Separator orientation="vertical" className="h-6 bg-neutral-300"/>
        <LinkButton />
        <ImageButton />
        <AlignButton />
        {/* TODO: Line Height */}
        <ListButton />
        {
            sections[2].map((item) => (
                <ToolbarButton key={item.label} {...item} />
            ))
        }
    </div>
  )
}

export default Toolbar