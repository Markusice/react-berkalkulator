import { Badge } from "@/components/ui/badge";
import React from "react";

const EligibleBadge = ({ isShowing, isEligible }) => {
  return isShowing ? (
    isEligible ? (
      <Badge className="bg-green-700">Jogosult</Badge>
    ) : (
      <Badge variant="destructive">Nem jogosult</Badge>
    )
  ) : (
    <></>
  );
};

export default EligibleBadge;
