import { Badge } from "@/components/ui/badge";
import React from "react";
import { conformToMask } from "react-text-mask";
import { createNumberMask } from "text-mask-addons";

const OutputBadge = ({ value }) => {
  const numberMaskOptions = {
    prefix: "",
    suffix: " Ft",
    thousandsSeparatorSymbol: ".",
    integerLimit: 7,
  };
  const outNumberMask = createNumberMask(numberMaskOptions);

  return (
    <Badge className="justify-self-center rounded-xl bg-slate-700 p-5 text-lg">
      {conformToMask(value.toString(), outNumberMask).conformedValue}
    </Badge>
  );
};

export default OutputBadge;
