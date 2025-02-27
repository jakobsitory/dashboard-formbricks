import { Button } from "@/components/ui/button";
import { CircleUserIcon, MessageCircleQuestionIcon, PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export const TopControlButtons = () => {
  const router = useRouter();

  return (
    <div className="z-50 flex items-center space-x-2">
      <Button
        variant="ghost"
        size="icon"
        className="h-fit w-fit bg-slate-50 p-1"
        onClick={() => {}}>
        <MessageCircleQuestionIcon />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-fit w-fit bg-slate-50 p-1"
        onClick={() => {}}>
        <CircleUserIcon />
      </Button>
      <Button
        variant="secondary"
        size="icon"
        className="h-fit w-fit p-1"
        onClick={() => {}}>
        <PlusIcon />
      </Button>
    </div>
  );
};

export const TopControlBar = () => {
  return (
    <div className="sticky top-0 z-20 flex h-14 w-full items-center justify-end bg-slate-50 px-6">
      <div className="shadow-xs">
        <div className="flex w-fit items-center space-x-2 py-2">
          <TopControlButtons />
        </div>
      </div>
    </div>
  );
};
