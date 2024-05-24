import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

const InputWithLabel = ({ type, id, placeholder, labelText, ...props }) => {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor={id}>{labelText}</Label>
      <Input type={type} id={id} placeholder={placeholder} {...props} />

      <Label className="opacity-60">Add meg a családtag nevét!</Label>
    </div>
  );
};

export default InputWithLabel;
