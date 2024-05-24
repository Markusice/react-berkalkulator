import { Button } from "@/components/ui/button";
import React from "react";

const SalaryButton = ({ number, salaryValue, setSalary }) => {
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => {
        const changedSalaryValue = salaryValue * (1 + number / 100);

        if (changedSalaryValue > 999_999) return;

        setSalary(changedSalaryValue);
      }}
    >
      {`${number}%`}
    </Button>
  );
};

export default SalaryButton;
