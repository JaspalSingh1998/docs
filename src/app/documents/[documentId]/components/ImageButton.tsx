import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import useEditorStore from "@/store/use-editor-store";
import { ImageIcon, SearchIcon, UploadIcon } from "lucide-react";
import { useState } from "react";

const ImageButton = () => {
  const { editor } = useEditorStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const onChange = (src: string) => {
    editor?.chain().focus().setImage({ src }).run();
  };

  const onUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
          const imageUrl = URL.createObjectURL(file);
          onChange(imageUrl);
      }
    };
    input.click();
  };

  const handleImageUrlSubmit = () => {
    if (!imageUrl) return;
    onChange(imageUrl);
    setImageUrl("");
    setIsDialogOpen(false);
  };


  return (
    <>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 text-sm overflow-hidden">
          <ImageIcon className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2.5 flex flex-col gap-2">
        <DropdownMenuItem onClick={onUpload} className="cursor-pointer">
            <UploadIcon className="size-4 mr-2"/>
            Upload
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setIsDialogOpen(true)} className="cursor-pointer">
            <SearchIcon className="size-4 mr-2"/>
            Paste an image URL
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Insert an image URL</DialogTitle>
            </DialogHeader>
            <Input 
                placeholder="https://example.com/image.jpg"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleImageUrlSubmit();
                    }
                }}
            />
        <DialogFooter>
            <Button onClick={handleImageUrlSubmit}>Insert</Button>
        </DialogFooter>
        </DialogContent>
    </Dialog>
    </>
  );
};

export default ImageButton;