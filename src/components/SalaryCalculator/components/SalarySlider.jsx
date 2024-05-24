import { Slider } from "@/components/ui/slider";
import React from "react";

const SalarySlider = ({ setSalary, ...props }) => {
  return (
    <Slider
      max={999_999}
      min={0}
      step={5000}
      className="w-[60%]"
      onValueChange={(value) => {
        const number = parseInt(value[0]);

        setSalary(number);
      }}
      {...props}
    />
  );
};

export default SalarySlider;
