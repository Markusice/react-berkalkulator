import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeMember } from "../../../store/reducers/familyMembersSlice";

const DeleteMemberButton = () => {
  const dispatch = useDispatch();

  const { members, selectedMember } = useSelector(
    (state) => state.familyMembers,
  );

  return (
    <Button
      variant="outline"
      size="icon"
      className="justify-self-end"
      disabled={members.length === 1}
      onClick={() => {
        if (members.length === 1) return;

        dispatch(removeMember({ id: selectedMember.id }));
      }}
    >
      <Trash2 strokeWidth={2.25}></Trash2>
    </Button>
  );
};

export default DeleteMemberButton;
