const selectFromState = {
  id: function selectId(state) {
    return state.familyMembers.id;
  },

  members: function selectMembers(state) {
    return state.familyMembers.members;
  },

  selectedMember: function selectSelectedMember(state) {
    return state.familyMembers.selectedMember;
  },
};

export { selectFromState };
