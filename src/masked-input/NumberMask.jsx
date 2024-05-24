import { conformToMask } from "react-text-mask";
import { createNumberMask } from "text-mask-addons";

const numberMaskOptions = {
  prefix: "",
  suffix: " Ft",
  thousandsSeparatorSymbol: ".",
  integerLimit: 6,
};

const NumberMask = createNumberMask(numberMaskOptions);

function getConformedValue(text) {
  return conformToMask(text, NumberMask).conformedValue;
}

export default NumberMask;

export { getConformedValue };
