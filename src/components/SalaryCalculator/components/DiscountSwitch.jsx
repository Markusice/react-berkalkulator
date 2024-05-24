import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import React from "react";

const DiscountSwitch = ({ id, labelText, value, setValue }) => {
  return (
    <div className="flex items-center space-x-2">
      <Switch
        id={id}
        checked={value}
        onCheckedChange={(checked) => {
          setValue(checked);
        }}
      />
      <Label htmlFor={id}>{labelText}</Label>
    </div>
  );
};

export default DiscountSwitch;
