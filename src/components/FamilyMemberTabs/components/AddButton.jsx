import { Button } from "@/components/ui/button";
import React from "react";

const AddButton = ({ ...props }) => {
  return (
    <Button variant="outline" size="icon" className="bg-gray-100" {...props}>
      +
    </Button>
  );
};

export default AddButton;
