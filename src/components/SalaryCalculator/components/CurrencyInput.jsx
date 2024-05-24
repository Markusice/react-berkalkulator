import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import MaskedInput from "react-text-mask";
import NumberMask from "../../../masked-input/NumberMask";

const CurrencyInput = ({
  type,
  id,
  placeholder,
  labelText,
  setCurrencyValue,
  ...props
}) => {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor={id}>{labelText}</Label>

      <MaskedInput
        mask={NumberMask}
        type={type}
        id={id}
        placeholder={placeholder}
        onChange={({ target }) => {
          const value = target.value;

          // input can be empty
          if (!value) return;

          setCurrencyValue(parseInt(value.replaceAll(".", "")));
        }}
        render={(ref, props) => <Input ref={ref} {...props} />}
        {...props}
      />

      <Label className="opacity-60">Add meg a bruttó béredet!</Label>
    </div>
  );
};

export default CurrencyInput;
