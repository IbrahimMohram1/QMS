import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function DialogDetails({
  open,
  onOpenChange,
  title = "Dialog Title",
  description = "",
  children,
  trigger, // عنصر يفتح الـ dialog (Button, Icon, إلخ)
  footer, // عناصر الفوتر، لو مش موجود يبقى زر إغلاق افتراضي
}) {
  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}

        <DialogContent className="bg-white text-black">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>

          <div className="-mx-4 no-scrollbar max-h-[50vh] overflow-y-auto px-4">
            {children}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
