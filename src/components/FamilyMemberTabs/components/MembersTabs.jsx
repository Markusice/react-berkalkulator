import { Tabs, TabsList } from "@/components/ui/tabs";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMember } from "../../../store/reducers/familyMembersSlice";
import AddButton from "./AddButton";
import MemberTab from "./MemberTab";

const MembersTabs = () => {
  const { members, selectedMember } = useSelector(
    (state) => state.familyMembers,
  );

  const dispatch = useDispatch();

  return (
    <div className="flex flex-wrap gap-x-2 gap-y-1">
      <Tabs value={selectedMember.id}>
        <TabsList className="flex w-min min-w-[8ch] gap-2">
          {members.map((member) => {
            return <MemberTab key={member.id} member={member} />;
          })}
        </TabsList>
      </Tabs>

      <AddButton
        onClick={() => {
          dispatch(
            addMember({
              name: "",
            }),
          );
        }}
      />
    </div>
  );
};

export default MembersTabs;
