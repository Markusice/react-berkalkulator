import React from "react";
import SalaryButton from "./SalaryButton";

const SalaryButtons = ({ salaryValue, setSalary }) => {
  return (
    <div className="flex gap-x-3 justify-self-center">
      <SalaryButton
        number={-5}
        salaryValue={salaryValue}
        setSalary={setSalary}
      />
      <SalaryButton
        number={-1}
        salaryValue={salaryValue}
        setSalary={setSalary}
      />
      <SalaryButton
        number={1}
        salaryValue={salaryValue}
        setSalary={setSalary}
      />
      <SalaryButton
        number={5}
        salaryValue={salaryValue}
        setSalary={setSalary}
      />
    </div>
  );
};

export default SalaryButtons;
