import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import { useSelector } from "react-redux";
import { conformToMask } from "react-text-mask";
import { createNumberMask } from "text-mask-addons";
import { getConformedValue } from "../../../masked-input/NumberMask";

const HouseHoldTable = () => {
  const { members } = useSelector((state) => state.familyMembers);

  const numberMaskOptions = {
    prefix: "",
    suffix: " Ft",
    thousandsSeparatorSymbol: ".",
    integerLimit: 999999999999,
  };
  const totalNetSalaryMask = createNumberMask(numberMaskOptions);

  return (
    <Table className="rounded-md bg-background">
      <TableHeader>
        <TableRow>
          <TableHead>Családtag</TableHead>
          <TableHead>Nettó bér</TableHead>
        </TableRow>
      </TableHeader>
      {members[0] && members[0].name && (
        <TableBody>
          {members.map((member) => {
            return (
              <TableRow key={member.id}>
                <TableCell>{member.name}</TableCell>
                <TableCell>
                  {getConformedValue(member.netSalary.toString())}
                </TableCell>
              </TableRow>
            );
          })}
          <TableRow>
            <TableCell>Összesen:</TableCell>
            <TableCell>{getTotalNetSalary()}</TableCell>
          </TableRow>
        </TableBody>
      )}
    </Table>
  );

  function getTotalNetSalary() {
    return conformToMask(
      members.reduce((acc, member) => acc + member.netSalary, 0).toString(),
      totalNetSalaryMask,
    ).conformedValue;
  }
};

export default HouseHoldTable;
