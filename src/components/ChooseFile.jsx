import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { SquarePen } from "lucide-react";

export const ChooseFile = () => {
  const fileInputRef = useRef(null);

  return (
    <>
      <Button
        type="button"
        variant="outline"
        className="button-bg cursor-pointer rounded-full size-10"
        onClick={() => fileInputRef.current?.click()}
      >
        <SquarePen className="size-5 text-foreground" />
      </Button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];

          if (file) {
            console.log(file);
          }
        }}
      />
    </>
  );
};
