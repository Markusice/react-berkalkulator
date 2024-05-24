import { TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import { useDispatch } from "react-redux";
import { setSelectedMemberOnClick } from "../../../store/reducers/familyMembersSlice";

const MemberTab = ({ member }) => {
  const dispatch = useDispatch();

  return (
    <TabsTrigger
      value={member.id}
      onClick={() => {
        dispatch(setSelectedMemberOnClick({ id: member.id }));
      }}
    >
      {member.name}
    </TabsTrigger>
  );
};

export default MemberTab;
