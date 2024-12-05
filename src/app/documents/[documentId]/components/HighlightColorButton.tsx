import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import useEditorStore from "@/store/use-editor-store";
import { HighlighterIcon } from "lucide-react";
import { SketchPicker, type ColorResult } from 'react-color';
const HighlightColorButton = () => {
  const {editor} = useEditorStore();    
  
  const value = editor?.getAttributes('highlight').color || '#FFFFFF';

  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setHighlight({color:color.hex}).run()
  }

  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 text-sm overflow-hidden">
            <HighlighterIcon className="size-4"/>
        </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-2.5">
            <SketchPicker color={value} onChange={onChange} />
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default HighlightColorButton